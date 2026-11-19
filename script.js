document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Interactive Tabs for Events & Projects
  const tabBtns = document.querySelectorAll('.tab-btn');
  const eventCards = document.querySelectorAll('.event-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      eventCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Chronological Board Archive Accordion
  const chronicleItems = document.querySelectorAll('.chronicle-year-item');
  const expandAllBtn = document.getElementById('expand-all-boards');
  const collapseAllBtn = document.getElementById('collapse-all-boards');

  chronicleItems.forEach((item) => {
    const trigger = item.querySelector('.chronicle-year-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    }
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      chronicleItems.forEach((item) => item.classList.add('open'));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      chronicleItems.forEach((item) => item.classList.remove('open'));
    });
  }
});
