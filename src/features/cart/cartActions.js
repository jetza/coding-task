import { SELECTORS } from "../../core/selectors.js";

export function initCartActions() {
  const countEl = document.querySelector(SELECTORS.count);
  const decrease = document.querySelector(SELECTORS.decrease);
  const increase = document.querySelector(SELECTORS.increase);
  const cartBtn = document.querySelector(SELECTORS.cartBtn);
  const cartText = document.querySelector(SELECTORS.cartText);
  const cartIcon = document.querySelector(SELECTORS.cartIcon);
  const checkIcon = document.querySelector(SELECTORS.checkIcon);
  let count = 1;

  decrease?.addEventListener("click", () => {
    if (count > 1) countEl.textContent = --count;
  });
  increase?.addEventListener("click", () => {
    countEl.textContent = ++count;
  });

  cartBtn?.addEventListener("click", () => {
    cartText.classList.add("opacity-0");
    cartIcon.classList.remove("opacity-0", "animate-cart-move");
    cartIcon.classList.add("animate-cart-move");

    setTimeout(() => {
      cartIcon.classList.add("opacity-0");
      cartIcon.classList.remove("animate-cart-move");
      checkIcon.classList.replace("opacity-0", "fade-in");
    }, 1800);

    setTimeout(() => checkIcon.classList.replace("fade-in", "fade-out"), 3800);

    setTimeout(() => {
      cartText.classList.remove("opacity-0");
      checkIcon.classList.add("opacity-0");
      checkIcon.classList.remove("fade-out");
    }, 4200);
  });

  ["mousedown", "mouseup", "mouseleave"].forEach((event) =>
    cartBtn?.addEventListener(event, () =>
      cartBtn.classList.toggle("btn-pressed", event === "mousedown")
    )
  );
}
