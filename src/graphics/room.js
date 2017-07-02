import BABYLON from '../Babylon'

export default function roomSetup(scene) {
    // Material
  const matPlan = new BABYLON.StandardMaterial("matPlan1", scene)
  matPlan.backFaceCulling = false
  matPlan.emissiveColor = new BABYLON.Color3(0.2, 0.25, 0.2)

  // const roomWidth = 20
  // const roomHeight = 20
  const roomLength = 5
  const planeSize = 20

  const top = BABYLON.Mesh.CreatePlane("top", planeSize, scene)
  const bottom = BABYLON.Mesh.CreatePlane("bottom", planeSize, scene)
  const left = BABYLON.Mesh.CreatePlane("left", planeSize, scene)
  const right = BABYLON.Mesh.CreatePlane("right", planeSize, scene)
  const front = BABYLON.Mesh.CreatePlane("front", planeSize, scene)
  const back = BABYLON.Mesh.CreatePlane("back", planeSize, scene)

  bottom.position = new BABYLON.Vector3(0, planeSize/2, 0)
  top.position = new BABYLON.Vector3(0, -planeSize/2, 0)
  left.position = new BABYLON.Vector3(-planeSize/2, 0, 0)
  right.position = new BABYLON.Vector3(planeSize/2, 0, 0)
  bottom.scaling = new BABYLON.Vector3(1, roomLength, 1)
  top.scaling = new BABYLON.Vector3(1, roomLength, 1)
  left.scaling = new BABYLON.Vector3(1, roomLength, 1)
  right.scaling = new BABYLON.Vector3(1, roomLength, 1)

  left.rotation.y = Math.PI / 2
  right.rotation.y = Math.PI / 2
  left.rotation.z = Math.PI / 2
  right.rotation.z = Math.PI / 2
  top.rotation.x = Math.PI / 2
  bottom.rotation.x = Math.PI / 2

  bottom.material = matPlan
  top.material = matPlan
  left.material = matPlan
  right.material = matPlan

  top.physicsImpostor = new BABYLON.PhysicsImpostor(top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
  bottom.physicsImpostor = new BABYLON.PhysicsImpostor(bottom, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
  left.physicsImpostor = new BABYLON.PhysicsImpostor(left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
  right.physicsImpostor = new BABYLON.PhysicsImpostor(right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)

  return {top, bottom, left, right, front, back}
}