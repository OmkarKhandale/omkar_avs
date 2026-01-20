// Animated counters for trust metrics
(function () {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-target')) || 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toString();
      }
    };

    window.requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
})();

