import React, { Component } from 'react'
import roomSetup from './graphics/room'
import ballSetup from './graphics/ball'
import camera from './graphics/camera'
import light from './graphics/light'
import physics from './graphics/physics'
import BABYLON from './Babylon'
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
    roomSetup(scene)

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
