/* ==========================================================================
   Rasch-Git — releases page

   Release data is loaded from /releases.json (see RaschGit.loadReleases in
   main.js), which the release pipeline of
   the private repo updates automatically. Each entry looks like:

   {
     "version": "0.0.1",
     "tag": "v0.0.1",
     "date": "YYYY-MM-DD",
     "downloads": { "windows": "<url>", "macos": "<url>", "linux": "<url>",
                    "linux-deb": "<url>", "linux-rpm": "<url>" },
     "changelog": { "New Features": [], "Bug Fixes": [], "Improvements": [] },
     "virustotal": { "windows": "<url>", "macos": "<url>", "linux": "<url>",
                     "linux-deb": "<url>", "linux-rpm": "<url>" },
     "release_url": "https://github.com/<repo>/releases/tag/v0.0.1"
   }

   Only `version` or `tag` is required. Entries are sorted newest first, so
   the order in the file does not matter. Missing download links fall back to
   the GitHub release page and are resolved to assets via the GitHub API.
   ========================================================================== */

(function () {
  "use strict";

  var GROUP_ORDER = ["New Features", "Bug Fixes", "Improvements"];

  // Keys of "virustotal", in display order.
  var VT_LABELS = [["windows", "Windows"], ["macos", "macOS"],
    ["linux", "Linux AppImage"], ["linux-deb", "Linux .deb"], ["linux-rpm", "Linux .rpm"]];

  var ICONS = {
    windows:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>',
    macos:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
    linux:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 1.5c-2.6 0-4.2 2.2-4.2 5 0 1.4.3 2.4-.7 4C5.7 12.6 4.5 14.7 4.5 17c0 .9.2 1.7.5 2.4l-1.4 1.2c-.5.4-.2 1.2.4 1.2h4.3c.5 0 .9-.3 1-.7.9.3 1.8.4 2.7.4s1.8-.1 2.7-.4c.1.4.5.7 1 .7H20c.6 0 .9-.8.4-1.2L19 19.4c.3-.7.5-1.5.5-2.4 0-2.3-1.2-4.4-2.6-6.5-1-1.6-.7-2.6-.7-4 0-2.8-1.6-5-4.2-5zm-2.6 11.2c.8-.9 1.7-1.2 2.6-1.2s1.8.3 2.6 1.2c1 1.2 1.6 2.7 1.6 4.3 0 2.1-1.9 2.8-4.2 2.8s-4.2-.7-4.2-2.8c0-1.6.6-3.1 1.6-4.3zM10.4 5.6a.9 1.1 0 1 0 0 2.2a.9 1.1 0 1 0 0-2.2zm3.2 0a.9 1.1 0 1 0 0 2.2a.9 1.1 0 1 0 0-2.2z"/></svg>'
  };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") node.textContent = attrs[key];
        else if (key === "html") node.innerHTML = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  // Buttons without an explicit URL get data-platform so main.js can swap in
  // the matching GitHub release asset.
  function downloadButton(platform, label, explicitHref, fallbackHref, primary) {
    var attrs = {
      class: "btn " + (primary ? "btn-primary" : "btn-outline"),
      href: explicitHref || fallbackHref,
      rel: "noopener",
      html: ICONS[platform] + "<span>" + label + "</span>"
    };
    if (!explicitHref) attrs["data-platform"] = platform;
    return el("a", attrs);
  }

  function renderDetail(container, release, isLatest) {
    container.innerHTML = "";

    var titleRow = el("div", { class: "title-row" }, [
      el("h2", { id: "release-title", text: release.tag }),
      isLatest ? el("span", { class: "badge", text: "Latest" }) : null
    ]);

    var meta = el("p", {
      class: "meta",
      text: release.date ? "Released " + formatDate(release.date) : " "
    });

    var fallback = release.releaseUrl;
    var buttons = el("div", { class: "btn-group" }, [
      downloadButton("windows", "Download for Windows", release.windows, fallback, true),
      downloadButton("macos", "Download for macOS", release.macos, fallback, false),
      // Linux only for releases that ship it (from 1.0.1).
      release.linux ? downloadButton("linux", "Download for Linux", release.linux, fallback, false) : null
    ]);

    var linuxPackages = null;
    if (release["linux-deb"] || release["linux-rpm"]) {
      linuxPackages = el("p", { class: "linux-packages" }, [el("span", { text: "Linux packages: " })]);
      [["linux-deb", ".deb"], ["linux-rpm", ".rpm"]].forEach(function (p) {
        if (!release[p[0]]) return;
        if (linuxPackages.children.length > 1) linuxPackages.appendChild(document.createTextNode(" \u00b7 "));
        linuxPackages.appendChild(el("a", { href: release[p[0]], rel: "noopener", text: p[1] }));
      });
    }

    var unsignedNotice = el("p", {
      class: "unsigned-notice",
      text: "* This app is not code-signed yet. Windows SmartScreen or macOS Gatekeeper may show a warning \u2014 this is normal. " +
        "On Windows, click \u201cMore info\u201d \u2192 \u201cRun anyway\u201d. On macOS, right-click the app and select \u201cOpen\u201d. " +
        "On Linux, make the AppImage executable first."
    });

    var vt = release.virustotal;
    var vtLinks = null;
    if (VT_LABELS.some(function (p) { return vt[p[0]]; })) {
      vtLinks = el("p", { class: "vt-links" }, [el("span", { text: "VirusTotal scan: " })]);
      VT_LABELS.forEach(function (p) {
        if (!vt[p[0]]) return;
        if (vtLinks.children.length > 1) vtLinks.appendChild(document.createTextNode(" \u00b7 "));
        vtLinks.appendChild(el("a", { href: vt[p[0]], target: "_blank", rel: "noopener", text: p[1] }));
      });
    }

    var changelog = el("div", { class: "changelog" }, [el("h3", { text: "Changelog" })]);
    var groups = release.changelog || {};
    var names = GROUP_ORDER.concat(
      Object.keys(groups).filter(function (g) { return GROUP_ORDER.indexOf(g) === -1; })
    );
    var hasEntries = false;
    names.forEach(function (name) {
      var items = groups[name];
      if (!items || !items.length) return;
      hasEntries = true;
      changelog.appendChild(el("h4", { text: name }));
      changelog.appendChild(
        el("ul", null, items.map(function (item) { return el("li", { text: item }); }))
      );
    });
    if (!hasEntries) changelog.appendChild(el("p", { class: "meta", text: "No changelog entries." }));

    container.appendChild(titleRow);
    container.appendChild(meta);
    container.appendChild(buttons);
    if (linuxPackages) container.appendChild(linuxPackages);
    container.appendChild(unsignedNotice);
    if (vtLinks) container.appendChild(vtLinks);
    container.appendChild(changelog);

    window.RaschGit.resolveDownloads(buttons, release.tag);
  }

  function showMessage(container, text) {
    container.innerHTML = "";
    var p = el("p", { class: "meta", text: text + " " });
    p.appendChild(el("a", { href: window.RaschGit.RELEASES_URL, rel: "noopener", text: "View all releases on GitHub \u2192" }));
    container.appendChild(p);
  }

  function render(list, detail, releases) {
    var items = [];

    function select(index, updateHash) {
      items.forEach(function (btn, i) {
        var active = i === index;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-current", active ? "true" : "false");
      });
      renderDetail(detail, releases[index], index === 0);
      if (updateHash && history.replaceState) {
        history.replaceState(null, "", "#" + releases[index].tag);
      }
    }

    list.innerHTML = "";
    releases.forEach(function (release, i) {
      var btn = el("button", { type: "button", class: "release-item" }, [
        el("span", { class: "ver", text: release.tag }),
        el("span", { class: "date", text: release.date })
      ]);
      btn.addEventListener("click", function () {
        select(i, true);
        if (window.matchMedia("(max-width: 820px)").matches) {
          detail.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      items.push(btn);
      list.appendChild(el("li", null, [btn]));
    });

    function indexFromHash() {
      var tag = decodeURIComponent(location.hash.replace(/^#/, "")).replace(/^v/i, "");
      for (var i = 0; i < releases.length; i++) {
        if (releases[i].tag.replace(/^v/i, "") === tag) return i;
      }
      return 0;
    }

    window.addEventListener("hashchange", function () { select(indexFromHash(), false); });
    select(indexFromHash(), false);
  }

  function init() {
    var list = document.getElementById("release-list");
    var detail = document.getElementById("release-detail");
    if (!list || !detail) return;

    detail.innerHTML = "";
    detail.appendChild(el("p", { class: "meta", text: "Loading releases\u2026" }));

    window.RaschGit.loadReleases()
      .then(function (releases) {
        if (!releases.length) {
          showMessage(detail, "No releases published yet.");
          return;
        }
        render(list, detail, releases);
      })
      .catch(function () {
        showMessage(detail, "Could not load the release list.");
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
