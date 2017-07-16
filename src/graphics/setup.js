import {throttle} from 'lodash'
import config from './config'
import roomSetup from './room'
import ballSetup from './ball'
import camera from './camera'
import light from './light'
import physics from './physics'
import {frontPaddle, backPaddle} from './paddle'
import {limitRange} from '../helpers/limit'
import BABYLON from '../Babylon'
import {game} from '../game/state'
import gameWall from '../game/gameWall'

export default function setup(canvas, engine) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const createScene = function () {
    const scene = new BABYLON.Scene(engine)

    camera(scene, canvas)
    physics(scene)
    light(scene)
    const {ballMesh, startBall, resetBall} = ballSetup(scene)
    const {front, back} = roomSetup(scene)
    const fPaddle = frontPaddle(scene)
    const bPaddle = backPaddle(scene)
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
      }
    }, 16)


    canvas.addEventListener('click', ()=> {
      if (game.isPaused()) return game.start()
      if (game.isLost()) return game.reset()
    })

    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = () => canvas.removeEventListener("pointermove", onPointerMove)

    scene.registerBeforeRender(() => {
      gameWall(fPaddle, front, ballMesh, game)
      gameWall(bPaddle, back, ballMesh, game)
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