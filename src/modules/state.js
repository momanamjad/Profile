import * as THREE from 'three';

export const state = {
  currentSection: 0,
  lastSection: 0,
  smartphoneMode: false,
  laptopInitiated: false,
  timerStarted: false,
  phoneFullscreen: false,
  nophonefullscreen: false,
  mouse: new THREE.Vector2(),
  vh: window.innerHeight,
  iw: window.innerWidth,
  aspect: window.innerWidth / window.innerHeight,
};
