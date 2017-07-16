import BABYLON from '../Babylon'

export default function camera(scene, canvas) {
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene)
  // Quick, let's use the setPosition() method... with a common Vector3 position, to make our camera better aimed.
  camera.setPosition(new BABYLON.Vector3(0, 0, 35))
  // camera.fov = 1.3
  // camera.attachControl(canvas, true)
  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero())

}