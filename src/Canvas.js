import React, { Component } from 'react'
// import BABYLON, {Engine} from 'babylonjs'
import './App.css'

const BABYLON = window.BABYLON

function setup(canvas, engine) {
   // This begins the creation of a function that we will 'call' just after it's built
  const createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine)

    // This creates and positions a free camera (non-mesh)
    // const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene)
    // const camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.5, 0, new BABYLON.Vector3(50, 0, 0), scene)
     // Create an ArcRotateCamera aimed at 0,0,0, with no alpha, beta or radius, so be careful. It will look broken.
   const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene)
   // Quick, let's use the setPosition() method... with a common Vector3 position, to make our camera better aimed.
   camera.setPosition(new BABYLON.Vector3(0, 0, 30))
    camera.attachControl(canvas, true)

    // const gravityVector = new BABYLON.Vector3(0,-9.81, 0)
    const gravityVector = new BABYLON.Vector3(0, 0, 0)
    
    const physicsPlugin = new BABYLON.CannonJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin)
    // scene.enablePhysics()

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero())

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene)

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene)

    // Move the sphere upward 1/2 its height
    sphere.position.y = 0
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.1, restitution: 1.05 }, scene)
    sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,0))

    // Material
    const matPlan = new BABYLON.StandardMaterial("matPlan1", scene)
    matPlan.backFaceCulling = false
    matPlan.emissiveColor = new BABYLON.Color3(0.2, 0.25, 0.2)

    const roomWidth = 20
    const roomHeight = 20
    const roomLength = 5
    const planeSize = 20

    const top = BABYLON.Mesh.CreatePlane("top", planeSize, scene)
    const bottom = BABYLON.Mesh.CreatePlane("bottom", planeSize, scene)
    const left = BABYLON.Mesh.CreatePlane("left", planeSize, scene)
    const right = BABYLON.Mesh.CreatePlane("right", planeSize, scene)
    const front = BABYLON.Mesh.CreatePlane("front", planeSize, scene)
    const back = BABYLON.Mesh.CreatePlane("back", planeSize, scene)

    // PlaneImpostor

    
    bottom.position = new BABYLON.Vector3(0, planeSize/2, 0)
    top.position = new BABYLON.Vector3(0, -planeSize/2, 0)
    left.position = new BABYLON.Vector3(-planeSize/2, 0, 0)
    right.position = new BABYLON.Vector3(planeSize/2, 0, 0)
    bottom.scaling = new BABYLON.Vector3(1, roomLength, 1)
    top.scaling = new BABYLON.Vector3(1, roomLength, 1)
    left.scaling = new BABYLON.Vector3(1, roomLength, 1)
    right.scaling = new BABYLON.Vector3(1, roomLength, 1)

    left.rotation.y = Math.PI / 2
    right.rotation.y = Math.PI / 2
    left.rotation.z = Math.PI / 2
    right.rotation.z = Math.PI / 2
    top.rotation.x = Math.PI / 2
    bottom.rotation.x = Math.PI / 2

    bottom.material = matPlan
    top.material = matPlan
    left.material = matPlan
    right.material = matPlan

    top.physicsImpostor = new BABYLON.PhysicsImpostor(top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
    bottom.physicsImpostor = new BABYLON.PhysicsImpostor(bottom, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
    left.physicsImpostor = new BABYLON.PhysicsImpostor(left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
    right.physicsImpostor = new BABYLON.PhysicsImpostor(right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene)
    return scene

}

  const scene = createScene()
  engine.runRenderLoop(function () {
    scene.render()
  })

  window.addEventListener("resize", function () {
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
        ref={ canvas => this.canvas = canvas }
      ></canvas>
    )
  }
}

export default Canvas
