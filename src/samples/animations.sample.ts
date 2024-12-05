import type { SampleFunction } from '../types/sample';
import { createTweakerUI } from '../lib/tweaker/TweakerUI';

export const BouncingBall: SampleFunction = () => {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '300px';
  container.style.position = 'relative';
  container.style.background = 'var(--bg-secondary)';
  container.style.borderRadius = '8px';
  container.style.overflow = 'hidden';

  const ball = document.createElement('div');
  ball.style.width = '50px';
  ball.style.height = '50px';
  ball.style.borderRadius = '50%';
  ball.style.background = '#ff4757';
  ball.style.position = 'absolute';
  ball.style.left = '50%';
  ball.style.transform = 'translateX(-50%)';
  
  let animationDuration = 1000;
  let isAnimating = true;
  let color = '#ff4757';

  function updateBallAnimation() {
    ball.style.transition = `top ${animationDuration}ms cubic-bezier(0.36, 0, 0.66, -0.56)`;
    ball.style.background = color;
  }
  updateBallAnimation();

  let isUp = true;
  ball.style.top = '20px';

  let interval = setInterval(() => {
    if (isAnimating) {
      ball.style.top = isUp ? '230px' : '20px';
      isUp = !isUp;
    }
  }, animationDuration);

  const tweaker = createTweakerUI();

  tweaker.addButton({
    label: () => isAnimating ? 'Stop' : 'Start',
    trigger: () => {
      isAnimating = !isAnimating;
    }
  });

  tweaker.addRangeInput({
    label: () => `Speed: ${(1000/animationDuration).toFixed(1)}x`,
    get: () => 1000/animationDuration,
    set: value => { 
      animationDuration = 1000/value;
      clearInterval(interval);
      interval = setInterval(() => {
        if (isAnimating) {
          ball.style.top = isUp ? '230px' : '20px';
          isUp = !isUp;
        }
      }, animationDuration);
      updateBallAnimation();
    },
    start: 0.2,
    end: 3,
    step: 0.1
  });

  tweaker.addStringInput({
    label: 'Color',
    get: () => color,
    set: value => {
      color = value;
      updateBallAnimation();
    }
  });

  container.appendChild(ball);
  return [container, tweaker.dom];
};

export const ParticleSystem: SampleFunction = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  canvas.style.background = 'var(--bg-secondary)';
  canvas.style.borderRadius = '8px';

  const ctx = canvas.getContext('2d')!;
  let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
  
  let isRunning = true;
  let particleCount = 50;
  let particleSize = 3;
  let speed = 1;
  let color = 'rgba(255, 255, 255, 0.5)';

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * particleSize + 1
    };
  }

  function resetParticles() {
    particles = Array.from({ length: particleCount }, () => createParticle());
  }

  resetParticles();

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    particles.forEach(p => {
      p.vx = ((Math.random() - 0.5) * 2) * speed;
      p.vy = ((Math.random() - 0.5) * 2) * speed;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    if (isRunning) {
      requestAnimationFrame(update);
    }
  }

  const tweaker = createTweakerUI();

  tweaker.addButton({
    label: () => isRunning ? 'Stop' : 'Start',
    trigger: () => {
      isRunning = !isRunning;
      if (isRunning) update();
    }
  });

  tweaker.addRangeInput({
    label: () => `Speed: ${speed.toFixed(1)}`,
    get: () => speed,
    set: value => { speed = value; },
    start: 0.1,
    end: 3,
    step: 0.1
  });

  tweaker.addNumericInput({
    label: 'Particle Count',
    get: () => particleCount,
    set: value => {
      particleCount = value;
      resetParticles();
    },
    min: 1,
    max: 200
  });

  tweaker.addRangeInput({
    label: 'Particle Size',
    get: () => particleSize,
    set: value => {
      particleSize = value;
      resetParticles();
    },
    start: 1,
    end: 10,
    step: 0.5
  });

  tweaker.addStringInput({
    label: 'Color',
    get: () => color,
    set: value => { color = value; }
  });

  update();
  return [canvas, tweaker.dom];
};

export const WaveAnimation: SampleFunction = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 200;
  canvas.style.background = 'var(--bg-secondary)';
  canvas.style.borderRadius = '8px';

  const ctx = canvas.getContext('2d')!;
  
  let amplitude = 50;
  let frequency = 0.02;
  let speed = 0.05;
  let color = '#4834d4';
  let isRunning = true;
  let phase = 0;

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height/2 + Math.sin(x * frequency + phase) * amplitude;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    phase += speed;

    if (isRunning) {
      requestAnimationFrame(update);
    }
  }

  const tweaker = createTweakerUI();

  tweaker.addButton({
    label: () => isRunning ? 'Stop' : 'Start',
    trigger: () => {
      isRunning = !isRunning;
      if (isRunning) update();
    }
  });

  tweaker.addRangeInput({
    label: 'Amplitude',
    get: () => amplitude,
    set: value => { amplitude = value; },
    start: 10,
    end: 100,
    step: 1
  });

  tweaker.addRangeInput({
    label: 'Frequency',
    get: () => frequency,
    set: value => { frequency = value; },
    start: 0.01,
    end: 0.1,
    step: 0.001
  });

  tweaker.addRangeInput({
    label: 'Speed',
    get: () => speed,
    set: value => { speed = value; },
    start: 0.01,
    end: 0.2,
    step: 0.01
  });

  tweaker.addStringInput({
    label: 'Color',
    get: () => color,
    set: value => { color = value; }
  });

  update();
  return [canvas, tweaker.dom];
};