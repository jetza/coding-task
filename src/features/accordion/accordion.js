import { SELECTORS } from "../../core/selectors.js";

export function initAccordion() {
  document.querySelectorAll(SELECTORS.accordion).forEach((details) => {
    const summary = details.querySelector(SELECTORS.accordionToggle);
    const content = details.querySelector(SELECTORS.accordionContent);
    const plus = summary?.querySelector(SELECTORS.iconPlus);
    const minus = summary?.querySelector(SELECTORS.iconMinus);

    if (!summary || !content) return;

    const toggleIcons = (isOpen) => {
      plus.style.display = isOpen ? "none" : "inline-block";
      minus.style.display = isOpen ? "inline-block" : "none";
    };

    const collapse = () => {
      content.style.maxHeight = "0px";
      toggleIcons(false);
    };

    const expand = () => {
      content.style.maxHeight = `${content.scrollHeight}px`;
      toggleIcons(true);
      setTimeout(() => {
        if (details.hasAttribute("open")) content.style.maxHeight = "none";
      }, 500);
    };

    if (details.hasAttribute("open")) expand();

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (details.hasAttribute("open")) {
        expand();
        requestAnimationFrame(collapse);
        setTimeout(() => details.removeAttribute("open"), 500);
      } else {
        details.setAttribute("open", "");
        expand();
      }
    });

    details.addEventListener("toggle", () =>
      details.hasAttribute("open") ? expand() : collapse()
    );
  });
}
