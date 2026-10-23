(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuButton && navLinks) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navLinks.classList.remove("open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu",
      );
      navLinks.classList.toggle("open", !isOpen);
    });

    navLinks
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 761px)").matches) closeMenu();
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const form = document.querySelector("#enquiry-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const type = String(formData.get("type") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = encodeURIComponent(
        `${type} — Portfolio enquiry from ${name}`,
      );
      const body = encodeURIComponent(
        `Hello Dr. Jyoti Rajaram,\n\nI would like to make the following enquiry.\n\nName: ${name}\nEmail: ${email}\nEnquiry type: ${type}\n\nMessage:\n${message || "No additional message provided."}\n\nRegards,\n${name}`,
      );
      status.textContent =
        "Opening your email application… This form does not confirm an appointment.";
      window.location.href = `mailto:jyotirajaram0310@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
