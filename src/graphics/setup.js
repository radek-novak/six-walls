import BABYLON from '../Babylon'
import {throttle} from 'lodash'
import config from './config'
import roomSetup from './room'
import ballSetup from './ball'
import camera from './camera'
import light from './light'
import physics from './physics'
import setupPaddle from './paddle'
// import {
//   setupPaddle
//   frontPaddle,
//   backPaddle,
//   bottomPaddle,
//   topPaddle,
//   leftPaddle,
//   rightPaddle
// } from './paddle'
import {limitRange} from '../helpers/limit'
import {game} from '../game/state'
import gameWall from '../game/gameWall'

export default function setup(canvas, engine, updateState) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const createScene = function () {
    const scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    
    camera(scene, canvas)
    physics(scene)
    light(scene)
    const {ballMesh} = ballSetup(scene)
    const {
      front,
      back,
      bottom,
      top,
      left,
      right
    } = roomSetup(scene)
    const {
      frontPaddle,
      backPaddle,
      bottomPaddle,
      topPaddle,
      leftPaddle,
      rightPaddle
    } = setupPaddle(scene)
    const frontPaddleMesh = frontPaddle.mesh
    const backPaddleMesh = backPaddle.mesh
    const bottomPaddleMesh = bottomPaddle.mesh
    const topPaddleMesh = topPaddle.mesh
    const leftPaddleMesh = leftPaddle.mesh
    const rightPaddleMesh = rightPaddle.mesh

    game.level = 1


    const paddleLimits = front.getBoundingInfo().boundingBox

    var onPointerMove = throttle(function (evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);

      if (pickResult.hit && pickResult.pickedMesh === front) {
        const point = pickResult.pickedPoint
        const x = limitRange(point.x, config.paddleSize, paddleLimits.minimum.x, paddleLimits.maximum.x)
        const y = limitRange(point.y, config.paddleSize, paddleLimits.minimum.y, paddleLimits.maximum.y)

        frontPaddleMesh.position.x = x
        frontPaddleMesh.position.y = y
        backPaddleMesh.position.x = x
        backPaddleMesh.position.y = y

        if (game.level > 1) {
          bottomPaddleMesh.position.x = x
          bottomPaddleMesh.position.z = -y
          topPaddleMesh.position.x = x
          topPaddleMesh.position.z = y
        }

        if (game.level > 2) {
          leftPaddleMesh.position.y = y
          leftPaddleMesh.position.z = x
          rightPaddleMesh.position.y = y
          rightPaddleMesh.position.z = -x
        }
      }
    }, 16)

    game.onupdate = updateState


    canvas.addEventListener('click', ()=> {
      if (game.isPaused()) return game.start()
      if (game.isLost()) return game.reset()
    })

    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = () => canvas.removeEventListener("pointermove", onPointerMove)

    scene.registerBeforeRender(() => {
      gameWall(frontPaddleMesh, front, ballMesh, game, frontPaddle.hit)
      gameWall(backPaddleMesh, back, ballMesh, game, backPaddle.hit)

      if (game.level > 1) {
        gameWall(bottomPaddleMesh, bottom, ballMesh, game, bottomPaddle.hit)
        gameWall(topPaddleMesh, top, ballMesh, game, topPaddle.hit)
      }

      if (game.level > 2) {
        gameWall(rightPaddleMesh, left, ballMesh, game, leftPaddle.hit)
        gameWall(leftPaddleMesh, right, ballMesh, game, rightPaddle.hit)
      }
    })

    return scene
  }

  const scene = createScene()

  engine.runRenderLoop(function () {
    scene.render()
  })

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    engine.resize()
  })
}