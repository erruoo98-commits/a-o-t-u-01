document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const bagCount = document.querySelector("#bagCount");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Duplicate product cards once to create a continuous leftward carousel.
  const productTrack = document.querySelector(".product-track");
  if (productTrack && !productTrack.dataset.cloned) {
    [...productTrack.children].forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
      productTrack.appendChild(clone);
    });
    productTrack.dataset.cloned = "true";
  }

  // Demo interaction: product VIEW links add one item to the bag count.
  document.querySelectorAll(".product-card .view").forEach((view) => {
    view.addEventListener("click", () => {
      if (bagCount) bagCount.textContent = String(Number(bagCount.textContent || 0) + 1);
    });
  });

  // VIEW 링크: 페이지 이동 없이 그 자리에서 한 번만 포인트 효과를 주고 끝낸다.
  document.addEventListener("click", (event) => {
    const link = event.target.closest(".text-link, .mini-link, .view, .chapter-view");
    if (!link) return;
    event.preventDefault();
    link.classList.remove("is-clicked");
    void link.offsetWidth; // 효과를 처음부터 다시 재생
    link.classList.add("is-clicked");
    clearTimeout(link._clickTimer);
    link._clickTimer = setTimeout(() => link.classList.remove("is-clicked"), 800);
  });

  // Pause the product carousel while a visitor is using keyboard focus.
  if (productTrack) {
    productTrack.querySelectorAll("a").forEach((link) => {
      link.addEventListener("focus", () => { productTrack.style.animationPlayState = "paused"; });
      link.addEventListener("blur", () => { productTrack.style.animationPlayState = ""; });
    });
  }
});
