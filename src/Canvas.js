import React, { Component } from 'react'
import BABYLON from './Babylon'
import setup from './graphics/setup'
import './App.css'
import {state$} from './game/state'

class Canvas extends Component {
  componentDidMount() {
    this.engine = new BABYLON.Engine(this.canvas, true)

    setup(this.canvas, this.engine)

    state$.subscribe(x => console.log('points: ', x.points))

    // window.setInterval(() => state$.next({x: 3, [Math.ceil(Math.random()* 5)]: Math.random()}), 1000)
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
