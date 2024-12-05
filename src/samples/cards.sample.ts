import type { SampleFunction } from '../types/sample';
import { createTweakerUI } from '../lib/tweaker/TweakerUI';

export const HoverCard: SampleFunction = () => {
  const card = document.createElement('div');
  card.style.width = '300px';
  card.style.padding = '20px';
  card.style.borderRadius = '12px';
  card.style.background = 'var(--bg-secondary)';
  card.style.transition = 'transform 0.3s, box-shadow 0.3s';
  card.style.cursor = 'pointer';

  const title = document.createElement('h3');
  title.textContent = 'Interactive Card';
  title.style.margin = '0 0 10px 0';
  title.style.color = 'var(--text-primary)';

  const description = document.createElement('p');
  description.textContent = 'Hover over me to see a smooth animation effect. This card demonstrates various CSS transitions and transforms.';
  description.style.margin = '0';
  description.style.color = 'var(--text-secondary)';
  description.style.fontSize = '14px';
  description.style.lineHeight = '1.5';

  let hoverScale = 0.95;
  let shadowBlur = 24;
  let shadowColor = 'rgba(0,0,0,0.15)';

  function updateCard() {
    card.style.transform = `scale(1)`;
    card.style.boxShadow = 'none';
  }

  card.addEventListener('mouseenter', () => {
    card.style.transform = `scale(${hoverScale})`;
    card.style.boxShadow = `0 8px ${shadowBlur}px ${shadowColor}`;
  });

  card.addEventListener('mouseleave', () => {
    updateCard();
  });

  const tweaker = createTweakerUI();

  tweaker.addRangeInput({
    label: 'Hover Scale',
    get: () => hoverScale,
    set: value => { hoverScale = value; updateCard(); },
    start: 0.8,
    end: 1.2,
    step: 0.05
  });

  tweaker.addRangeInput({
    label: 'Shadow Blur',
    get: () => shadowBlur,
    set: value => { shadowBlur = value; updateCard(); },
    start: 0,
    end: 50,
    step: 1
  });

  tweaker.addStringInput({
    label: 'Shadow Color',
    get: () => shadowColor,
    set: value => { shadowColor = value; updateCard(); }
  });

  card.appendChild(title);
  card.appendChild(description);

  return [card, tweaker.dom];
};

export const ProgressCard: SampleFunction = () => {
  const card = document.createElement('div');
  card.style.width = '300px';
  card.style.padding = '20px';
  card.style.borderRadius = '12px';
  card.style.background = 'var(--bg-secondary)';

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.marginBottom = '15px';

  const title = document.createElement('h3');
  title.textContent = 'Project Status';
  title.style.margin = '0';
  title.style.color = 'var(--text-primary)';

  const percentage = document.createElement('span');
  percentage.style.color = 'var(--text-secondary)';

  const progressBar = document.createElement('div');
  progressBar.style.width = '100%';
  progressBar.style.height = '6px';
  progressBar.style.backgroundColor = 'var(--border-color)';
  progressBar.style.borderRadius = '3px';
  progressBar.style.overflow = 'hidden';

  const progress = document.createElement('div');
  progress.style.height = '100%';
  progress.style.transition = 'width 0.3s, background-color 0.3s';

  let progressValue = 75;
  let progressColor = '#0066cc';
  let barHeight = 6;

  function updateProgress() {
    percentage.textContent = `${progressValue}%`;
    progress.style.width = `${progressValue}%`;
    progress.style.backgroundColor = progressColor;
    progressBar.style.height = `${barHeight}px`;
  }
  updateProgress();

  const tweaker = createTweakerUI();

  tweaker.addRangeInput({
    label: 'Progress',
    get: () => progressValue,
    set: value => { progressValue = value; updateProgress(); },
    start: 0,
    end: 100,
    step: 1
  });

  tweaker.addStringInput({
    label: 'Color',
    get: () => progressColor,
    set: value => { progressColor = value; updateProgress(); }
  });

  tweaker.addRangeInput({
    label: 'Height',
    get: () => barHeight,
    set: value => { barHeight = value; updateProgress(); },
    start: 2,
    end: 20,
    step: 1
  });

  header.appendChild(title);
  header.appendChild(percentage);
  progressBar.appendChild(progress);
  card.appendChild(header);
  card.appendChild(progressBar);

  return [card, tweaker.dom];
};