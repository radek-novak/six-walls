import React, { Component } from 'react'
import BABYLON from './Babylon'
import setup from './graphics/setup'
import './App.css'

class Canvas extends Component {
  constructor() {
    super()

    this.state = {
      points: 0
    }
  }

  updateState(state) {
    console.log('update state');
    
    this.setState({ ...state })
  }

  componentDidMount() {
    this.engine = new BABYLON.Engine(this.canvas, true)

    setup(this.canvas, this.engine, this.updateState.bind(this))
  }

  render() {
    return (
      <div>
        <div>{this.state.points}</div>
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
