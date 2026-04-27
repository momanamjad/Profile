import * as RAPIER from '@dimforge/rapier3d-compat';

let world;
const dynamicBodies = [];

export async function initPhysics() {
  await RAPIER.init();
  const gravity = new RAPIER.Vector3(0.0, 0, 0.0);
  world = new RAPIER.World(gravity);
  return { world, dynamicBodies };
}

export function updatePhysics(world, dynamicBodies) {
  world.step();
  dynamicBodies.forEach(([mesh, body]) => {
    const translation = body.translation();
    const rotation = body.rotation();
    mesh.position.set(translation.x, translation.y, translation.z);
    mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  });
}
