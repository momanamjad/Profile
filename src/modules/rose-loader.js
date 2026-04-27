const ROSE_SVG_NS = 'http://www.w3.org/2000/svg';
const roseConfig = {
  particleCount: 76,
  trailSpan: 0.31,
  durationMs: 5300,
  rotationDurationMs: 28000,
  pulseDurationMs: 4400,
  strokeWidth: 4.6,
  roseA: 9.2,
  roseABoost: 0.6,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseScale: 3.25,
  point(progress, detailScale, config) {
    const t = progress * Math.PI * 2;
    const a = config.roseA + detailScale * config.roseABoost;
    const r = a * (config.roseBreathBase + detailScale * config.roseBreathBoost) * Math.cos(3 * t);
    return {
      x: 50 + Math.cos(t) * r * config.roseScale,
      y: 50 + Math.sin(t) * r * config.roseScale,
    };
  },
};

export function initRoseLoader(loadingManager) {
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingPercent = document.getElementById('loading-percent');
  const roseGroup = document.querySelector('#rose-group');
  const rosePath = document.querySelector('#rose-path');
  
  if (rosePath) rosePath.setAttribute('stroke-width', String(roseConfig.strokeWidth));

  const roseParticles = Array.from({ length: roseConfig.particleCount }, () => {
    const circle = document.createElementNS(ROSE_SVG_NS, 'circle');
    circle.setAttribute('fill', '#ffffff');
    if (roseGroup) roseGroup.appendChild(circle);
    return circle;
  });

  let roseAnimationId;
  const roseStartedAt = performance.now();

  function buildRosePath(detailScale, steps = 480) {
    return Array.from({ length: steps + 1 }, (_, index) => {
      const point = roseConfig.point(index / steps, detailScale, roseConfig);
      return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    }).join(' ');
  }

  function getRoseParticle(index, progress, detailScale) {
    const tailOffset = index / (roseConfig.particleCount - 1);
    const p = ((progress - tailOffset * roseConfig.trailSpan) % 1 + 1) % 1;
    const point = roseConfig.point(p, detailScale, roseConfig);
    const fade = Math.pow(1 - tailOffset, 0.56);
    return {
      x: point.x,
      y: point.y,
      radius: 0.9 + fade * 2.7,
      opacity: 0.04 + fade * 0.96,
    };
  }

  function renderRose(now) {
    const time = now - roseStartedAt;
    const progress = (time % roseConfig.durationMs) / roseConfig.durationMs;
    const detailScale = 0.52 + ((Math.sin(((time % roseConfig.pulseDurationMs) / roseConfig.pulseDurationMs) * Math.PI * 2 + 0.55) + 1) / 2) * 0.48;

    if (roseGroup) roseGroup.setAttribute('transform', `rotate(${-((time % roseConfig.rotationDurationMs) / roseConfig.rotationDurationMs) * 360} 50 50)`);
    if (rosePath) {
      rosePath.setAttribute('d', buildRosePath(detailScale));
      rosePath.setAttribute('stroke', '#ffffff');
    }

    roseParticles.forEach((node, index) => {
      const particle = getRoseParticle(index, progress, detailScale);
      node.setAttribute('cx', particle.x.toFixed(2));
      node.setAttribute('cy', particle.y.toFixed(2));
      node.setAttribute('r', particle.radius.toFixed(2));
      node.setAttribute('opacity', particle.opacity.toFixed(3));
    });

    roseAnimationId = requestAnimationFrame(renderRose);
  }

  roseAnimationId = requestAnimationFrame(renderRose);

  loadingManager.onProgress = (_url, loaded, total) => {
    const pct = Math.round((loaded / total) * 100);
    if (loadingPercent) loadingPercent.textContent = pct + '%';
  };

  loadingManager.onLoad = () => {
    if (loadingOverlay) {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => { 
        loadingOverlay.style.display = 'none'; 
        cancelAnimationFrame(roseAnimationId);
      }, 600);
    }
  };
}
