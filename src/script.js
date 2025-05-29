import "./input.css";
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

import { initCarousel } from "./features/carousel/carousel.js";
import { initCartActions } from "./features/cart/cartActions.js";
import { initCartStorage } from "./features/cart/cartStorage.js";
import { initMobileMenu } from "./features/menu/mobileMenu.js";
import { initAccordion } from "./features/accordion/accordion.js";
import { assignIcons } from "./features/icons/assignIcons.js";
import { initSearchModal } from "./features/search/searchModal.js";
import { updateCartBadge } from "./features/cart/cartBadge.js";

initCarousel();
initCartActions();
initCartStorage();
initMobileMenu();
initAccordion();
assignIcons({
  menuIcon,
  searchIcon,
  userIcon,
  cartIcon,
  arrowIcon,
  organicIcon,
  plusIcon,
  minusIcon,
  chevronLeftIcon,
  chevronRightIcon,
});
updateCartBadge();
initSearchModal();
