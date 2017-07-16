import BABYLON from '../Babylon'
import config from './config'

export default function roomSetup(scene) {
  const roomLength = config.room.length
  const planeSize = config.planeSize
  
  // Material
  const matPlan = new BABYLON.StandardMaterial("matPlan1", scene)
  matPlan.backFaceCulling = false
  matPlan.emissiveColor = new BABYLON.Color3(0.2, 0.25, 0.2)
  const matFrontBack = new BABYLON.StandardMaterial("matPlan2", scene)
  matFrontBack.backFaceCulling = false
  matFrontBack.diffuseColor = new BABYLON.Color3(0.1, 0.01, 0.12)

  const top = BABYLON.Mesh.CreatePlane("top", planeSize, scene)
  const bottom = BABYLON.Mesh.CreatePlane("bottom", planeSize, scene)
  const left = BABYLON.Mesh.CreatePlane("left", planeSize, scene)
  const right = BABYLON.Mesh.CreatePlane("right", planeSize, scene)
  const front = BABYLON.Mesh.CreatePlane("front", planeSize, scene)
  const back = BABYLON.Mesh.CreatePlane("back", planeSize, scene)

  front.position = new BABYLON.Vector3(0, 0, (roomLength*planeSize)/2)
  back.position = new BABYLON.Vector3(0, 0, -(roomLength*planeSize)/2)
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
  front.material = matFrontBack
  back.material = matFrontBack

  front.visibility = 0.1

  top.physicsImpostor = new BABYLON.PhysicsImpostor(top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  bottom.physicsImpostor = new BABYLON.PhysicsImpostor(bottom, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  left.physicsImpostor = new BABYLON.PhysicsImpostor(left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  right.physicsImpostor = new BABYLON.PhysicsImpostor(right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  front.physicsImpostor = new BABYLON.PhysicsImpostor(front, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  back.physicsImpostor = new BABYLON.PhysicsImpostor(back, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)

  return {top, bottom, left, right, front, back}
}