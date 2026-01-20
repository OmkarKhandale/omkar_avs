// Main UI interactions
(function () {
  const nav = document.querySelector('.navbar');
  const navLinksWrapper = document.querySelector('.nav-links-wrapper');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile nav toggle
  if (navToggle && navLinksWrapper) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksWrapper.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) =>
      link.addEventListener('click', () => {
        if (navLinksWrapper.classList.contains('open')) {
          navLinksWrapper.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      })
    );
  }

  // Smooth scrolling is enabled via CSS, but we ensure focus for accessibility
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    link.addEventListener('click', (event) => {
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // Active link highlighting on scroll
  const sections = Array.from(
    document.querySelectorAll('main section[id]')
  );
  const sectionById = sections.reduce((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + (nav ? nav.offsetHeight + 12 : 80);
    let currentId = 'hero';
    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const id = href.replace('#', '');
      if (id === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  // Product filters
  const filterButtons = document.querySelectorAll('.filter-button');
  const productCards = document.querySelectorAll('.product-card');

  const applyFilter = (filter) => {
    productCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';
      filterButtons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      applyFilter(filter);
    });
  });

  // Value card reveal on button click
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach((card) => {
    const moreBtn = card.querySelector('.value-more');
    if (!moreBtn) return;
    moreBtn.addEventListener('click', () => {
      const expanded = card.classList.toggle('expanded');
      moreBtn.setAttribute('aria-expanded', String(expanded));
    });
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
})();

