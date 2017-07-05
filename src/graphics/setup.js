import {throttle} from 'lodash'
// import config from './config'
import roomSetup from './room'
import ballSetup from './ball'
import camera from './camera'
import light from './light'
import physics from './physics'
import paddleSetup from './paddle'
import BABYLON from '../Babylon'

export default function setup(canvas, engine) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const createScene = function () {
    const scene = new BABYLON.Scene(engine)

    camera(scene, canvas)
    physics(scene)
    light(scene)
    const ball = ballSetup(scene)
    const {front} = roomSetup(scene)
    const paddle = paddleSetup(scene)

    var onPointerMove = throttle(function (evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);

      if (pickResult.hit && pickResult.pickedMesh === front) {
        const point = pickResult.pickedPoint
        paddle.position.x = point.x
        paddle.position.y = point.y
      }
    }, 16)

    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
      canvas.removeEventListener("pointermove", onPointerMove);
    }

    // scene.registerBeforeRender(function () {
    //   const hitPaddle = ball.intersectsMesh(paddle, true)
    //   if(ball.intersectsMesh(front, true) && !hitPaddle) ball.position.z = 0
    // })

    ball.physicsImpostor.registerOnPhysicsCollide(paddle.physicsImpostor, () => {
      paddle.visibility = 1
      window.setTimeout(() => {paddle.visibility = 0.5}, 200)
    });

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