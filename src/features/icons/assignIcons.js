export function assignIcons({
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
}) {
  const icons = [
    ['img[alt="Menu"]', menuIcon],
    ['img[alt="Search"], img[alt="Search-icon"]', searchIcon],
    ['img[alt="User"], img[alt="User-icon"]', userIcon],
    ['img[alt="Cart"], img[alt="Cart-icon"]', cartIcon],
    ['img[alt="Arrow"], img[alt="Menu"]:not([src])', arrowIcon],
    ['img[alt="Organic icon"]', organicIcon],
    ['img[alt="Plus"], img[alt="Plus icon"]', plusIcon],
    ['img[alt="Minus"], img[alt="Minus icon"]', minusIcon],
    ['img[alt="Previous"]', chevronLeftIcon],
    ['img[alt="Next"]', chevronRightIcon],
  ];

  window.addEventListener("DOMContentLoaded", () => {
    icons.forEach(([selector, src]) =>
      document.querySelectorAll(selector).forEach((img) => (img.src = src))
    );
  });
}
