import { app } from './utils/hyperapp.js'
import { route, router } from './utils/router.js'

import { movePiece } from './models/moves.js'
import { makePiece } from './models/pieces.js'
import { makeGrid } from './models/grid.js'
import { frames } from './models/config.js'

import {
  Keyboard,
  Time,
} from 'https://rawgit.com/okwolf/hyperapp-fx/HAv2/src/index.js'

app({
  init: {
    nextPiece: makePiece(),
    piece: makePiece(),
    grid: makeGrid(),
    score: 0,
    level: 1,
    lines: 0,
  },
  subscriptions: state => [
    Time({
      every: (1000 / 60) * frames[state.level],
      action: movePiece,
    }),
    Keyboard({
      downs: true,
      ups: true,
      action: movePiece,
    }),
    router({
      '/': { file: '/pages/home' },
      '*': { file: '/pages/notfound' },
    }),
  ],
  view: state => console.log(state) || route(state),
  container: document,
})
