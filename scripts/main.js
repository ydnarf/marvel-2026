/* ── PARTICLES ── */
(function() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let pts = [];
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 80; i++) {
    pts.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + .3,
      vx: (Math.random() - .5) * .00012,
      vy: (Math.random() - .5) * .00012,
      a: Math.random() * .35 + .05
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width, h = canvas.height;
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── COUNTDOWN ── */
const cdTarget = new Date('2026-12-18T00:00:00');
function tickCd() {
  const d = cdTarget - new Date();
  if (d <= 0) return;
  const pad = n => String(Math.floor(n)).padStart(2, '0');
  document.getElementById('cd-d').textContent = pad(d / 86400000);
  document.getElementById('cd-h').textContent = pad((d % 86400000) / 3600000);
  document.getElementById('cd-m').textContent = pad((d % 3600000) / 60000);
  document.getElementById('cd-s').textContent = pad((d % 60000) / 1000);
}
tickCd(); setInterval(tickCd, 1000);

/* ── SCROLL ANIMATIONS ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 120);
      observer.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.feat-card, .s-card').forEach(el => observer.observe(el));

/* ── MODAL ── */
function openModal(id, title) {
  document.getElementById('modal-title').textContent = title || '';
  if (location.protocol === 'file:') {
    window.open('https://www.youtube.com/watch?v=' + id, '_blank');
    return;
  }
  const origin = '&origin=' + encodeURIComponent(location.origin);
  document.getElementById('modal-iframe').src =
    'https://www.youtube-nocookie.com/embed/' + id +
    '?autoplay=1&rel=0&modestbranding=1' + origin;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModalBtn() {
  document.getElementById('modal-iframe').src = '';
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModal(e) {
  if (e.target === document.getElementById('modal')) closeModalBtn();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });
