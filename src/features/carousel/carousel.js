export function initCarousel() {
  const container = document.querySelector(".carousel");
  const slides = container?.children;
  const prev = document.querySelector(".prev-btn");
  const next = document.querySelector(".next-btn");

  if (!container || !slides?.length || !prev || !next) return;

  const scrollSlide = (direction) =>
    container.scrollBy({
      left: direction * slides[0].offsetWidth,
      behavior: "smooth",
    });

  prev.addEventListener("click", () => scrollSlide(-1));
  next.addEventListener("click", () => scrollSlide(1));
}
