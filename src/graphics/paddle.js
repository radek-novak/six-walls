import BABYLON from '../Babylon'
import config from './config'

const normalColor = new BABYLON.Color3(0.1, 0.1, 0.32)
const hitColor = new BABYLON.Color3(0.1, 0.82, 0.1)

export function paddle(scene) {
  const paddle = BABYLON.Mesh.CreatePlane('paddle', config.paddleSize, scene, false, BABYLON.Mesh.DOUBLESIDE)
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
    mesh: paddle,
    hit
  }
}

export function frontPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.z = Math.PI / 2
  aPaddle.mesh.position.z = config.room.length * config.planeSize / 2 - 0.001

  return aPaddle
}

export function backPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.z = Math.PI / 2
  aPaddle.mesh.position.z = -config.room.length * config.planeSize / 2 + 0.001

  return aPaddle
}

export function topPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.y = Math.PI / 2
  aPaddle.mesh.position.y = config.room.length * config.planeSize / 2 - 0.001

  return aPaddle
}

export function bottomPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.y = Math.PI / 2
  aPaddle.mesh.position.y = -config.room.length * config.planeSize / 2 + 0.001

  return aPaddle
}

export function leftPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.x = Math.PI / 2
  aPaddle.mesh.position.x = config.room.length * config.planeSize / 2 - 0.001

  return aPaddle
}
export function rightPaddle(scene) {
  const aPaddle = paddle(scene)

  aPaddle.mesh.rotation.x = Math.PI / 2
  aPaddle.mesh.position.x = -config.room.length * config.planeSize / 2 + 0.001

  return aPaddle
}