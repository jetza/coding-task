import "./input.css";

// Carousel functionality
const container = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel > div");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

prevBtn.addEventListener("click", () => {
  container.scrollBy({ left: -slides[0].offsetWidth, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  container.scrollBy({ left: slides[0].offsetWidth, behavior: "smooth" });
});

// Cart counter functionality
const countEl = document.getElementById("count");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");

let count = 1;

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

// Hamburger menu JS
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});

closeMenu?.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

// Optional: close menu on overlay click
mobileMenu?.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.add("hidden");
  }
});

// Animation for Add to cart button
const cartBtn = document.getElementById("cart-animated-btn");
const cartText = document.getElementById("cart-btn-text");
const cartIcon = document.getElementById("cart-btn-cart");
const checkIcon = document.getElementById("cart-btn-check");

if (cartBtn && cartText && cartIcon && checkIcon) {
  cartBtn.addEventListener("click", () => {
    // Hide text
    cartText.classList.add("opacity-0");
    // Cart left to right animation
    cartIcon.classList.remove("opacity-0");
    cartIcon.classList.add("animate-cart-move");
    // Check fade in
    setTimeout(() => {
      cartIcon.classList.add("opacity-0");
      cartIcon.classList.remove("animate-cart-move");
      checkIcon.classList.remove("opacity-0");
      checkIcon.classList.remove("fade-out");
      checkIcon.classList.add("fade-in");
    }, 1800);
    // Fade-out check mark and return
    setTimeout(() => {
      checkIcon.classList.remove("fade-in");
      checkIcon.classList.add("fade-out");
    }, 3800); // check mark 2s
    setTimeout(() => {
      cartText.classList.remove("opacity-0");
      checkIcon.classList.add("opacity-0");
      checkIcon.classList.remove("fade-out");
    }, 4200); // Time amount 4.2s
  });

  // Scale effect on button
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

// Animation for cart move
const style = document.createElement("style");
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
  color: #22c55e !important; /* Tailwind zelena: green-500 */
}
.btn-pressed {
  transform: scale(1.05);
  transition: transform 0.1s cubic-bezier(0.4,0,0.2,1);
}
`;
document.head.appendChild(style);

// Cart logic: number of items in local storage
const radioBuyOnce = document.querySelector(
  'input[name="choice"][value="option1"]'
);
const radioSubscribe = document.querySelector(
  'input[name="choice"][value="option2"]'
);

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

// Cart logic: number of items in navigation bar
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
    // Pronađi <img> unutar linka i postavi parent na relative
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

// Accordion
document.querySelectorAll("details").forEach((details) => {
  const summary = details.querySelector("summary");
  if (!summary) return;
  // Pronađi <i> ikonicu unutar summary (pretpostavlja se da je poslednja)
  const icon = summary.querySelector("i");
  if (!icon) return;
  function updateIcon() {
    icon.classList.toggle("fa-plus", !details.open);
    icon.classList.toggle("fa-minus", details.open);
  }
  summary.addEventListener("click", () => {
    setTimeout(updateIcon, 10);
  });
  // Inicijalno stanje
  updateIcon();
});

// Accordion smooth animation for details/summary

document.querySelectorAll(".animated-accordion").forEach((details) => {
  const summary = details.querySelector(".animated-accordion-toggle");
  const content = details.querySelector(".animated-accordion-content");
  if (!summary || !content) return;

  // Set initial state
  if (details.hasAttribute("open")) {
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    content.style.maxHeight = "0px";
  }

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = details.hasAttribute("open");
    if (isOpen) {
      // Close with animation, then remove open attribute after transition
      content.style.maxHeight = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
      });
      setTimeout(() => {
        details.removeAttribute("open");
      }, 500); // match duration-500
    } else {
      details.setAttribute("open", "");
      content.style.maxHeight = content.scrollHeight + "px";
      setTimeout(() => {
        if (details.hasAttribute("open")) {
          content.style.maxHeight = "none";
        }
      }, 500);
    }
  });

  // If closed by other means, reset maxHeight
  details.addEventListener("toggle", () => {
    if (!details.hasAttribute("open")) {
      content.style.maxHeight = "0px";
    }
  });
});
