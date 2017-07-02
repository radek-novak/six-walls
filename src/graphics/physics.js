import BABYLON from '../Babylon'

export default function roomSetup(scene) {
  // const gravityVector = new BABYLON.Vector3(0,-9.81, 0)
  const gravityVector = new BABYLON.Vector3(0, 0, 0)
  const physicsPlugin = new BABYLON.CannonJSPlugin()
  scene.enablePhysics(gravityVector, physicsPlugin)
}