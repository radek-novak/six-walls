import BABYLON from '../Babylon'

export default function gameWall(paddle, wall, ball, game) {
  let isHittingPaddle = false;
  let isHittingFront = false;
  const hitPaddle = ball.intersectsMesh(paddle, true)
  const hitWall = ball.intersectsMesh(wall, true)

  if(hitPaddle) {
    // ball.physicsImpostor.registerOnPhysicsCollide
    if (isHittingPaddle) return

    game.incrementScore();
    paddle.visibility = 0.9
    ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -0.1), ball.getAbsolutePosition());
    window.setTimeout(() => {paddle.visibility = 0.5}, 100)

    isHittingPaddle = true
  } else {
    isHittingPaddle = false
  }

  if (hitWall && !hitPaddle && !isHittingPaddle) {
    console.log('game wall:', hitWall, hitPaddle, isHittingPaddle)
    game.lost()
  }
}