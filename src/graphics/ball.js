import BABYLON from '../Babylon'

let resetBall = null
let stopBall = null
let startBall = null

export default function ballSetup(scene) {
  // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene)

  sphere.position.y = 0
  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1.01, friction: 0 }, scene)
  // sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,20))

  var materialSphere4 = new BABYLON.StandardMaterial("texture4", scene);
  materialSphere4.diffuseTexture = new BABYLON.Texture("soccer_sph.png", scene);
  materialSphere4.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
  materialSphere4.diffuseTexture.uOffset = 0.4;//Horizontal offset of 40%
  sphere.material = materialSphere4;

  resetBall = function resetBall() {
    sphere.position = BABYLON.Vector3.Zero()
    sphere.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero())
  }

  stopBall = function stopBall() {
    sphere.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero())    
  }

  startBall = function startBall() {
    sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5, -20))
  }

  return {
    ballMesh: sphere,
    resetBall,
    startBall,
    stopBall
  }
}

export {
  resetBall,
  stopBall,
  startBall
}