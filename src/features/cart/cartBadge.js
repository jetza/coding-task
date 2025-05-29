import { SELECTORS } from "../../core/selectors.js";

export function updateCartBadge() {
  const { cartIconNav } = SELECTORS;
  const getCart = () =>
    JSON.parse(localStorage.getItem("cart") || '{"buy-once":0,"subscribe":0}');
  const total = Object.values(getCart()).reduce((a, b) => a + b, 0);

  document.querySelectorAll("#cart-badge").forEach((b) => b.remove());

  const cartLinks = document.querySelectorAll(cartIconNav);
  if (total > 0) {
    cartLinks.forEach((link) => {
      const icon = link.querySelector("img");
      const parent = icon?.parentElement || link;
      parent.style.position = "relative";
      parent.style.overflow = "visible";

      const badge = document.createElement("span");
      badge.id = "cart-badge";
      badge.className = "cart-badge";
      badge.textContent = total;
      parent.appendChild(badge);
    });
  }
}
