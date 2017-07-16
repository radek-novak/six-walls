import BABYLON from '../Babylon'

export default function gameWall(paddle, wall, ball, game, hit) {
  let isHittingPaddle = false;
  let isHittingFront = false;
  const hitPaddle = ball.intersectsMesh(paddle, true)
  const hitWall = ball.intersectsMesh(wall, true)

  if(hitPaddle) {
    // ball.physicsImpostor.registerOnPhysicsCollide
    if (isHittingPaddle) return

    game.incrementScore();
    ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -0.1), ball.getAbsolutePosition());
    hit()

    isHittingPaddle = true
  } else {
    isHittingPaddle = false
  }

  if (hitWall && !hitPaddle && !isHittingPaddle) {
    console.log('game wall:', hitWall, hitPaddle, isHittingPaddle)
    game.lost()
  }
}