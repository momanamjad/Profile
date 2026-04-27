import * as THREE from 'three';

export function resetInitialScrollPosition() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function smoothToTarget(object, target, smoothing, snapThreshold = 0.015) {
  if (!object) return;
  object.position.lerp(target, smoothing);
  if (object.position.distanceToSquared(target) < snapThreshold * snapThreshold) {
    object.position.copy(target);
  }
}

export function getScreenPosition(object3D, camera, renderer) {
  const vector = new THREE.Vector3();
  const canvas = renderer.domElement;
  vector.copy(object3D.position);
  vector.project(camera);

  return {
    x: (vector.x + 1) / 2 * canvas.clientWidth,
    y: (-vector.y + 1) / 2 * canvas.clientHeight
  };
}
