import BABYLON from '../Babylon'

export default function ballSetup(scene) {
  // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene)

  sphere.position.y = 0
  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1.01, friction: 0 }, scene)
  sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(7,5,20))

  var materialSphere4 = new BABYLON.StandardMaterial("texture4", scene);
  materialSphere4.diffuseTexture = new BABYLON.Texture("soccer_sph.png", scene);
  materialSphere4.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
  materialSphere4.diffuseTexture.uOffset = 0.4;//Horizontal offset of 40%
  sphere.material = materialSphere4;

  return sphere
}