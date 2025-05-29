import { SELECTORS } from "../../core/selectors.js";

export function initSearchModal() {
  window.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.querySelector(SELECTORS.searchBtnDesktop);
    const searchBtnMobile = document.querySelector(SELECTORS.searchBtnMobile);
    const searchModal = document.querySelector(SELECTORS.searchModal);
    const closeModal = document.querySelector(SELECTORS.closeSearchModal);
    const input = document.querySelector(SELECTORS.searchInput);

    const open = (e) => {
      e.preventDefault();
      searchModal.classList.remove("hidden");
      setTimeout(() => input?.focus(), 100);
    };

    const close = () => {
      searchModal.classList.add("hidden");
      input && (input.value = "");
    };

    searchBtn?.addEventListener("click", open);
    searchBtnMobile?.addEventListener("click", open);
    closeModal?.addEventListener("click", close);
    searchModal?.addEventListener("click", (e) => {
      if (e.target === searchModal) close();
    });

    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  });
}
