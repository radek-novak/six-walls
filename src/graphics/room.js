import BABYLON from '../Babylon'
import config from './config'

let drawText = () => null

export default function roomSetup(scene) {
  const roomLength = config.room.length
  const planeSize = config.planeSize
  
  // Material
  const matPlan = new BABYLON.StandardMaterial('matPlan1', scene)
  matPlan.backFaceCulling = false
  matPlan.emissiveColor = new BABYLON.Color3(0.2, 0.25, 0.2)
  const matFrontBack = new BABYLON.StandardMaterial('matPlan2', scene)
  matFrontBack.backFaceCulling = true
  matFrontBack.diffuseColor = new BABYLON.Color4(0.01, 0.01, 0.02, 0.1)

	var roadmaterial = new BABYLON.StandardMaterial('road', scene);
  var roadmaterialpt = new BABYLON.RoadProceduralTexture('customtext', 512, scene);
  roadmaterial.diffuseTexture = roadmaterialpt;

  const top = BABYLON.Mesh.CreatePlane('top', planeSize, scene)
  const bottom = BABYLON.Mesh.CreatePlane('bottom', planeSize, scene)
  const left = BABYLON.Mesh.CreatePlane('left', planeSize, scene)
  const right = BABYLON.Mesh.CreatePlane('right', planeSize, scene)
  const front = BABYLON.Mesh.CreatePlane('front', planeSize, scene)
  const back = BABYLON.Mesh.CreatePlane('back', planeSize, scene)

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

  left.rotation.y = 3*Math.PI / 2
  right.rotation.y = Math.PI / 2
  left.rotation.z = Math.PI / 2
  right.rotation.z = Math.PI / 2
  top.rotation.x = Math.PI / 2
  bottom.rotation.x = 3* Math.PI / 2
  back.rotation.x = Math.PI
  back.rotation.z = Math.PI

  bottom.material = roadmaterial
  top.material = roadmaterial
  left.material = roadmaterial
  right.material = roadmaterial
  front.material = matFrontBack

  top.physicsImpostor = new BABYLON.PhysicsImpostor(top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  bottom.physicsImpostor = new BABYLON.PhysicsImpostor(bottom, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  left.physicsImpostor = new BABYLON.PhysicsImpostor(left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  right.physicsImpostor = new BABYLON.PhysicsImpostor(right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  front.physicsImpostor = new BABYLON.PhysicsImpostor(front, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  back.physicsImpostor = new BABYLON.PhysicsImpostor(back, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)

  var groundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
  drawText = text => groundTexture.drawText(text.toString(), null, 345, "bold 250px Helvetica", "#abc", "#ffffff")
	
	var dynamicMaterial = new BABYLON.StandardMaterial('mat', scene);
  dynamicMaterial.diffuseTexture = groundTexture;
  dynamicMaterial.emissiveColor = new BABYLON.Color3(1,1,1)
  dynamicMaterial.backFaceCulling = true;

  back.material = dynamicMaterial
  drawText('0')

  return {top, bottom, left, right, front, back, drawText}
}

export {drawText}