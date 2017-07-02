import BABYLON from '../Babylon'

export default function ballSetup(scene) {
  // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene)

  // Move the sphere upward 1/2 its height
  sphere.position.y = 0
  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.1, restitution: 1.05 }, scene)
  sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,0))

  return sphere
}