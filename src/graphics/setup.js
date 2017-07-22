import BABYLON from '../Babylon'
import {throttle} from 'lodash'
import config from './config'
import roomSetup from './room'
import ballSetup from './ball'
import camera from './camera'
import light from './light'
import physics from './physics'
import {
  frontPaddle,
  backPaddle,
  bottomPaddle,
  topPaddle,
  leftPaddle,
  rightPaddle
} from './paddle'
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
    const fPaddleObj = frontPaddle(scene)
    const bPaddleObj = backPaddle(scene)
    const bottPaddleObj = bottomPaddle(scene)
    const topPaddleObj = topPaddle(scene)
    const leftPaddleObj = leftPaddle(scene)
    const rightPaddleObj = rightPaddle(scene)
    const fPaddle = fPaddleObj.mesh
    const bPaddle = bPaddleObj.mesh
    const bottPaddle = bottPaddleObj.mesh
    const tpPaddle = topPaddleObj.mesh
    const lPaddle = leftPaddleObj.mesh
    const rPaddle = rightPaddleObj.mesh


    const paddleLimits = front.getBoundingInfo().boundingBox

    var onPointerMove = throttle(function (evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);

      if (pickResult.hit && pickResult.pickedMesh === front) {
        const point = pickResult.pickedPoint
        const x = limitRange(point.x, config.paddleSize, paddleLimits.minimum.x, paddleLimits.maximum.x)
        const y = limitRange(point.y, config.paddleSize, paddleLimits.minimum.y, paddleLimits.maximum.y)

        fPaddle.position.x = x
        fPaddle.position.y = y
        bPaddle.position.x = x
        bPaddle.position.y = y

        if (game.level > 1) {
          bottPaddle.position.x = x
          bottPaddle.position.z = -y
          tpPaddle.position.x = x
          tpPaddle.position.z = y
        }

        if (game.level > 2) {
          lPaddle.position.y = y
          lPaddle.position.z = x
          rPaddle.position.y = y
          rPaddle.position.z = -x
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
      gameWall(fPaddle, front, ballMesh, game, fPaddleObj.hit)
      gameWall(bPaddle, back, ballMesh, game, bPaddleObj.hit)

      if (game.level > 1) {
        gameWall(bottPaddle, bottom, ballMesh, game, bottPaddleObj.hit)
        gameWall(tpPaddle, top, ballMesh, game, topPaddleObj.hit)
      }

      if (game.level > 2) {
        gameWall(rPaddle, left, ballMesh, game, rightPaddleObj.hit)
        gameWall(lPaddle, right, ballMesh, game, leftPaddleObj.hit)
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