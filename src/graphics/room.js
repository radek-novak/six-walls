import BABYLON from '../Babylon'
import config from './config'

let drawText = _ => null
let leftRight = _ => null
let topBottom = _ => null

export default function roomSetup(scene) {
  const roomLength = config.room.length
  const planeSize = config.planeSize
  
  // Material
  // const matPlan = new BABYLON.StandardMaterial('matPlan1', scene)
  // matPlan.backFaceCulling = false
  // matPlan.emissiveColor = new BABYLON.Color3(0.2, 0.25, 0.2)
  const matTransparent = new BABYLON.StandardMaterial('matPlan2', scene)
  matTransparent.backFaceCulling = true
  matTransparent.diffuseColor = new BABYLON.Color4(0.01, 0.01, 0.02, 0.1)

  const getRoadMaterial = () => {
    var roadmaterial = new BABYLON.StandardMaterial('road', scene);
    var roadmaterialpt = new BABYLON.RoadProceduralTexture('customtext', 512, scene);
    roadmaterial.diffuseTexture = roadmaterialpt;
    return roadmaterial
  }

  var groundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
  drawText = text => groundTexture.drawText(text.toString(), null, 345, "bold 250px Helvetica", "#abc", "#ffffff")
	
	var dynamicMaterial = new BABYLON.StandardMaterial('mat', scene);
  dynamicMaterial.diffuseTexture = groundTexture;
  dynamicMaterial.emissiveColor = new BABYLON.Color3(1,1,1)
  dynamicMaterial.backFaceCulling = true;

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
  bottom.rotation.x = 3 * Math.PI / 2
  back.rotation.x = Math.PI
  back.rotation.z = Math.PI

  bottom.material = getRoadMaterial()
  top.material = getRoadMaterial()
  left.material = getRoadMaterial()
  right.material = getRoadMaterial()
  front.material = matTransparent
  back.material = dynamicMaterial

  // right.material.emissiveColor = new BABYLON.Color3(0, 1, 1)

  
  const wallImpostor = mesh => new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)

  top.physicsImpostor = wallImpostor(top)
  bottom.physicsImpostor = wallImpostor(bottom)
  left.physicsImpostor = wallImpostor(left)
  right.physicsImpostor = wallImpostor(right)
  front.physicsImpostor = wallImpostor(front)
  back.physicsImpostor = wallImpostor(back)

  drawText('0')

  leftRight = (on) => {
    left.material.alpha = on ? 1 : 0.05
    right.material.alpha = on ? 1 : 0.05
  }

  topBottom = (on) => {
    top.material.alpha = on ? 1 : 0.05
    bottom.material.alpha = on ? 1 : 0.05
  }

  return {
    top,
    bottom,
    left,
    right,
    front,
    back,
    drawText
  }
}

export {
  drawText,
  leftRight,
  topBottom
}