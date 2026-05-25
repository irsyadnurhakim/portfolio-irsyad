const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('is-open');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const projects = {
  mixue: {
    title: 'MIXUE F&B',
    tag: 'Branding',
    image: 'assets/images/page-05.jpg',
    text: 'Developed social media and brand guideline visuals for a food and beverage brand. The direction uses clear promotional layouts, product-focused visuals, and a clean visual system.'
  },
  vardan: {
    title: 'VARDAN',
    tag: 'Brand',
    image: 'assets/images/page-06.jpg',
    text: 'A brand concept targeting mature, self-confident men. The visual direction combines futuristic technology cues, clean layouts, and consistent audience-focused communication.'
  },
  audio: {
    title: 'AUDIO ONE',
    tag: 'Visual Design',
    image: 'assets/images/page-07.jpg',
    text: 'Modern audio product visuals using bold product imagery, clean sans-serif typography, subtle sound-wave elements, and clutter-free composition.'
  },
  shakey: {
    title: 'Shakey',
    tag: 'Branding Design',
    image: 'assets/images/Artboard 1vshakey.png',
    text: 'Modern branding visuals for a fast-food chain. The design uses vibrant colors, playful typography, and engaging imagery to appeal to a young audience.'
  }
};

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    const project = projects[card.dataset.project];
    if (!project || !modal) return;
    modalImage.src = project.image;
    modalImage.alt = `${project.title} project preview`;
    modalTag.textContent = project.tag;
    modalTitle.textContent = project.title;
    modalText.textContent = project.text;
    if (typeof modal.showModal === 'function') modal.showModal();
  });
});

modalClose?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();
  const inDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
  if (!inDialog) modal.close();
});
