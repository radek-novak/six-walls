import BABYLON from '../Babylon'
import config from './config'

const normalColor = new BABYLON.Color3(0.1, 0.1, 0.32)
const hitColor = new BABYLON.Color3(0.1, 0.82, 0.1)
const blank = new BABYLON.Color4(0, 0, 0, 0)
let leftRightPaddle = _ => null
let topBottomPaddle = _ => null

function paddle(scene) {
  const paddle = BABYLON.Mesh.CreatePlane('paddle', config.paddleSize, scene, false, BABYLON.Mesh.DOUBLESIDE)
  paddle.position = new BABYLON.Vector3(0, 0, 0)
  paddle.material = new BABYLON.StandardMaterial("texture1", scene);  
  paddle.material.emissiveColor = normalColor
  paddle.rotation.z = Math.PI / 2
  paddle.visibility = 0.5
  paddle.position.z = config.room.length * config.planeSize / 2 - 0.001
  paddle.physicsImpostor = new BABYLON.PhysicsImpostor(paddle, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)

  function hit() {
    paddle.material.emissiveColor = hitColor
    paddle.visibility = 0.8

    window.setTimeout(() => {
      paddle.material.emissiveColor = normalColor
      paddle.visibility = 0.4
    }, 100)
  }

  return {
    mesh: paddle,
    hit
  }
}

function frontPaddleF(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.z = Math.PI / 2
  aPaddle.mesh.position.z = config.room.length * config.planeSize / 2 - 0.001

  return aPaddle
}

function backPaddleF(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.z = Math.PI / 2
  aPaddle.mesh.position.z = -config.room.length * config.planeSize / 2 + 0.001

  return aPaddle
}

function topPaddleF(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.y = Math.PI / 2
  aPaddle.mesh.position.y = config.room.length * config.planeSize / 2 - 0.001
  
  return aPaddle
}

function bottomPaddleF(scene) {
  const aPaddle = paddle(scene)
  
  aPaddle.mesh.rotation.y = 3*Math.PI / 2
  aPaddle.mesh.position.y = -config.room.length * config.planeSize / 2 + 0.001
  
  return aPaddle
}

function leftPaddleF(scene) {
  const aPaddle = paddle(scene)
  
  aPaddle.mesh.rotation.x = Math.PI / 2
  aPaddle.mesh.position.x = config.room.length * config.planeSize / 2 - 0.001
  // aPaddle.mesh.material.emissiveColor = new BABYLON.Color3(1, 0.4, 0)
  
  return aPaddle
}
function rightPaddleF(scene) {
  const aPaddle = paddle(scene)
  
  aPaddle.mesh.rotation.x = Math.PI / 2
  aPaddle.mesh.position.x = -config.room.length * config.planeSize / 2 + 0.001

  return aPaddle
}

function paddleSetup(scene) {
  const paddles = {
    frontPaddle: frontPaddleF(scene),
    backPaddle: backPaddleF(scene),
    topPaddle: topPaddleF(scene),
    bottomPaddle: bottomPaddleF(scene),
    leftPaddle: leftPaddleF(scene),
    rightPaddle: rightPaddleF(scene)
  }

  topBottomPaddle = on => {
    paddles.topPaddle.mesh.material.emissiveColor = on ? normalColor : blank
    paddles.topPaddle.mesh.visibility = on ? 0.8 : 0
    paddles.bottomPaddle.mesh.material.emissiveColor = on ? normalColor : blank
    paddles.bottomPaddle.mesh.visibility = on ? 0.8 : 0
  }
  
  leftRightPaddle = on => {
    paddles.leftPaddle.mesh.material.emissiveColor = on ? normalColor : blank
    paddles.leftPaddle.mesh.visibility = on ? 0.8 : 0
    paddles.rightPaddle.mesh.material.emissiveColor = on ? normalColor : blank
    paddles.rightPaddle.mesh.visibility = on ? 0.8 : 0
  }

  return paddles
}

export default paddleSetup

export {
  topBottomPaddle,
  leftRightPaddle
}