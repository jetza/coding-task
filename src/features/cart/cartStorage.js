import { SELECTORS } from "../../core/selectors.js";
import { updateCartBadge } from "./cartBadge.js";

export function initCartStorage() {
  const { radioBuyOnce, radioSubscribe, cartBtn, count } = SELECTORS;

  const getSelectedOption = () =>
    document.querySelector(radioBuyOnce)?.checked
      ? "buy-once"
      : document.querySelector(radioSubscribe)?.checked
      ? "subscribe"
      : null;

  const getCart = () =>
    JSON.parse(localStorage.getItem("cart") || '{"buy-once":0,"subscribe":0}');

  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelector(cartBtn)?.addEventListener("click", () => {
    const selected = getSelectedOption();
    const countVal = parseInt(document.querySelector(count)?.textContent) || 1;
    if (!selected) return;

    const cart = getCart();
    cart[selected] += countVal;
    saveCart(cart);

    setTimeout(updateCartBadge, 500);
  });

  window.addEventListener("storage", updateCartBadge);
  updateCartBadge();
}
