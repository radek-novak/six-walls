import BABYLON from '../Babylon'
import config from './config'

const normalColor = new BABYLON.Color3(0.1, 0.1, 0.32)
const hitColor = new BABYLON.Color3(0.1, 0.82, 0.1)

export function paddle(scene) {
  const paddle = BABYLON.Mesh.CreatePlane("top", config.paddleSize, scene, false, BABYLON.Mesh.DOUBLESIDE)
  paddle.position = new BABYLON.Vector3(0, 0, 0)
  paddle.emissiveColor = normalColor
  paddle.rotation.z = Math.PI / 2
  paddle.visibility = 0.5
  paddle.position.z = config.room.length * config.planeSize / 2 - 0.001
  paddle.physicsImpostor = new BABYLON.PhysicsImpostor(paddle, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)

  function hit() {
    paddle.emissiveColor = hitColor
    paddle.visibility = 0.8

    window.setTimeout(() => {
      paddle.emissiveColor = normalColor
      paddle.visibility = 0.4
    }, 100)
  }

  return {
    paddle,
    hit
  }
}

export function frontPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.paddle.rotation.z = Math.PI / 2
  aPaddle.paddle.visibility = 0.5
  aPaddle.paddle.position.z = config.room.length * config.planeSize / 2 - 0.001

  return aPaddle
}

export function backPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.paddle.rotation.z = Math.PI / 2
  aPaddle.paddle.visibility = 0.5
  aPaddle.paddle.position.z = -config.room.length * config.planeSize / 2 + 0.001

  return aPaddle
}