/* Rasch-Git — shared site script (navbar + download link resolution) */
(function () {
  "use strict";

  var REPO = "raschild6/rasch-git-page";
  var RELEASES_URL = "https://github.com/" + REPO + "/releases";
  var API_URL = "https://api.github.com/repos/" + REPO + "/releases";

  // Asset matchers, most specific first.
  var PLATFORM_MATCHERS = {
    windows: [/\.(exe|msi|msix|appx)$/i, /(win|windows).*\.zip$/i],
    macos: [/\.(dmg|pkg)$/i, /(mac|macos|darwin|osx).*\.zip$/i]
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
   * Buttons are marked with data-platform="windows|macos"; their static href
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

  function initHeroDownloads() {
    var hero = document.querySelector("[data-latest-downloads]");
    if (!hero) return;
    var hint = hero.querySelector(".version-hint");
    resolveDownloads(hero, "latest", function (release) {
      if (hint && release.tag_name) hint.textContent = "Latest version: " + release.tag_name;
    });
  }

  window.RaschGit = {
    REPO: REPO,
    RELEASES_URL: RELEASES_URL,
    resolveDownloads: resolveDownloads
  };

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initHeroDownloads();
  });
})();
