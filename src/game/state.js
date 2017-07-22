import {startBall, resetBall, stopBall} from '../graphics/ball'
import {
  drawText,
  leftRight,
  topBottom
} from '../graphics/room'

const STATE = {
  LOST: 'LOST',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
}

const game = {
  _points: 0,
  _state: STATE.PAUSED,
  _level: 1,

  get state() {
    return this._state
  },

  get level() {
    return this._level
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

    if (newpoints >= 5) {
      stopBall()
      this.state = STATE.PAUSED
      this.level = this.level + 1
    }

    this.onupdate({points: this.points, state: this.state})
  },

  set level(newlevel) {
    this._level = newlevel
    topBottom(newlevel <= 1)
    leftRight(newlevel <= 2)
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