/* ============================================
   PROJECT PAGE JS — project-page.js
   Lightbox logic shared across all project pages
   ============================================ */

let lbIndex = 0;
let lbItems = [];

function openLb(index, items) {
  lbItems = items;
  lbIndex = index;
  renderLb();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function shiftLb(dir) {
  lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
  renderLb();
}

function renderLb() {
  const item = lbItems[lbIndex];
  const el = document.getElementById('lbImg');
  el.innerHTML = item.src
    ? `<img src="${item.src}" alt="${item.caption}">`
    : item.emoji;
  document.getElementById('lbCaption').textContent =
    `${item.caption}  —  ${lbIndex + 1} / ${lbItems.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  shiftLb(1);
  if (e.key === 'ArrowLeft')   shiftLb(-1);
});
