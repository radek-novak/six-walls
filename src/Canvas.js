import React, { Component } from 'react'
import config from './graphics/config'
import roomSetup from './graphics/room'
import ballSetup from './graphics/ball'
import camera from './graphics/camera'
import light from './graphics/light'
import physics from './graphics/physics'
import BABYLON from './Babylon'
import {throttle} from 'lodash'
import './App.css'

function setup(canvas, engine) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const createScene = function () {
    const scene = new BABYLON.Scene(engine)

    camera(scene, canvas)
    physics(scene)
    light(scene)
    ballSetup(scene)
    const {front} = roomSetup(scene)

    const paddle = BABYLON.Mesh.CreatePlane("top", 5, scene, false, BABYLON.Mesh.DOUBLESIDE)

    paddle.position = new BABYLON.Vector3(0, 0, 0)
    // paddle.scaling = new BABYLON.Vector3(1, 1, 1)
    // paddle.backFaceCulling = true
    paddle.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.32)
    // paddle.rotation.x = 3* Math.PI / 2
    paddle.rotation.z = Math.PI / 2
    paddle.visibility = 0.5

    // paddle.rotation.y = Math.PI / 2
    paddle.position.z = config.room.length * config.planeSize / 2


    paddle.physicsImpostor = new BABYLON.PhysicsImpostor(paddle, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)

    var onPointerMove = throttle(function (evt) {
        
        const pickResult = scene.pick(scene.pointerX, scene.pointerY);

        if (pickResult.hit && pickResult.pickedMesh === front) {
          const point = pickResult.pickedPoint
          paddle.position.x = point.x
          paddle.position.y = point.y
        }
    }, 16)

    // canvas.addEventListener("pointerdown", onPointerDown, false);
    // canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        // canvas.removeEventListener("pointerdown", onPointerDown);
        // canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointermove", onPointerMove);
    }
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

class Canvas extends Component {
  componentDidMount() {
    this.engine = new BABYLON.Engine(this.canvas, true)

    setup(this.canvas, this.engine)
  }

  render() {
    return (
      <canvas
        width="800"
        height="800"
        style={{maxWidth: '100%'}}
        ref={ canvas => this.canvas = canvas }
      ></canvas>
    )
  }
}

export default Canvas
