/* Rasch-Git — Features page: tree index, one feature at a time, search.
 *
 * Markup: #feature-index (search box + tree of areas → features),
 * #feature-content holding .feature-view elements: #overview (area cards,
 * whose ids are the area ids), one article.feature-page per feature (id =
 * feature id, data-area, data-keywords) and the Comparison / Shortcuts
 * sections. With JS only the view named by the hash is shown; without JS
 * everything stays on the page in order.
 *
 * Search ranks features by title, keywords (synonyms), tagline, the
 * "At a glance" bullets and the full text, with prefix and typo-tolerant
 * matching; every word typed must match somewhere.
 */
(function () {
  "use strict";

  var index = document.getElementById("feature-index");
  var content = document.getElementById("feature-content");
  if (!index || !content) return;
  document.documentElement.classList.add("js");

  var views = [].slice.call(content.querySelectorAll(".feature-view"));
  var pages = [].slice.call(content.querySelectorAll(".feature-page"));
  var tree = document.getElementById("feature-tree");
  var input = document.getElementById("feature-search");
  var results = document.getElementById("feature-results");
  var bar = document.getElementById("feature-bar");
  var barLabel = document.getElementById("feature-bar-label");
  var scrim = document.getElementById("feature-scrim");
  var narrow = window.matchMedia("(max-width: 820px)");

  // Old chapter ids (before the seven areas) → the area that holds them now.
  var ALIAS = { speed: "speed-trust", safety: "branches-safety", scale: "many-repos", trust: "speed-trust" };

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  function text(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }

  function areaName(id) {
    var b = tree.querySelector('.fi-group[data-area="' + id + '"] .fi-group-btn span');
    return b ? b.textContent : "";
  }

  /* ---------------------------------------------------------- navigation */

  function viewFor(id) {
    id = ALIAS[id] || id;
    var el = id && document.getElementById(id);
    if (!el || !content.contains(el)) return { view: document.getElementById("overview"), target: null };
    var view = el.closest(".feature-view");
    return { view: view, target: view === el ? null : el };
  }

  function scrollToContent(initial) {
    var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 68;
    var barH = narrow.matches && bar ? bar.offsetHeight : 0;
    var top = content.getBoundingClientRect().top + window.pageYOffset - navH - barH - 16;
    if (initial) window.scrollTo(0, 0);
    else if (window.pageYOffset > top) window.scrollTo(0, Math.max(0, top));
  }

  var hits = [];
  function clearHits() {
    hits.forEach(function (m) {
      var p = m.parentNode;
      if (!p) return;
      p.replaceChild(document.createTextNode(m.textContent), m);
      p.normalize();
    });
    hits = [];
  }

  function show(initial) {
    var id = decodeURIComponent(location.hash.replace(/^#/, ""));
    var res = viewFor(id);
    views.forEach(function (v) { v.hidden = v !== res.view; });
    clearHits();

    var area = res.view.getAttribute("data-area");
    [].forEach.call(tree.querySelectorAll("a"), function (a) {
      var on = a.getAttribute("href") === "#" + res.view.id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (area) setOpen(tree.querySelector('.fi-group[data-area="' + area + '"]'), true);

    if (barLabel) {
      var h = res.view.querySelector("h2");
      var title = h ? h.firstChild.textContent.trim() : "Overview";
      barLabel.textContent = res.view.id === "overview" ? "Overview" : (area ? areaName(area) + " › " : "") + title;
    }
    document.title = (res.view.id === "overview" ? "Features" : text(res.view.querySelector("h2")).replace(/\s*(Beta|Experimental)$/, "")) + " — Rasch-Git";
    closeDrawer();

    if (res.target) {
      // An area id: the overview, scrolled to that area's card.
      requestAnimationFrame(function () { res.target.scrollIntoView({ block: "start" }); });
    } else {
      requestAnimationFrame(function () { scrollToContent(initial); });
    }
    if (pendingTerms && res.view.classList.contains("feature-page")) markTerms(res.view, pendingTerms);
    pendingTerms = null;
  }

  function setOpen(group, open) {
    if (!group) return;
    group.classList.toggle("open", open);
    group.querySelector(".fi-group-btn").setAttribute("aria-expanded", String(open));
  }

  tree.addEventListener("click", function (e) {
    var btn = e.target.closest(".fi-group-btn");
    if (btn) setOpen(btn.parentNode, !btn.parentNode.classList.contains("open"));
  });

  /* -------------------------------------------------------------- drawer */

  function openDrawer() {
    document.body.classList.add("feature-drawer-open");
    if (bar) bar.setAttribute("aria-expanded", "true");
    if (scrim) scrim.hidden = false;
  }
  function closeDrawer() {
    document.body.classList.remove("feature-drawer-open");
    if (bar) bar.setAttribute("aria-expanded", "false");
    if (scrim) scrim.hidden = true;
  }
  if (bar) bar.addEventListener("click", function () {
    if (document.body.classList.contains("feature-drawer-open")) closeDrawer(); else openDrawer();
  });
  if (scrim) scrim.addEventListener("click", closeDrawer);

  /* -------------------------------------------------------------- search */

  function fold(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function words(s) {
    return fold(s).split(/[^a-z0-9+#.]+/).map(function (w) { return w.replace(/^[.]+|[.]+$/g, ""); }).filter(Boolean);
  }
  // Edit distance, stopping early once it exceeds max.
  function within(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return false;
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      var best = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], prev[j - 2] + 1);
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return false;
      prev = cur;
    }
    return prev[b.length] <= max;
  }

  // Field weights: what a match in that field is worth.
  var FIELDS = [["title", 10], ["keywords", 7], ["area", 4], ["tagline", 4], ["glance", 3], ["body", 1]];

  var docs = pages.map(function (p) {
    var area = p.getAttribute("data-area");
    var f = {
      title: p.querySelector(".feature-detail-head h2").firstChild.textContent.trim(),
      keywords: p.getAttribute("data-keywords") || "",
      area: areaName(area),
      tagline: text(p.querySelector(".feature-tagline")),
      glance: text(p.querySelector(".feature-glance")),
      body: text(p.querySelector(".feature-body")) + " " + text(p.querySelector(".feature-aside")) + " " +
        [].map.call(p.querySelectorAll("figcaption"), text).join(" ")
    };
    var d = { id: p.id, area: area, f: f, w: {}, full: {} };
    FIELDS.forEach(function (fw) {
      d.w[fw[0]] = words(f[fw[0]]);
      d.full[fw[0]] = fold(f[fw[0]]);
    });
    return d;
  });

  // Best score of one query term in one document (0 = no match).
  function termScore(d, t) {
    var best = 0;
    var typo = t.length >= 8 ? 2 : t.length >= 4 ? 1 : 0;
    FIELDS.forEach(function (fw) {
      var name = fw[0], weight = fw[1], q = 0;
      var ws = d.w[name];
      for (var i = 0; i < ws.length && q < 1; i++) {
        var w = ws[i];
        if (w === t) q = 1;
        else if (w.indexOf(t) === 0) q = Math.max(q, t.length >= 3 ? 0.8 : 0.3);
        else if (typo && (name === "title" || name === "keywords" || name === "tagline" || name === "area") && within(t, w.slice(0, t.length + typo), typo)) q = Math.max(q, 0.5);
      }
      if (!q && t.length >= 3 && d.full[name].indexOf(t) >= 0) q = 0.4;
      if (q * weight > best) best = q * weight;
    });
    return best;
  }

  // Small words that don't say what you are looking for: they only add to the
  // score when they match, and never rule a feature out.
  var STOP = ("a an and are as at be by can do does for from how i in is it its me my of on or " +
    "the that this these to what when where which with you your").split(" ");

  function search(query) {
    var all = words(query);
    var terms = all.filter(function (t) { return STOP.indexOf(t) < 0; });
    var extra = all.filter(function (t) { return STOP.indexOf(t) >= 0; });
    if (!terms.length) terms = all;
    if (!terms.length) return [];
    var phrase = fold(query.trim());
    var out = [];
    docs.forEach(function (d) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var s = termScore(d, terms[i]);
        if (!s) return;
        score += s;
      }
      extra.forEach(function (t) { score += termScore(d, t) * 0.2; });
      if (terms.length > 1) {
        if (d.full.title.indexOf(phrase) >= 0) score += 12;
        else if (d.full.keywords.indexOf(phrase) >= 0 || d.full.tagline.indexOf(phrase) >= 0) score += 6;
        else if (d.full.body.indexOf(phrase) >= 0) score += 3;
      }
      out.push({ d: d, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    // Leave out the weak tail: matches far below the best one are noise.
    var floor = out.length ? out[0].score * 0.3 : 0;
    return out.filter(function (r) { return r.score >= floor; }).slice(0, 8).map(function (r) { return r.d; });
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function termRegex(terms) {
    var parts = terms.filter(function (t) { return t.length >= 2; })
      .map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    return parts.length ? new RegExp("\\b(" + parts.join("|") + ")", "gi") : null;
  }
  function highlight(s, re) {
    var e = esc(s);
    return re ? e.replace(re, "<mark>$1</mark>") : e;
  }
  // The sentence that best shows why a feature matched (tagline when nothing better).
  function snippet(d, terms) {
    var re = termRegex(terms);
    if (!re) return esc(d.f.tagline);
    var test = function (s) { re.lastIndex = 0; return re.test(fold(s)); };
    if (test(d.f.title) || test(d.f.tagline)) return highlight(d.f.tagline, re);
    var src = (d.f.glance + " " + d.f.body).match(/[^.!?]+[.!?]*/g) || [];
    for (var i = 0; i < src.length; i++) {
      if (test(src[i])) {
        var s = src[i].length > 140 ? src[i].slice(0, 137) + "…" : src[i];
        return highlight(s, re);
      }
    }
    return highlight(d.f.tagline, re);
  }

  var active = -1, current = [], pendingTerms = null;

  function render() {
    var q = input.value;
    var terms = words(q);
    current = search(q);
    active = current.length ? 0 : -1;
    index.classList.toggle("searching", terms.length > 0);
    results.hidden = !terms.length;
    if (!terms.length) { results.innerHTML = ""; return; }
    if (!current.length) {
      results.innerHTML = '<p class="fr-empty">No feature matches <strong>' + esc(q.trim()) + '</strong>. Try another word, or browse the areas below.</p>';
      return;
    }
    var re = termRegex(terms);
    results.innerHTML = '<p class="fr-count">' + current.length + (current.length === 1 ? " result" : " results") + "</p>" +
      current.map(function (d, i) {
        return '<a class="fr-item' + (i === 0 ? " active" : "") + '" role="option" id="fr-' + d.id + '" href="#' + d.id + '" aria-selected="' + (i === 0) + '">' +
          '<span class="fr-title">' + highlight(d.f.title, re) + "</span>" +
          '<span class="fr-area">' + esc(d.f.area) + "</span>" +
          '<span class="fr-snippet">' + snippet(d, terms) + "</span></a>";
      }).join("");
    input.setAttribute("aria-activedescendant", "fr-" + current[0].id);
  }

  function move(step) {
    var items = results.querySelectorAll(".fr-item");
    if (!items.length) return;
    active = (active + step + items.length) % items.length;
    [].forEach.call(items, function (it, i) {
      it.classList.toggle("active", i === active);
      it.setAttribute("aria-selected", String(i === active));
    });
    items[active].scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", items[active].id);
  }

  function open(id) {
    pendingTerms = words(input.value);
    if (location.hash === "#" + id) show(false); else location.hash = id;
  }

  // Marks the search words in the opened feature, so you see why it matched.
  function markTerms(root, terms) {
    var re = termRegex(terms);
    if (!re) return;
    var walker = document.createTreeWalker(root.querySelector(".feature-cols") || root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      re.lastIndex = 0;
      if (!re.test(node.nodeValue)) return;
      var frag = document.createDocumentFragment();
      node.nodeValue.split(re).forEach(function (part, i) {
        if (i % 2) {
          var m = document.createElement("mark");
          m.className = "search-hit";
          m.textContent = part;
          frag.appendChild(m);
          hits.push(m);
        } else if (part) frag.appendChild(document.createTextNode(part));
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  if (input) {
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        if (active >= 0 && current[active]) { e.preventDefault(); open(current[active].id); }
      } else if (e.key === "Escape") {
        if (input.value) { input.value = ""; render(); } else input.blur();
      }
    });
    results.addEventListener("click", function (e) {
      var a = e.target.closest(".fr-item");
      if (!a) return;
      e.preventDefault();
      open(a.getAttribute("href").slice(1));
    });
    document.addEventListener("keydown", function (e) {
      var t = e.target;
      var typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if (typing) return;
      if (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        if (narrow.matches) openDrawer();
        input.focus();
        input.select();
      }
    });
  }

  window.addEventListener("hashchange", function () { show(false); });
  show(true);
})();
