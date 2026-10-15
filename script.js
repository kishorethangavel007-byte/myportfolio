const cards = document.querySelectorAll('.card');

const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

cards.forEach(card => {
  const resetTilt = () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  };

  card.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) {
      resetTilt();
      return;
    }

    // Measure the grid and the card's untransformed layout position.
    const grid = card.parentElement;
    const gridRect = grid.getBoundingClientRect();

    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;

    const x = event.clientX - gridRect.left - card.offsetLeft;
    const y = event.clientY - gridRect.top - card.offsetTop;

    const clamp = value => Math.max(-1, Math.min(1, value));

    const rotateX = clamp((y - centerY) / centerY) * -8;
    const rotateY = clamp((x - centerX) / centerX) * 8;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('pointerleave', resetTilt);
  card.addEventListener('pointercancel', resetTilt);

  reducedMotion.addEventListener('change', resetTilt);
});