/* Rasch-Git — shared site script (navbar, releases.json loading, download links) */
(function () {
  "use strict";

  var REPO = "raschild6/rasch-git-page";
  var RELEASES_URL = "https://github.com/" + REPO + "/releases";
  var API_URL = "https://api.github.com/repos/" + REPO + "/releases";
  var RELEASES_JSON_URL = "releases.json";

  // Asset matchers, most specific first.
  var PLATFORM_MATCHERS = {
    windows: [/\.(exe|msi|msix|appx)$/i, /(win|windows).*\.zip$/i],
    macos: [/\.(dmg|pkg)$/i, /(mac|macos|darwin|osx).*\.zip$/i],
    linux: [/\.AppImage$/i],
    "linux-deb": [/\.deb$/i],
    "linux-rpm": [/\.rpm$/i]
  };

  function pickAsset(assets, platform) {
    var matchers = PLATFORM_MATCHERS[platform] || [];
    for (var i = 0; i < matchers.length; i++) {
      for (var j = 0; j < assets.length; j++) {
        if (matchers[i].test(assets[j].name)) return assets[j];
      }
    }
    return null;
  }

  var cache = {};

  // Fetches a release from the GitHub API ("latest" or a tag name). Resolves to null on failure.
  function fetchRelease(tag) {
    if (cache[tag]) return cache[tag];
    var url = tag === "latest" ? API_URL + "/latest" : API_URL + "/tags/" + encodeURIComponent(tag);
    cache[tag] = fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .catch(function () { return null; });
    return cache[tag];
  }

  /**
   * Points the download buttons inside `root` at the matching release assets.
   * Buttons are marked with data-platform="windows|macos|linux|linux-deb|
   * linux-rpm"; their static href
   * (the release page) is kept as a fallback when the API is unavailable or
   * the release has no matching asset.
   */
  function resolveDownloads(root, tag, onRelease) {
    var buttons = root.querySelectorAll("[data-platform]");
    return fetchRelease(tag).then(function (release) {
      if (!release || !release.assets) return null;
      buttons.forEach(function (btn) {
        var asset = pickAsset(release.assets, btn.getAttribute("data-platform"));
        if (asset) {
          btn.href = asset.browser_download_url;
          btn.title = asset.name;
        }
      });
      if (onRelease) onRelease(release);
      return release;
    });
  }

  function normalizeRelease(raw) {
    var version = String(raw.version || raw.tag || "").trim();
    var tag = String(raw.tag || (/^v/i.test(version) ? version : "v" + version)).trim();
    var downloads = raw.downloads || {};
    return {
      tag: tag,
      date: raw.date || "",
      windows: downloads.windows || raw.windows || "",
      macos: downloads.macos || raw.macos || "",
      linux: downloads.linux || "",
      "linux-deb": downloads["linux-deb"] || "",
      "linux-rpm": downloads["linux-rpm"] || "",
      changelog: raw.changelog || {},
      virustotal: raw.virustotal || {},
      releaseUrl: raw.release_url || RELEASES_URL + "/tag/" + encodeURIComponent(tag)
    };
  }

  // Newest first: by numeric version parts, then by date.
  function compareReleases(a, b) {
    var pa = a.tag.replace(/^v/i, "").split(/[.-]/);
    var pb = b.tag.replace(/^v/i, "").split(/[.-]/);
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var na = parseInt(pa[i], 10) || 0;
      var nb = parseInt(pb[i], 10) || 0;
      if (na !== nb) return nb - na;
    }
    return String(b.date).localeCompare(String(a.date));
  }

  var releasesPromise = null;

  /**
   * Loads releases.json (maintained by the release pipeline) and resolves to
   * a normalized list, newest first. An empty file resolves to [].
   */
  function loadReleases() {
    if (!releasesPromise) {
      // no-cache: revalidate so a freshly published release shows up immediately.
      releasesPromise = fetch(RELEASES_JSON_URL, { cache: "no-cache" })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          return (Array.isArray(data) ? data : (data && data.releases) || [])
            .filter(function (r) { return r && (r.version || r.tag); })
            .map(normalizeRelease)
            .sort(compareReleases);
        });
    }
    return releasesPromise;
  }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Navbar dropdown (Features / How-to Guides). Opens on hover and keyboard
  // focus via CSS; the button toggles it for touch and keyboard users.
  function initDropdowns() {
    document.querySelectorAll(".nav-dropdown").forEach(function (dd) {
      var btn = dd.querySelector(".nav-dropdown-toggle");
      if (!btn) return;
      var setOpen = function (open) {
        dd.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      btn.addEventListener("click", function () { setOpen(!dd.classList.contains("open")); });
      document.addEventListener("click", function (e) { if (!dd.contains(e.target)) setOpen(false); });
      dd.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && dd.classList.contains("open")) {
          e.stopPropagation();
          setOpen(false);
          btn.focus();
        }
      });
    });
  }

  // Home hero: point the buttons at the latest release in releases.json.
  // Falls back to the GitHub API, then to the static releases-page link.
  function initHeroDownloads() {
    var hero = document.querySelector("[data-latest-downloads]");
    if (!hero) return;
    var hint = hero.querySelector(".version-hint");
    var setHint = function (tag) {
      if (hint && tag) hint.textContent = "Latest version: " + tag;
    };
    var viaApi = function () {
      resolveDownloads(hero, "latest", function (release) { setHint(release.tag_name); });
    };
    loadReleases().then(function (releases) {
      var latest = releases[0];
      if (!latest) return viaApi();
      hero.querySelectorAll("[data-platform]").forEach(function (btn) {
        btn.href = latest[btn.getAttribute("data-platform")] || latest.releaseUrl;
      });
      setHint(latest.tag);
    }, viaApi);
  }

  window.RaschGit = {
    REPO: REPO,
    RELEASES_URL: RELEASES_URL,
    loadReleases: loadReleases,
    resolveDownloads: resolveDownloads
  };

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initDropdowns();
    initHeroDownloads();
  });
})();
