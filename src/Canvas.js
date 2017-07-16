import React, { Component } from 'react'
import BABYLON from './Babylon'
import setup from './graphics/setup'
import './App.css'

class Canvas extends Component {
  componentDidMount() {
    this.engine = new BABYLON.Engine(this.canvas, true)

    setup(this.canvas, this.engine)

  }

  render() {
    return (
      <canvas
        width="800"
        height="800"
        style={{maxWidth: '100%'}}
        ref={ canvas => this.canvas = canvas }
      ></canvas>
    )
  }
}

export default Canvas
