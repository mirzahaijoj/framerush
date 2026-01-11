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

// Formspree AJAX Submission
(function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (!form || !status) return;

  async function handleSubmit(event) {
    event.preventDefault();
    status.style.display = "none";
    status.className = "";
    status.innerHTML = "";

    // Check if the placeholder ID is still there
    if (form.action.includes("YOUR_FORM_ID")) {
      status.innerHTML = "⚠️ Please replace 'YOUR_FORM_ID' in index.html with your actual Formspree Form ID.";
      status.style.color = "#856404";
      status.style.backgroundColor = "#fff3cd";
      status.style.border = "1px solid #ffeeba";
      status.style.display = "block";
      return;
    }

    const data = new FormData(event.target);
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.textContent : "Send";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        status.innerHTML = "✅ Thanks for your submission!";
        status.style.display = "block";
        status.className = "success"; // We will add styles for this
        form.reset();
      } else {
        if (Object.hasOwn(result, 'errors')) {
          status.innerHTML = result.errors.map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "❌ Oops! There was a problem submitting your form";
        }
        status.style.display = "block";
        status.className = "error"; // We will add styles for this
      }
    } catch (error) {
      status.innerHTML = "❌ Oops! There was a problem submitting your form";
      status.style.display = "block";
      status.className = "error";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  }

  form.addEventListener("submit", handleSubmit);
})();
