import { app } from './utils/hyperapp.js'
import { route, router } from './utils/router.js'

import { movePiece } from './models/moves.js'
import { makePiece } from './models/pieces.js'
import { makeGrid } from './models/grid.js'

import {
  Animation,
  BatchFx,
  Merge,
  Keyboard,
  Time,
} from 'https://rawgit.com/okwolf/hyperapp-fx/HAv2/src/index.js'

// const init = _ => (state, actions) => {
//   restart()
//   setInterval(_ => move(moves.down), 500)
//   window.addEventListener('keydown', ev => {
//     const c = ev.keyCode
//     const mv =
//       c === 85
//         ? moves.rleft
//         : c === 73
//           ? moves.rright
//           : c === 74
//             ? moves.left
//             : c === 75
//               ? moves.down
//               : c === 76
//                 ? moves.right
//                 : null
//     if (mv) move(mv)
//   })
// }

app({
  init: {
    piece: makePiece(),
    grid: makeGrid(),
  },
  subscriptions: state => [
    Time({
      every: 1000,
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
