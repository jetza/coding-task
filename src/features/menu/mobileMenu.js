import { SELECTORS } from "../../core/selectors.js";

export function initMobileMenu() {
  const menuBtn = document.querySelector(SELECTORS.menuBtn);
  const menu = document.querySelector(SELECTORS.mobileMenu);
  const closeBtn = document.querySelector(SELECTORS.closeMenu);

  menuBtn?.addEventListener("click", () => menu.classList.remove("hidden"));
  closeBtn?.addEventListener("click", () => menu.classList.add("hidden"));
  menu?.addEventListener(
    "click",
    (e) => e.target === menu && menu.classList.add("hidden")
  );
}
