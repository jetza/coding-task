import "./input.css";
// SVG imports for all icons used in HTML
import menuIcon from "../public/icons/menu.svg";
import searchIcon from "../public/icons/search.svg";
import userIcon from "../public/icons/user.svg";
import cartIcon from "../public/icons/cart.svg";
import arrowIcon from "../public/icons/arrow.svg";
import organicIcon from "../public/icons/organic.svg";
import plusIcon from "../public/icons/plus.svg";
import minusIcon from "../public/icons/minus.svg";
import chevronLeftIcon from "../public/icons/chevron-left.svg";
import chevronRightIcon from "../public/icons/chevron-right.svg";

// --- Carousel Functionality ---
(function carouselModule() {
  const container = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel > div");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  if (!container || !slides.length || !prevBtn || !nextBtn) return;
  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -slides[0].offsetWidth, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: slides[0].offsetWidth, behavior: "smooth" });
  });
})();

// --- Cart Quantity and Add to Cart Animation ---
(function cartQuantityModule() {
  const countEl = document.getElementById("count");
  const decreaseBtn = document.getElementById("decrease");
  const increaseBtn = document.getElementById("increase");
  let count = 1;
  if (decreaseBtn && increaseBtn && countEl) {
    decreaseBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        countEl.textContent = count;
      }
    });
    increaseBtn.addEventListener("click", () => {
      count++;
      countEl.textContent = count;
    });
  }

  // Add to cart animation
  const cartBtn = document.getElementById("cart-animated-btn");
  const cartText = document.getElementById("cart-btn-text");
  const cartIconEl = document.getElementById("cart-btn-cart");
  const checkIcon = document.getElementById("cart-btn-check");
  if (cartBtn && cartText && cartIconEl && checkIcon) {
    cartBtn.addEventListener("click", () => {
      cartText.classList.add("opacity-0");
      cartIconEl.classList.remove("opacity-0");
      cartIconEl.classList.add("animate-cart-move");
      setTimeout(() => {
        cartIconEl.classList.add("opacity-0");
        cartIconEl.classList.remove("animate-cart-move");
        checkIcon.classList.remove("opacity-0");
        checkIcon.classList.remove("fade-out");
        checkIcon.classList.add("fade-in");
      }, 1800);
      setTimeout(() => {
        checkIcon.classList.remove("fade-in");
        checkIcon.classList.add("fade-out");
      }, 3800);
      setTimeout(() => {
        cartText.classList.remove("opacity-0");
        checkIcon.classList.add("opacity-0");
        checkIcon.classList.remove("fade-out");
      }, 4200);
    });
    cartBtn.addEventListener("mousedown", () => {
      cartBtn.classList.add("btn-pressed");
    });
    cartBtn.addEventListener("mouseup", () => {
      cartBtn.classList.remove("btn-pressed");
    });
    cartBtn.addEventListener("mouseleave", () => {
      cartBtn.classList.remove("btn-pressed");
    });
  }

  // Animation styles (injected once)
  if (!document.getElementById("cart-animation-styles")) {
    const style = document.createElement("style");
    style.id = "cart-animation-styles";
    style.innerHTML = `
@keyframes cart-move {
  0% { left: 5%; opacity: 0; }
  80% { left: 85%; opacity: 1; }
  100% { left: 85%; opacity: 0; }
}
.animate-cart-move {
  animation: cart-move 1.8s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
.fade-in {
  animation: fadeIn 0.4s ease forwards;
}
.fade-out {
  animation: fadeOut 0.4s ease forwards;
}
#cart-btn-check {
  color: #22c55e !important;
}
.btn-pressed {
  transform: scale(1.05);
  transition: transform 0.1s cubic-bezier(0.4,0,0.2,1);
}
`;
    document.head.appendChild(style);
  }
})();

// --- Cart Storage and Badge Update ---
(function cartStorageModule() {
  const radioBuyOnce = document.querySelector(
    'input[name="choice"][value="option1"]'
  );
  const radioSubscribe = document.querySelector(
    'input[name="choice"][value="option2"]'
  );
  const cartBtn = document.getElementById("cart-animated-btn");
  const countEl = document.getElementById("count");
  function getSelectedOption() {
    if (radioBuyOnce && radioBuyOnce.checked) return "buy-once";
    if (radioSubscribe && radioSubscribe.checked) return "subscribe";
    return null;
  }
  function getCartFromStorage() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { "buy-once": 0, subscribe: 0 };
  }
  function saveCartToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  cartBtn?.addEventListener("click", () => {
    const selected = getSelectedOption();
    if (!selected) return;
    const count = parseInt(countEl.textContent, 10) || 1;
    const cart = getCartFromStorage();
    cart[selected] += count;
    saveCartToStorage(cart);
  });
  // Cart badge update
  const cartIconNav = document.querySelector('a[aria-label="Cart"]');
  function updateCartIcon() {
    const cart = getCartFromStorage();
    const total = (cart["buy-once"] || 0) + (cart["subscribe"] || 0);
    let badge = document.getElementById("cart-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "cart-badge";
      badge.className =
        "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5";
      const iconImg = cartIconNav?.querySelector("img");
      if (iconImg && iconImg.parentElement) {
        iconImg.parentElement.style.position = "relative";
        iconImg.parentElement.appendChild(badge);
      } else if (cartIconNav) {
        cartIconNav.style.position = "relative";
        cartIconNav.appendChild(badge);
      }
    }
    badge.textContent = total > 0 ? total : "";
  }
  updateCartIcon();
  window.addEventListener("storage", updateCartIcon);
  cartBtn?.addEventListener("click", () => setTimeout(updateCartIcon, 500));
})();

// --- Hamburger/Mobile Menu ---
(function mobileMenuModule() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");
  menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
  });
  closeMenu?.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
  mobileMenu?.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
  });
})();

// --- Accordion ---
(function accordionModule() {
  document.querySelectorAll(".animated-accordion").forEach((details) => {
    const summary = details.querySelector(".animated-accordion-toggle");
    const content = details.querySelector(".animated-accordion-content");
    if (!summary || !content) return;
    if (details.hasAttribute("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0px";
    }
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = details.hasAttribute("open");
      const plusIcon = summary.querySelector(".icon-plus");
      const minusIcon = summary.querySelector(".icon-minus");
      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          content.style.maxHeight = "0px";
        });
        setTimeout(() => {
          details.removeAttribute("open");
          if (plusIcon) plusIcon.style.display = "inline-block";
          if (minusIcon) minusIcon.style.display = "none";
        }, 500);
      } else {
        details.setAttribute("open", "");
        content.style.maxHeight = content.scrollHeight + "px";
        if (plusIcon) plusIcon.style.display = "none";
        if (minusIcon) minusIcon.style.display = "inline-block";
        setTimeout(() => {
          if (details.hasAttribute("open")) {
            content.style.maxHeight = "none";
          }
        }, 500);
      }
    });
    details.addEventListener("toggle", () => {
      const plusIcon = summary.querySelector(".icon-plus");
      const minusIcon = summary.querySelector(".icon-minus");
      if (!details.hasAttribute("open")) {
        content.style.maxHeight = "0px";
        if (plusIcon) plusIcon.style.display = "inline-block";
        if (minusIcon) minusIcon.style.display = "none";
      } else {
        if (plusIcon) plusIcon.style.display = "none";
        if (minusIcon) minusIcon.style.display = "inline-block";
      }
    });
  });
})();

// --- Icon Source Assignment ---
(function iconAssignmentModule() {
  function setIconSrc(selector, src) {
    document.querySelectorAll(selector).forEach((img) => {
      img.src = src;
    });
  }
  window.addEventListener("DOMContentLoaded", () => {
    setIconSrc('img[alt="Menu"]', menuIcon);
    setIconSrc('img[alt="Search"], img[alt="Search-icon"]', searchIcon);
    setIconSrc('img[alt="User"], img[alt="User-icon"]', userIcon);
    setIconSrc('img[alt="Cart"], img[alt="Cart-icon"]', cartIcon);
    setIconSrc('img[alt="Arrow"], img[alt="Menu"]:not([src])', arrowIcon);
    setIconSrc('img[alt="Organic icon"]', organicIcon);
    setIconSrc('img[alt="Plus"], img[alt="Plus icon"]', plusIcon);
    setIconSrc('img[alt="Minus"], img[alt="Minus icon"]', minusIcon);
    setIconSrc('img[alt="Previous"]', chevronLeftIcon);
    setIconSrc('img[alt="Next"]', chevronRightIcon);
  });
})();

// --- Search Modal Logic ---
(function searchModalModule() {
  window.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn-desktop");
    const searchBtnMobile = document.getElementById("search-btn-mobile");
    const searchModal = document.getElementById("search-modal");
    const closeSearchModal = document.getElementById("close-search-modal");
    const searchInput = document.getElementById("search-input");
    function openSearchModal(e) {
      e.preventDefault();
      searchModal.classList.remove("hidden");
      setTimeout(function () {
        searchInput && searchInput.focus();
      }, 100);
    }
    function resetSearchModal() {
      if (searchInput) searchInput.value = "";
    }
    if (searchBtn) {
      searchBtn.addEventListener("click", openSearchModal);
    }
    if (searchBtnMobile) {
      searchBtnMobile.addEventListener("click", openSearchModal);
    }
    if (closeSearchModal) {
      closeSearchModal.addEventListener("click", function () {
        searchModal.classList.add("hidden");
        resetSearchModal();
      });
    }
    if (searchModal) {
      searchModal.addEventListener("click", function (e) {
        if (e.target === searchModal) {
          searchModal.classList.add("hidden");
          resetSearchModal();
        }
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchModal.classList.add("hidden");
        resetSearchModal();
      }
    });
  });
})();
