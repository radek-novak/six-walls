import {startBall, resetBall, stopBall} from '../graphics/ball'

const STATE = {
  LOST: 'LOST',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
}

const game = {
  points: 0,
  _state: STATE.PAUSED,

  get state() {
    return this._state
  },

  set state(newstate) {
    this._state = newstate
  },

  start() {
    this.state = STATE.PLAYING
    this.points = 0
    startBall()
  },

  reset() {
    this.state = STATE.PAUSED
    resetBall()
  },

  lost() {
    this.state = STATE.LOST
    stopBall()
  },
  incrementScore() {
    this.points = this.points + 1
  },

  isPlaying() {
    return this.state === STATE.PLAYING
  },

  isLost() {
    return this.state === STATE.LOST
  },

  isPaused() {
    return this.state === STATE.PAUSED
  }
}

export {game}