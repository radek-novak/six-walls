import {startBall, resetBall, stopBall} from '../graphics/ball'
import {drawText} from '../graphics/room'

const STATE = {
  LOST: 'LOST',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
}

const game = {
  _points: 0,
  _state: STATE.PAUSED,

  get state() {
    return this._state
  },

  get points() {
    return this._points
  },

  set state(newstate) {
    this._state = newstate
    this.onupdate({points: this.points, state: this.state})
  },

  set points(newpoints) {
    this._points = newpoints
    drawText(this.points)
    this.onupdate({points: this.points, state: this.state})
  },

  start() {
    this.state = STATE.PLAYING
    this.points = 0
    startBall()
  },
  
  reset() {
    this.state = STATE.PAUSED
    this.points = 0
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
  },

  onupdate() {}
}

export {game}