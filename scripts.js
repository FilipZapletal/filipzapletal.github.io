        
        // Hamburger script
        const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
        const navCollapse = document.querySelector('.navbar-collapse');

        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            const bsCollapse = new bootstrap.Collapse(navCollapse, {
              toggle: false
            });
            bsCollapse.hide();
          });
        });

        // cursor script
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let waves = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Wave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 0.5; // start more subtle
  }
  update() {
    this.radius += 0.7;      // slower growth (was 2)
    this.alpha -= 0.005;     // slower fade (was 0.02)
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 150, 255, ${this.alpha})`;
    ctx.lineWidth = 1;
    ctx.shadowColor = `rgba(0, 150, 255, ${this.alpha})`;
    ctx.shadowBlur = 15;
    ctx.stroke();
  }
}

// Spawn waves less aggressively:
let lastWaveTime = 0;
window.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastWaveTime > 150) { // 1 wave every 150ms max
    waves.push(new Wave(e.clientX, e.clientY));
    lastWaveTime = now;
  }
});

function animate() {
  ctx.clearRect(0, 0, width, height);
  waves.forEach((wave, i) => {
    wave.update();
    if (wave.alpha <= 0) waves.splice(i, 1);
    else wave.draw();
  });
  requestAnimationFrame(animate);
}

animate();
