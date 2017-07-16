import {Subject} from 'rxjs'

const STATE = {
  LOST: 'LOST',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
}

const subject = (new Subject()).share()

let state = {
  state: STATE.PLAYING,
  points: 0
}

const state$ = subject.scan((acc, current) => {
  const ret = { ...acc, ...current }

  state = ret

  return ret
}, state)

const game = {
  start: () => subject.next({state: STATE.PLAYING, points: 0}),
  pause: () => subject.next({state: STATE.PAUSE}),
  unpause: () => subject.next({state: STATE.PLAYING}),
  lost: () => subject.next({state: STATE.LOST}),
  incrementScore: () => subject.next({points: state.points + 1})
}

const playing$ = subject.map(s => s.state === STATE.PLAYING)

export {
  playing$,
  state$,
  game
}