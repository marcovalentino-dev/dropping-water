const scene = document.getElementById('scene');
const speedSlider = document.getElementById('speed');
const lightning = document.querySelector('.lightning');

function setSpeed(val) {
  document.querySelectorAll('.drop').forEach(d =>
    d.style.animationDuration = val + 's'
  );
}

function setDensity(count) {
  const drops = Array.from(scene.querySelectorAll('.drop'));
  drops.forEach(d => d.remove());

  for (let i = 0; i < count; i++) {
    const d = drops[i] ? drops[i].cloneNode() : document.createElement('div');
    d.className = 'drop';
    d.style.setProperty('--delay', -(Math.random()*12).toFixed(2)+'s');
    d.style.setProperty('--tx', (Math.random()*50-25).toFixed(2)+'vmin');
    d.style.setProperty('--tz', (Math.random()*50-25).toFixed(2)+'vmin');
    scene.appendChild(d);
  }
  setSpeed(speedSlider.value);
}

speedSlider.addEventListener('input', e => setSpeed(e.target.value));

setSpeed(speedSlider.value);
