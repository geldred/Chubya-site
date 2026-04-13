// ─── NAV TOGGLE ──────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('nav-open');
});

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('nav-open'));
});

// ─── SCHEDULE CARD NAVIGATION ───────────────────────────
document.querySelectorAll('.schedule-card[data-target]').forEach(card => {
  const navigate = () => {
    const target = document.querySelector(card.dataset.target);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  card.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    navigate();
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate();
    }
  });
});

// ─── HISTORY TABS ─────────────────────────────────────────
document.querySelectorAll('.history-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update active tab
    document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('history-tab--active'));
    tab.classList.add('history-tab--active');

    // Show correct table
    document.querySelectorAll('.history-table').forEach(t => t.classList.add('hidden'));
    document.getElementById(`history-${target}`)?.classList.remove('hidden');
  });
});

// ─── SMOOTH NAV HIGHLIGHT ─────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--gold-400)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ─── ENTRY ANIMATIONS ─────────────────────────────────────
const fadeEls = document.querySelectorAll(
  '.schedule-card, .team-card, .round-card, .player-card, .stat-card, .matchup'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (entry.target.dataset.delay || 0) * 1);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 80}ms, transform 0.5s ease ${(i % 4) * 80}ms`;
  fadeObserver.observe(el);
});
