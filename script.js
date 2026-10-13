/* Plain JavaScript: navigation, a scroll-linked perspective scene, and a range lab. */
'use strict';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuToggle = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('#menu-panel');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? 'Close' : 'Explore';
  menuPanel.hidden = !open;
  menuPanel.inert = !open;
  main.inert = open;
  footer.inert = open;
  document.body.classList.toggle('menu-open', open);
  if (open) menuPanel.querySelector('a').focus();
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('#menu-panel a, .site-header a').forEach(link => link.addEventListener('click', () => {
  setMenu(false);
  const target = document.querySelector(link.getAttribute('href'));
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}));
document.addEventListener('keydown', event => {
  if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { setMenu(false); menuToggle.focus(); }
  if (event.key === 'Tab') {
    const focusable = [...document.querySelectorAll('.site-header a, .site-header button, #menu-panel a')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
// The still images live in a CSS 3D space. Scroll changes camera angle and perspective.
const design = document.querySelector('#design');
const stage = document.querySelector('.design-sticky');
const frames = [...document.querySelectorAll('.car-frame')];
const viewButtons = [...document.querySelectorAll('[data-view]')];
const captions = ['The first impression. Impossible to forget.', 'One continuous line. A thousand small decisions.', 'A new signature. From every point of view.'];
const progressBar = document.querySelector('.design-progress span');
const heroImage = document.querySelector('.hero-image');
let activeView = 0;
let lastProgress = -1;
function selectView(index) {
  activeView = index;
  frames.forEach((frame, i) => { frame.classList.toggle('active', i === index); frame.setAttribute('aria-hidden', String(i !== index)); });
  viewButtons.forEach((button, i) => { button.classList.toggle('active', i === index); button.setAttribute('aria-pressed', String(i === index)); });
  document.querySelector('#view-number').textContent = `0${index + 1} — 03`;
  document.querySelector('#view-description').textContent = captions[index];
}
viewButtons.forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.view);
  selectView(index);
  if (!motionPreference.matches) {
    const distance = design.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: design.offsetTop + distance * [0.06, 0.5, 0.94][index], behavior: 'instant' });
  } else progressBar.style.width = `${((index + 1) / 3) * 100}%`;
}));
let framePending = false;
function updateScroll() {
  framePending = false;
  if (motionPreference.matches) return;
  const rect = design.getBoundingClientRect();
  const distance = Math.max(1, design.offsetHeight - stage.offsetHeight);
  const progress = Math.max(0, Math.min(1, -rect.top / distance));
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    if (Math.abs(progress - lastProgress) > 0.0001) {
      const index = Math.min(2, Math.floor(progress * 3));
      if (index !== activeView) selectView(index);
      progressBar.style.width = `${progress * 100}%`;
      const local = progress * 3 - index;
      frames.forEach((frame, i) => {
        if (i === index) frame.style.transform = `translateZ(${local * 28}px) rotateY(${(local - 0.5) * 3}deg) scale(1.025)`;
      });
      lastProgress = progress;
    }
  }
  if (window.scrollY < window.innerHeight * 1.4) heroImage.style.transform = `translateY(${window.scrollY * 0.16}px) scale(1.02)`;
}
function requestScrollUpdate() { if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); } }
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', () => { lastProgress = -1; requestScrollUpdate(); });
motionPreference.addEventListener('change', () => { lastProgress = -1; requestScrollUpdate(); });
updateScroll();
// Energy model: range = usable kWh × charge fraction ÷ kWh per 100 km × 100.
// MPGe = 33.7 kWh/gallon-equivalent × 100 km ÷ 1.609344 km/mile ÷ consumption.
const modes = {
  eco: { consumption: 13.5, description: 'A lighter touch. Maximum distance.' },
  tour: { consumption: 16.8, description: 'A balanced rhythm for the long way home.' },
  sport: { consumption: 21.3, description: 'More response. A little less horizon.' }
};
let currentMode = 'eco';
const chargeInput = document.querySelector('#charge');
function updateRange() {
  const charge = Number(chargeInput.value);
  const { consumption, description } = modes[currentMode];
  document.querySelector('#charge-label').textContent = `${charge}%`;
  document.querySelector('#range-value').textContent = Math.round(92 * (charge / 100) / consumption * 100);
  document.querySelector('#consumption').textContent = consumption.toFixed(1);
  document.querySelector('#mpge').textContent = Math.round(33.7 * 100 / 1.609344 / consumption);
  document.querySelector('#mode-description').textContent = description;
  chargeInput.style.background = `linear-gradient(to right, #59644c ${(charge - 20) / 0.8}%, #ccd1c3 ${(charge - 20) / 0.8}%)`;
  const relativeRange = (charge / 100) * 13.5 / consumption;
  document.querySelector('.range-track').style.width = `${relativeRange * 100}%`;
  document.querySelector('.range-car').style.left = `${relativeRange * 95}%`;
}
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  currentMode = button.dataset.mode;
  document.querySelectorAll('[data-mode]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  updateRange();
}));
chargeInput.addEventListener('input', updateRange);
updateRange();
const dialog = document.querySelector('#specs-dialog');
document.querySelector('#specs-open').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
