/* script.js */

const images = [

  "https://i.postimg.cc/CxW5X5Jp/2025-10-23-15-08-58-1761228483-img-0.webp",

  "https://i.postimg.cc/Gpy8mG9h/2025-10-23-15-02-56-1761228159-img-0.webp",

  "https://i.postimg.cc/pdfWSZp9/20250926-0940-Modified-Earnings-Announcement-remix-01k62jsbjne0sa3h9vq88zkhg3.png",

  "https://i.postimg.cc/BbXGJcQF/20250926-0937-Profit-Goals-Achieved-remix-01k62jmgswfvhtkne5yq17ekcz.png",

  "https://i.postimg.cc/FRHMxgch/20250926-1036-APEX-TRADING-Notification-remix-01k62p0rs1ek79qn1579emkd13.png",

  "https://i.postimg.cc/q7jYghF8/IMG-20250926-092557.png",

  "https://i.postimg.cc/nzsJJGLr/20250926-0926-Apex-Trading-Certificate-remix-01k62j06njfhr861hxvqpwj5pw.png",

  "https://i.postimg.cc/5NsnBd3G/2025-10-23-15-29-36-1761228692-img-1.webp"

];

const carousel = document.getElementById('carousel');

// build slides wrapper

const slidesWrap = document.createElement('div');

slidesWrap.className = 'slides';

carousel.appendChild(slidesWrap);

// create slides

images.forEach((src, idx) => {

  const slide = document.createElement('div');

  slide.className = 'slide';

  const img = document.createElement('img');

  img.src = src;

  img.alt = `Feedback ${idx+1}`;

  const label = document.createElement('div');

  label.className = 'feedback-label';

  label.textContent = 'some of our feedback';

  slide.appendChild(img);

  slide.appendChild(label);

  slidesWrap.appendChild(slide);

});

// dots

const dotsWrap = document.getElementById('dots');

images.forEach((_, i) => {

  const d = document.createElement('div');

  d.className = 'carousel-dot';

  d.dataset.index = i;

  dotsWrap.appendChild(d);

});

let current = 0;

const slides = slidesWrap.children;

const dots = Array.from(dotsWrap.children);

const TOTAL = slides.length;

let autoplay = true;

let autoplayInterval = 3500;

let timer = null;

function update() {

  const tx = -current * 100;

  slidesWrap.style.transform = `translateX(${tx}%)`;

  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

}

function next() { current = (current + 1) % TOTAL; update(); }

function prev() { current = (current - 1 + TOTAL) % TOTAL; update(); }

// controls

document.getElementById('next').addEventListener('click', () => { next(); restartAutoplay(); });

document.getElementById('prev').addEventListener('click', () => { prev(); restartAutoplay(); });

dots.forEach(dot => dot.addEventListener('click', (e) => {

  current = Number(e.currentTarget.dataset.index); update(); restartAutoplay();

}));

// autoplay

function startAutoplay(){ if(timer) clearInterval(timer); timer = setInterval(()=> { if(autoplay) next(); }, autoplayInterval); }

function restartAutoplay(){ autoplay = true; startAutoplay(); }

carousel.addEventListener('mouseenter', ()=> autoplay = false);

carousel.addEventListener('mouseleave', ()=> autoplay = true);

update();

startAutoplay();

// touch swipe

let startX = 0, isDown = false;

carousel.addEventListener('touchstart', (e)=> { startX = e.touches[0].clientX; isDown=true; });

carousel.addEventListener('touchend',(e)=> {

  isDown=false;

  const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;

  const diff = endX - startX;

  if(diff > 40) prev();

  else if(diff < -40) next();

  restartAutoplay();

});