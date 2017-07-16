import BABYLON from '../Babylon'
import config from './config'

export function paddle(scene) {
  const paddle = BABYLON.Mesh.CreatePlane("top", config.paddleSize, scene, false, BABYLON.Mesh.DOUBLESIDE)
  paddle.position = new BABYLON.Vector3(0, 0, 0)
  paddle.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.32)
  paddle.rotation.z = Math.PI / 2
  paddle.visibility = 0.5
  paddle.position.z = config.room.length * config.planeSize / 2 - 0.001
  paddle.physicsImpostor = new BABYLON.PhysicsImpostor(paddle, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1, friction: 0 }, scene)
  return paddle
}

export function frontPaddle(scene) {
  const fPaddle = paddle(scene)

  fPaddle.rotation.z = Math.PI / 2
  fPaddle.visibility = 0.5
  fPaddle.position.z = config.room.length * config.planeSize / 2 - 0.001

  return fPaddle
}

export function backPaddle(scene) {
  const fPaddle = paddle(scene)

  fPaddle.rotation.z = Math.PI / 2
  fPaddle.visibility = 0.5
  fPaddle.position.z = -config.room.length * config.planeSize / 2 + 0.001

  return fPaddle
}