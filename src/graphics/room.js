import BABYLON from '../Babylon'
import config from '../config'

const roomLength = config.room.length
const planeSize = config.planeSize

let drawText = _ => null
let leftRight = _ => null
let topBottom = _ => null

function frame(scene) {
  const cylMat = new BABYLON.StandardMaterial('cylMat', scene)
  cylMat.diffuseColor = new BABYLON.Color3(0.05, 0.04, 0)
  
  const cylinder = () => {
    const cyl = BABYLON.Mesh.CreateCylinder("cylinder", planeSize, 0.5, 0.5, 64, null, scene, false)
    cyl.material = cylMat
    return cyl
  }

  const cylBL = cylinder()
  cylBL.position.x = -planeSize / 2
  cylBL.position.z = -planeSize / 2
  const cylBR = cylinder()
  cylBR.position.x = planeSize / 2
  cylBR.position.z = -planeSize / 2
  const cylBB = cylinder()
  cylBB.rotation.z = Math.PI / 2
  cylBB.position.y = -planeSize / 2
  cylBB.position.z = -planeSize / 2
  const cylBT = cylinder()
  cylBT.rotation.z = Math.PI / 2
  cylBT.position.y = planeSize / 2
  cylBT.position.z = -planeSize / 2

  const cylMTL = cylinder()
  cylMTL.position.x = planeSize / 2
  cylMTL.position.y = planeSize / 2
  const cylMBL = cylinder()
  cylMBL.position.x = planeSize / 2
  cylMBL.position.y = -planeSize / 2
  const cylMTR = cylinder()
  cylMTR.position.x = -planeSize / 2
  cylMTR.position.y = planeSize / 2
  const cylMBR = cylinder()
  cylMBR.position.x = -planeSize / 2
  cylMBR.position.y = -planeSize / 2

  ;[cylMTL, cylMBL, cylMTR, cylMBR].forEach(c => { c.rotation.x = Math.PI / 2 })

}

export default function roomSetup(scene) {
  const matTransparent = new BABYLON.StandardMaterial('matPlan2', scene)
  matTransparent.backFaceCulling = true
  matTransparent.diffuseColor = new BABYLON.Color4(0.01, 0.01, 0.02, 0.1)

  const getRoadMaterial = () => {
    var roadmaterial = new BABYLON.StandardMaterial('road', scene);
    var roadmaterialpt = new BABYLON.RoadProceduralTexture('customtext', 512, scene);
    roadmaterial.diffuseTexture = roadmaterialpt;
    roadmaterial.emissiveColor = new BABYLON.Color3(1, 0.84, 0)
  
    return roadmaterial
  }

  var groundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
  drawText = text => groundTexture.drawText(text.toString(), null, 345, "bold 250px Helvetica", "#eed077", "#ffffff")
	
	var dynamicMaterial = new BABYLON.StandardMaterial('mat', scene);
  dynamicMaterial.diffuseTexture = groundTexture;
  dynamicMaterial.emissiveColor = new BABYLON.Color3(1,1,1)
  dynamicMaterial.backFaceCulling = true;

  frame(scene)

  const top = BABYLON.Mesh.CreatePlane('top', planeSize, scene)
  const bottom = BABYLON.Mesh.CreatePlane('bottom', planeSize, scene)
  const left = BABYLON.Mesh.CreatePlane('left', planeSize, scene)
  const right = BABYLON.Mesh.CreatePlane('right', planeSize, scene)
  const front = BABYLON.Mesh.CreatePlane('front', planeSize, scene)
  const back = BABYLON.Mesh.CreatePlane('back', planeSize, scene)

  bottom.scaling = new BABYLON.Vector3(1, roomLength, 1)
  top.scaling = new BABYLON.Vector3(1, roomLength, 1)
  left.scaling = new BABYLON.Vector3(1, roomLength, 1)
  right.scaling = new BABYLON.Vector3(1, roomLength, 1)

  front.position = new BABYLON.Vector3(0, 0, (roomLength*planeSize)/2)
  back.position = new BABYLON.Vector3(0, 0, -(roomLength*planeSize)/2)
  top.position = new BABYLON.Vector3(0, planeSize/2, 0)
  bottom.position = new BABYLON.Vector3(0, -planeSize/2, 0)
  right.position = new BABYLON.Vector3(-planeSize/2, 0, 0)
  left.position = new BABYLON.Vector3(planeSize/2, 0, 0)

  right.rotation.y = 3*Math.PI / 2
  left.rotation.y = Math.PI / 2
  right.rotation.z = Math.PI / 2
  left.rotation.z = Math.PI / 2
  bottom.rotation.x = Math.PI / 2
  top.rotation.x = 3 * Math.PI / 2
  back.rotation.x = Math.PI
  back.rotation.z = Math.PI

  top.material = getRoadMaterial()
  bottom.material = getRoadMaterial()
  left.material = getRoadMaterial()
  right.material = getRoadMaterial()
  front.material = matTransparent
  back.material = dynamicMaterial

  
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