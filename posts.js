/* ============================================
   POSTS PAGE JAVASCRIPT
   posts.js
   ============================================ */

/* ---------- Project Data ---------- */
const projectData = {
  'nova-brand': {
    type: 'Branding · Web Design',
    title: 'Nova Brand Identity System',
    desc: 'A full visual identity project for a tech startup. This included logo design, colour system, typography selection, brand guidelines document, and a fully responsive landing page. Delivered across both print and digital touchpoints to create a cohesive brand experience.',
    tags: ['Figma', 'Illustrator', 'HTML/CSS', 'Brand Strategy'],
    date: 'March 2024',
    emoji: '🚀',
  },
  'event-poster': {
    type: 'Graphic Design',
    title: 'Event Poster Series',
    desc: 'A series of bold typographic poster campaigns designed for cultural and music events. Combined editorial photography with layered type systems and strong colour contrast to create eye-catching print and digital assets.',
    tags: ['Photoshop', 'Illustrator', 'Print Design'],
    date: 'January 2024',
    emoji: '🎭',
  },
  'portfolio-cms': {
    type: 'Web Development',
    title: 'Portfolio CMS',
    desc: 'A custom-built web platform for a creative agency featuring a fully dynamic portfolio system. Includes an admin panel for content management, animated project pages, and a responsive front end built from scratch.',
    tags: ['JavaScript', 'Node.js', 'CSS', 'REST API'],
    date: 'November 2023',
    emoji: '💻',
  },
  'brand-film': {
    type: 'Video · Motion Graphics',
    title: 'Brand Film — Ceylonese',
    desc: 'A 90-second brand story film created for a local Sri Lankan business. Includes custom motion graphics, professional colour grading, original sound design, and narrative storytelling to communicate the brand\'s values and vision.',
    tags: ['Premiere Pro', 'After Effects', 'Colour Grading', 'Sound Design'],
    date: 'September 2023',
    emoji: '🎬',
  },
  'logo-pack': {
    type: 'Branding',
    title: 'Logo Design Pack',
    desc: 'A collection of 12 bespoke logo concepts designed for small businesses across retail, hospitality, and tech industries. Each logo was crafted with scalability and brand storytelling in mind.',
    tags: ['Illustrator', 'Branding', 'Typography'],
    date: 'July 2023',
    emoji: '✏️',
  },
  'social-kit': {
    type: 'Web · Graphic Design',
    title: 'Social Media Kit',
    desc: 'A complete social media template kit covering Instagram posts and stories, Facebook banners, and LinkedIn headers. Built as editable Figma components for easy client customisation.',
    tags: ['Figma', 'Photoshop', 'Templates'],
    date: 'May 2023',
    emoji: '📱',
  },
};

/* ---------- Filter Logic ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card');
const noResults = document.getElementById('noResults');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    postCards.forEach(card => {
      const cats = card.dataset.category || '';
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  });
});

/* ---------- Modal Logic ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openModal(id) {
  const p = projectData[id];
  if (!p) return;

  modalContent.innerHTML = `
    <div class="modal-preview">${p.emoji}</div>
    <div class="modal-info">
      <div class="modal-type">${p.type}</div>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <div class="modal-date">📅 ${p.date}</div>
    </div>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ---------- URL Param — auto-open project ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');
  if (projectId && projectData[projectId]) {
    // Small delay so modal animation plays properly
    setTimeout(() => openModal(projectId), 400);
  }
});

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));
