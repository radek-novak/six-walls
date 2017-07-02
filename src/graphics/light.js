import BABYLON from '../Babylon'

export default function light(scene) {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene)

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7
}