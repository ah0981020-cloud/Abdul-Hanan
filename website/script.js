'use strict';
/* ---------- Data (edit with your real details) ---------- */
const SKILLS = [
  ['HTML5', 'Core', 95, '</>'], ['CSS3', 'Core', 92, '{ }'], ['JavaScript', 'Core', 88, 'JS'],
  ['Responsive Design', 'Design', 94, '▭'], ['DOM Manipulation', 'Core', 90, 'DOM'], ['ES6+', 'Core', 87, 'ES'],
  ['APIs', 'Tools', 82, 'API'], ['Git/GitHub', 'Tools', 85, 'Git'], ['UI/UX', 'Design', 80, 'UX'],
  ['Performance Optimization', 'Tools', 78, '⚡']
];
const GRADS = ['#06b6d4,#3b82f6', '#8b5cf6,#ec4899', '#f59e0b,#ef4444', '#10b981,#06b6d4', '#6366f1,#8b5cf6', '#ec4899,#f97316'];
const PROJECTS = [
  ['Nebula Dashboard', 'Web App', 'A responsive analytics dashboard with live charts, filters and dark mode.', ['JavaScript', 'CSS Grid', 'API'], '📊'],
  ['Shopline Store', 'Website', 'A fast e-commerce front end with cart, search and accessible product pages.', ['HTML5', 'CSS3', 'LocalStorage'], '🛒'],
  ['Weather Pulse', 'Web App', 'Real-time weather app using a public API with geolocation and 5-day forecast.', ['ES6+', 'Fetch API'], '⛅'],
  ['Taskflow', 'Web App', 'Drag-and-drop task manager with persistent storage and keyboard support.', ['JavaScript', 'DOM'], '✅'],
  ['Aurora Landing', 'Website', 'A high-conversion landing page with scroll animations and perfect Lighthouse scores.', ['HTML5', 'CSS3', 'Animations'], '🌌'],
  ['Pixel UI Kit', 'UI Design', 'A reusable component library of buttons, cards and forms built with CSS variables.', ['CSS3', 'UI/UX'], '🎨']
].map((p, i) => ({ title: p[0], cat: p[1], desc: p[2], tech: p[3], icon: p[4], grad: GRADS[i] }));
const JOBS = [
  ['Freelance Frontend Developer', 'Self-employed', '2024 – Present', ['Built responsive websites for small businesses', 'Improved page speed and accessibility'], ['HTML', 'CSS', 'JavaScript']],
  ['Web Development Student', 'Class Projects', '2023 – 2024', ['Created portfolio and practice projects', 'Learned Git workflows and responsive design'], ['HTML', 'CSS', 'Git']]
];
const SERVICES = [['🖥️', 'Frontend Development', 'Clean, maintainable interfaces built to modern standards.'], ['📱', 'Responsive Web Design', 'Layouts that look great from small phones to 4K screens.'], ['⚙️', 'JavaScript Development', 'Interactive features with fast, modular vanilla JavaScript.'], ['🚀', 'Performance Optimization', 'Faster loads, better Core Web Vitals and SEO.'], ['🧩', 'UI Implementation', 'Pixel-accurate implementation of your designs.'], ['🛠️', 'Website Maintenance', 'Updates, fixes and improvements to keep sites healthy.']];
const REVIEWS = [['Sara K.', 'Founder, Bloom Studio', 'Delivered a beautiful, fast website ahead of schedule. Communication was excellent.', 5], ['Omar R.', 'Product Manager, Techlyn', 'Great attention to detail and very responsive layouts. Highly recommended.', 5], ['Ayesha M.', 'Owner, Craft Corner', 'Our new site is smooth and easy to use. Customers love it.', 4]];
const ROLES = ['Frontend Developer', 'JavaScript Engineer', 'UI Craftsman', 'Responsive Design Specialist'];
const STATS = [['Years of Experience', 2, '+'], ['Projects Completed', 24, '+'], ['Happy Clients', 12, '+'], ['Technologies', 10, '+']];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

/* ---------- Render ---------- */
$('#year').textContent = new Date().getFullYear();
$('#stats').innerHTML = STATS.map(s => `<div class="stat glass reveal"><strong data-to="${s[1]}" data-suf="${s[2]}">0</strong><span>${s[0]}</span></div>`).join('');
$('#skillGrid').innerHTML = SKILLS.map(s => `<article class="card glass reveal" data-cat="${s[1]}"><div class="skill-top"><div class="ring-p" data-v="${s[2]}"><span>${s[2]}%</span></div><div><h3>${s[0]}</h3><span class="skill-ic">${s[3]} · ${s[1]}</span></div></div><div class="bar"><i data-w="${s[2]}"></i></div></article>`).join('');
$('#projGrid').innerHTML = PROJECTS.map((p, i) => `<article class="card proj glass reveal" tabindex="0" role="button" aria-label="Open details for ${p.title}" data-i="${i}" data-cat="${p.cat}" data-text="${(p.title + ' ' + p.desc + ' ' + p.tech.join(' ')).toLowerCase()}"><div class="pv"><div class="prev" style="background:linear-gradient(135deg,${p.grad})">${p.icon}</div></div><div class="body"><h3>${p.title}</h3><p class="muted">${p.desc}</p><div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div><div class="acts"><a href="#" data-link>Live Demo</a><a href="#" data-link>GitHub</a></div></div></article>`).join('');
$('#timeline').innerHTML = JOBS.map(j => `<li class="t-item glass reveal"><h3>${j[0]}</h3><div class="when">${j[1]} · ${j[2]}</div><ul>${j[3].map(r => `<li>${r}</li>`).join('')}</ul><div class="tags">${j[4].map(t => `<span>${t}</span>`).join('')}</div></li>`).join('');
$('#serviceGrid').innerHTML = SERVICES.map(s => `<article class="card glass reveal"><div class="svc-ic" aria-hidden="true">${s[0]}</div><h3>${s[1]}</h3><p class="muted">${s[2]}</p></article>`).join('');
$('#track').innerHTML = REVIEWS.map(r => `<figure class="t-card glass"><div class="av" aria-hidden="true">${r[0][0]}</div><div class="stars" aria-label="${r[3]} out of 5 stars">${stars(r[3])}</div><blockquote>“${r[2]}”</blockquote><figcaption><strong>${r[0]}</strong><br><span class="muted">${r[1]}</span></figcaption></figure>`).join('');

/* Filter chips builder (shared by skills & projects) */
function chips(el, cats, onPick) {
  el.innerHTML = ['All', ...cats].map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-c="${c}">${c}</button>`).join('');
  el.addEventListener('click', e => { // event delegation
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', el).forEach(x => x.setAttribute('aria-pressed', x === b));
    onPick(b.dataset.c);
  });
}
const uniq = a => [...new Set(a)];

/* ---------- Preloader ---------- */
(function preloader() {
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 9));
    $('#preFill').style.width = n + '%'; $('#prePct').textContent = n + '%';
    if (n === 100) { clearInterval(t); setTimeout(() => { $('#preloader').classList.add('done'); typing(); }, 300); }
  }, reduced ? 5 : 60);
})();

/* ---------- Typing effect ---------- */
function typing() {
  const el = $('#typed'); let r = 0, c = 0, del = false;
  if (reduced) { el.textContent = ROLES[0]; return; }
  (function tick() {
    const word = ROLES[r];
    el.textContent = word.slice(0, c += del ? -1 : 1);
    let wait = del ? 40 : 90;
    if (!del && c === word.length) { del = true; wait = 1400; }
    else if (del && c === 0) { del = false; r = (r + 1) % ROLES.length; wait = 400; }
    setTimeout(tick, wait);
  })();
}

/* ---------- Scroll: progress, back-to-top, active nav ---------- */
const toTop = $('#toTop');
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  toTop.classList.toggle('show', h.scrollTop > 600);
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

const links = $$('.menu a');
const navObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => navObs.observe(s));

/* ---------- Mobile menu & theme ---------- */
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
try { const s = localStorage.getItem('theme'); if (s) document.documentElement.dataset.theme = s; } catch (e) { /* storage unavailable */ }
$('#themeBtn').addEventListener('click', () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) { /* ignore */ }
});

/* ---------- Reveal, counters, skill bars ---------- */
const revObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; el.classList.add('in'); revObs.unobserve(el);
  const num = $('[data-to]', el); if (num) count(num);
  const bar = $('[data-w]', el); if (bar) bar.style.width = bar.dataset.w + '%';
  const ring = $('.ring-p', el); if (ring) ring.style.setProperty('--v', ring.dataset.v);
}), { threshold: .15 });
$$('.reveal').forEach(el => revObs.observe(el));

function count(el) {
  const to = +el.dataset.to, suf = el.dataset.suf || '', dur = reduced ? 1 : 1400, t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : '');
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- Skill filter ---------- */
chips($('#skillFilters'), uniq(SKILLS.map(s => s[1])), c =>
  $$('#skillGrid .card').forEach(el => { el.hidden = c !== 'All' && el.dataset.cat !== c; }));

/* ---------- Projects: filter + search + modal ---------- */
let pCat = 'All', pQ = '';
function applyProjects() {
  let shown = 0;
  $$('.proj').forEach(el => {
    const ok = (pCat === 'All' || el.dataset.cat === pCat) && el.dataset.text.includes(pQ);
    el.classList.toggle('hide', !ok); shown += ok;
  });
  $('#noRes').hidden = shown > 0;
}
chips($('#projFilters'), uniq(PROJECTS.map(p => p.cat)), c => { pCat = c; applyProjects(); });
$('#search').addEventListener('input', e => { pQ = e.target.value.trim().toLowerCase(); applyProjects(); });

const modal = $('#modal');
function openModal(i) {
  const p = PROJECTS[i];
  $('#mTitle').textContent = p.title; $('#mDesc').textContent = p.desc;
  $('#mTags').innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');
  const pv = $('#mPrev'); pv.style.background = `linear-gradient(135deg,${p.grad})`; pv.textContent = p.icon;
  modal.showModal();
}
$('#projGrid').addEventListener('click', e => {
  if (e.target.closest('[data-link]')) { e.preventDefault(); return; } // placeholder links
  const card = e.target.closest('.proj'); if (card) openModal(+card.dataset.i);
});
$('#projGrid').addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('proj')) { e.preventDefault(); openModal(+e.target.dataset.i); }
});
$('#mClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); }); // backdrop click
$$('#mLive,#mGit').forEach(a => a.addEventListener('click', e => e.preventDefault()));

/* ---------- Testimonial slider ---------- */
(function slider() {
  let i = 0, timer; const n = REVIEWS.length, track = $('#track');
  const go = k => { i = (k + n) % n; track.style.transform = `translateX(-${i * 100}%)`; };
  const start = () => { if (!reduced) timer = setInterval(() => go(i + 1), 5000); };
  const stop = () => clearInterval(timer);
  $('#next').addEventListener('click', () => go(i + 1));
  $('#prev').addEventListener('click', () => go(i - 1));
  const s = $('#slider');
  ['mouseenter', 'focusin'].forEach(ev => s.addEventListener(ev, stop));
  ['mouseleave', 'focusout'].forEach(ev => s.addEventListener(ev, () => { stop(); start(); }));
  start();
})();

/* ---------- Contact form validation ---------- */
(function form() {
  const f = $('#form'), msg = $('#message');
  const rules = {
    name: v => v.trim().length >= 2 || 'Please enter your name (2+ characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Please enter a valid email address.',
    subject: v => v.trim().length >= 3 || 'Please add a subject (3+ characters).',
    message: v => v.trim().length >= 10 || 'Message must be at least 10 characters.'
  };
  const check = k => {
    const input = f.elements[k], res = rules[k](input.value);
    input.closest('.field').classList.toggle('invalid', res !== true);
    input.setAttribute('aria-invalid', res !== true);
    $('#e-' + k).textContent = res === true ? '' : res;
    return res === true;
  };
  msg.addEventListener('input', () => { $('#count').textContent = msg.value.length; });
  f.addEventListener('blur', e => { if (rules[e.target.name]) check(e.target.name); }, true);
  f.addEventListener('submit', e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { f.querySelector('[aria-invalid=true]')?.focus(); return; }
    $('#success').hidden = false; // demo only: wire to a backend or form service
    setTimeout(() => { $('#success').hidden = true; f.reset(); $('#count').textContent = 0; }, 3500);
  });
})();

/* ---------- Mouse glow & custom cursor ---------- */
if (matchMedia('(pointer:fine)').matches && !reduced) {
  document.body.classList.add('has-cursor');
  const glow = $('#glow'), cur = $('#cursor'); let x = 0, y = 0, gx = 0, gy = 0;
  addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; cur.style.transform = `translate(${x - 7}px,${y - 7}px)`; }, { passive: true });
  (function loop() { gx += (x - gx) * .08; gy += (y - gy) * .08; glow.style.transform = `translate(${gx - 210}px,${gy - 210}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.proj,input,textarea')));
} else { $('#glow').style.display = 'none'; }
