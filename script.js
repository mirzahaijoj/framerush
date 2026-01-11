(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  // Load saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  }

  function updateIcon() {
    const theme = root.getAttribute("data-theme");
    icon.textContent = theme === "dark" ? "☀" : "☾";
  }
  updateIcon();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateIcon();
    });
  }
})();

document.querySelectorAll("video.video-player").forEach((v) => {
  v.addEventListener("loadedmetadata", () => {
    const wrap = v.closest(".video");
    if (!wrap) return;
    const w = v.videoWidth;
    const h = v.videoHeight;
    if (w && h) {
      wrap.style.aspectRatio = `${w} / ${h}`;
      if (w > h) wrap.classList.add("is-landscape");
    }
  });
});
// Show all projects toggle (homepage)
(function () {
  const btn = document.getElementById("toggleProjects");
  const wrap = document.getElementById("moreProjectsWrap");

  // If the button doesn't exist, we can't do anything
  if (!btn) return;

  // If the wrap doesn't exist, OR implies it has 0 projects, hide the button
  if (!wrap) {
    btn.style.display = "none";
    return;
  }

  // Check if there are any projects to show
  const hiddenProjects = wrap.querySelectorAll(".card").length;
  if (hiddenProjects === 0) {
    btn.style.display = "none";
    return;
  }

  const setState = (open) => {
    wrap.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    wrap.setAttribute("aria-hidden", String(!open));
    btn.textContent = open ? "Show less" : "Show all projects";
  };

  // Default closed
  setState(false);

  btn.addEventListener("click", () => {
    const open = !wrap.classList.contains("is-open");
    setState(open);
  });
})();

// Mobile Hamburger Menu
(function () {
  const hamburger = document.getElementById("hamburger");
  const menuWrap = document.getElementById("menuWrap");
  const navLinks = document.querySelectorAll(".nav a");

  if (!hamburger || !menuWrap) return;

  const toggleMenu = () => {
    const isOpen = menuWrap.classList.contains("is-open");
    menuWrap.classList.toggle("is-open", !isOpen);
    hamburger.classList.toggle("is-active", !isOpen);
    hamburger.setAttribute("aria-expanded", String(!isOpen));
  };

  hamburger.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuWrap.classList.contains("is-open")) {
        toggleMenu();
      }
    });
  });
})();
