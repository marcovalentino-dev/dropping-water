const mainCard = document.getElementById('mainCard');
let blobsCreated = false;
let allCards = [mainCard];

// Morphing continuo
function morphLoop() {
  allCards.forEach(card => {
    let angle = card.dataset.angle || 0;
    angle = parseFloat(angle) + 0.02;
    const radius = 30 + 10 * Math.sin(angle);
    card.style.borderRadius = `${radius}% ${70-radius}% ${60+radius/2}% ${40+radius/2}% / ${50-radius/2}% ${40+radius/2}% ${60-radius/3}% ${50+radius/3}%`;
    card.dataset.angle = angle;
  });
  requestAnimationFrame(morphLoop);
}
morphLoop();

// Creazione blob aggiuntivi
function createBlob(xOffset, yOffset, text) {
  const blob = document.createElement('div');
  blob.classList.add('card', 'smallCard');
  blob.style.left = `calc(50% + ${xOffset}px - 60px)`;
  blob.style.top = `calc(50% + ${yOffset}px - 80px)`;
  blob.innerHTML = `<span>${text}</span>`;
  blob.dataset.angle = 0;
  document.body.appendChild(blob);

  blob.addEventListener('pointerdown', () => blob.classList.add('active'));
  blob.addEventListener('pointerup', () => blob.classList.remove('active'));

  allCards.push(blob);
}

// Interazione principale
mainCard.addEventListener('pointerdown', () => {
  mainCard.classList.add('active');

  if (!blobsCreated) {
    blobsCreated = true;
    createBlob(-250, -180, "HTML Fun!");
    createBlob(270, -150, "CSS Magic!");
    createBlob(0, 280, "JS Power!");
  }
});

mainCard.addEventListener('pointerup', () => {
  mainCard.classList.remove('active');
});

// --- PARTICELLE LIQUIDE ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 2 + Math.random() * 4,
      color: `rgba(255,255,255,${0.2 + Math.random()*0.3})`,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7
    });
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    // Rimbalzo bordi
    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Resize canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
