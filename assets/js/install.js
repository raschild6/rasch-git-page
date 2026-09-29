/* Rasch-Git — install guide: chapter navigation + copy buttons */
(function () {
  "use strict";

  function init() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".chapter-item"));
    var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
    var content = document.getElementById("chapter-content");
    if (!links.length || !chapters.length) return;

    document.documentElement.classList.add("js");

    function idFromHash() {
      var id = decodeURIComponent(location.hash.replace(/^#/, ""));
      return chapters.some(function (c) { return c.id === id; }) ? id : null;
    }

    // No hash: open the chapter matching the visitor's OS.
    function defaultId() {
      return /Mac|iPhone|iPad/i.test(navigator.userAgent) ? "macos" : "windows";
    }

    function show(id, fromClick) {
      chapters.forEach(function (c) {
        var active = c.id === id;
        c.hidden = !active;
        c.classList.toggle("enter", active && fromClick);
      });
      links.forEach(function (a) {
        var active = a.getAttribute("href") === "#" + id;
        a.classList.toggle("active", active);
        if (active) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      if (fromClick) {
        // Keep the chapter's top in view (the sidebar stacks above it on mobile).
        var top = content.getBoundingClientRect().top;
        var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 68;
        if (top < navH || window.matchMedia("(max-width: 820px)").matches) {
          content.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }

    // Intercept every in-page chapter link (sidebar + prev/next) so the
    // browser doesn't jump; update the hash without adding history noise.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      if (!chapters.some(function (c) { return c.id === id; })) return;
      e.preventDefault();
      if (history.replaceState) history.replaceState(null, "", "#" + id);
      show(id, true);
    });

    window.addEventListener("hashchange", function () {
      var id = idFromHash();
      if (id) show(id, false);
    });

    show(idFromHash() || defaultId(), false);

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
