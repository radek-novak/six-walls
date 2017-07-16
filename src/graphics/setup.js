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
import {game, state$, playing$} from '../game/state'
import {Observable} from 'rxjs'

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

    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
      canvas.removeEventListener("pointermove", onPointerMove);
    }
    game.start()
    // playing$.distinctUntilChanged().subscribe(isPlaying => {
    //   console.log('playing', isPlaying)
    //   if (!isPlaying) {
    //     ball.position = BABYLON.Vector3.Zero()
    //     ball.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero())
    //   }
    // })
    
    // const click$ = Observable.fromEvent(document, 'click');
    // playing$.subscribe(isPlaying => {
    //   console.log('stopping game', isPlaying)
    //   if(!isPlaying) {
    //     ball.position = BABYLON.Vector3.Zero()
    //     ball.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero())
    //   }
    // })


    // click$.withLatestFrom(playing$).subscribe(([click, playing]) => {
    //   console.log('with latest', playing, click)
    //   if (!playing) {
    //     ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,20))
    //   }
    // })
    // playing$.filter(x => !x)
    //   .merge(click$)
    //   .subscribe(x => {
    //     game.start()
    //     ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,20))
    //   })
    // playing$.next(true)
    // click$.subscribe(x => {
    //   console.log('paused: ', x)
    //   game.start()
    //   ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,20))
    // })//.subscribe(x => console.log('click sub', x))

    // Observable.combineLatest(playing$, click$, (p, c) => ({playing: p, click: c})).subscribe(({playing, click}) => {
    //   // const isPlaying = data[0]
    //   // const click = data[1]

    //   console.log('merged', playing, click)
    //   if (!playing) {
    //     ball.position = BABYLON.Vector3.Zero()
    //     ball.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero())
    //   }
    //   if(!playing && click) {
    //     game.start()
    //     ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,20))
    //   }
    // })

    scene.registerBeforeRender((function () {
      let isHittingPaddle = false;
      let isHittingFront = false;

      return () => {
        const hitPaddle = ball.intersectsMesh(fPaddle, true)
        const hitFront = ball.intersectsMesh(front, true)

        if(hitPaddle) {
          // ball.physicsImpostor.registerOnPhysicsCollide
          if (isHittingPaddle) return

          game.incrementScore();
          fPaddle.visibility = 0.9
          ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -0.1), ball.getAbsolutePosition());
          window.setTimeout(() => {fPaddle.visibility = 0.5}, 100)

          isHittingPaddle = true
        } else {
          isHittingPaddle = false
        }

        if (hitFront && !hitPaddle && !isHittingPaddle) {
          console.log('lost', hitFront, hitPaddle, hitFront)
          game.lost()
        }
      }
    })())

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