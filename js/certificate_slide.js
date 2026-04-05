document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".certificate-section-row");
  const container = document.querySelector(".certificate-container");

  let position = 0;
  let speed = 4;
  let animationId = null;
  let isPaused = false;

  function animateScroll() {
    const rowWidth = row.scrollWidth;
    const containerWidth = container.clientWidth;

    position -= speed;

    if (position < -rowWidth) {
      position = containerWidth;
    }

    row.style.transform = `translateX(${position}px)`;

    animationId = requestAnimationFrame(animateScroll);
  }

  container.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationId);
  });

  container.addEventListener("mouseleave", () => {
    animateScroll();
  });

  animateScroll();
});
