/* Rasch-Git — chapter pages (Install, Features): sidebar navigation + copy buttons
 *
 * Markup: sidebar links .chapter-item[href="#<chapter id>"], chapters .chapter
 * inside #chapter-content. With JS only the selected chapter is shown; links
 * and hashes may also target an element inside a chapter (e.g. one feature),
 * which opens that chapter and scrolls to it. #chapter-content[data-default="os"]
 * opens "macos", "linux" or "windows" by visitor OS when no hash is given.
 */
(function () {
  "use strict";

  function init() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".chapter-item"));
    var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
    var content = document.getElementById("chapter-content");
    if (!links.length || !chapters.length || !content) return;

    document.documentElement.classList.add("js");

    // Resolves an id to { chapter, target } when it is a chapter or lives inside one.
    function resolve(id) {
      if (!id) return null;
      var el = document.getElementById(id);
      if (!el) return null;
      for (var i = 0; i < chapters.length; i++) {
        if (chapters[i] === el) return { chapter: el, target: null };
        if (chapters[i].contains(el)) return { chapter: chapters[i], target: el };
      }
      return null;
    }

    function hashId() {
      return decodeURIComponent(location.hash.replace(/^#/, ""));
    }

    function defaultChapter() {
      if (content.getAttribute("data-default") === "os") {
        var ua = navigator.userAgent;
        var os = document.getElementById(
          /Mac|iPhone|iPad/i.test(ua) ? "macos"
            : /Linux|X11/i.test(ua) && !/Android/i.test(ua) ? "linux" : "windows");
        if (os) return os;
      }
      return chapters[0];
    }

    function scrollToTop(el) {
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 68;
      var top = el.getBoundingClientRect().top;
      // Keep the chapter's top in view (the sidebar stacks above it on mobile).
      if (top < navH || window.matchMedia("(max-width: 820px)").matches) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    function show(res, fromClick) {
      var id = res.chapter.id;
      chapters.forEach(function (c) {
        var active = c === res.chapter;
        c.hidden = !active;
        c.classList.toggle("enter", active && fromClick);
      });
      links.forEach(function (a) {
        var active = a.getAttribute("href") === "#" + id;
        a.classList.toggle("active", active);
        if (active) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      if (res.target) res.target.scrollIntoView({ behavior: fromClick ? "smooth" : "instant", block: "start" });
      else if (fromClick) scrollToTop(content);
    }

    // Intercept in-page links into chapters (sidebar, prev/next, cross-links)
    // so the browser doesn't jump; update the hash without adding history noise.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      var res = resolve(id);
      if (!res) return;
      e.preventDefault();
      if (history.replaceState) history.replaceState(null, "", "#" + id);
      show(res, true);
    });

    window.addEventListener("hashchange", function () {
      var res = resolve(hashId());
      if (res) show(res, false);
    });

    var initial = resolve(hashId());
    show(initial || { chapter: defaultChapter(), target: null }, false);
    // The browser's own jump to the hash ran before the other chapters were
    // hidden; re-scroll to the deep-linked element once layout has settled.
    if (initial && initial.target) {
      var target = initial.target;
      var rescroll = function () { target.scrollIntoView({ behavior: "instant", block: "start" }); };
      if (document.readyState === "complete") rescroll();
      else window.addEventListener("load", function () { setTimeout(rescroll, 0); });
    }

    // Copy-to-clipboard for command snippets.
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        var done = function () {
          btn.textContent = "Copied";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () {});
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
