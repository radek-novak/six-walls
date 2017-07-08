import {throttle} from 'lodash'
import config from './config'
import roomSetup from './room'
import ballSetup from './ball'
import camera from './camera'
import light from './light'
import physics from './physics'
import paddleSetup from './paddle'
import {limitRange} from '../helpers/limit'
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
    const paddleLimits = front.getBoundingInfo().boundingBox

    var onPointerMove = throttle(function (evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);

      if (pickResult.hit && pickResult.pickedMesh === front) {
        const point = pickResult.pickedPoint
        paddle.position.x = limitRange(point.x, config.paddleSize, paddleLimits.minimum.x, paddleLimits.maximum.x)
        paddle.position.y = limitRange(point.y, config.paddleSize, paddleLimits.minimum.y, paddleLimits.maximum.y)
      }
    }, 16)

    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
      canvas.removeEventListener("pointermove", onPointerMove);
    }

    scene.registerBeforeRender(function () {
      const hitPaddle = ball.intersectsMesh(paddle, true)
      const hitFront = ball.intersectsMesh(front, true)
      // if(ball.intersectsMesh(front, true) && !hitPaddle) // lost

      if(hitPaddle) {
        paddle.visibility = 0.9
        ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -10), ball.getAbsolutePosition());
        console.log('hit')
        window.setTimeout(() => {paddle.visibility = 0.5}, 100)
      }

      if (hitFront && !hitPaddle) {
        
      }
    })
    // ball.physicsImpostor.registerOnPhysicsCollide(front.physicsImpostor, () => {
    //   console.log('hit wall')
    // })
    // ball.physicsImpostor.registerOnPhysicsCollide(paddle.physicsImpostor, () => {
    //   paddle.visibility = 0.9
    //   ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -99520), ball.getAbsolutePosition());
    //   console.log('hit')
    //   window.setTimeout(() => {paddle.visibility = 0.5}, 100)
    // });

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