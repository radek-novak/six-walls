import React, { Component } from 'react'
import BABYLON from './Babylon'
import setup from './graphics/setup'
import constants from './constants'
import {game} from './game/state'
import './App.css'

class Canvas extends Component {
  constructor() {
    super()

    this.state = {
      points: 0,
      level: parseInt(localStorage.getItem(constants.LEVEL), 10)
    }
  }

  updateState(state) {
    this.setState({ ...state })
  }

  componentDidMount() {
    this.engine = new BABYLON.Engine(this.canvas, true)

    setup(this.canvas, this.engine, this.updateState.bind(this))
  }

  levelButtons() {
    const buttons = []

    for (let i = 1; i < 4; i++) {
      buttons.push((
        <button
          key={i}
          style={{ border: i === this.state.level ? '1px solid black' : '1px solid transparent' }}
          disabled={i > game.maxlevel}
          onClick={() => { game.level = i }}
        >
          Level {i}
        </button>
      ))
    }

    return buttons
  }

  render() {
    return (
      <div>
        <div>{this.levelButtons()}</div>
        <canvas
          width="800"
          height="800"
          style={{maxWidth: '100%'}}
          ref={ canvas => this.canvas = canvas }></canvas>
      </div>
    )
  }
}

export default Canvas
