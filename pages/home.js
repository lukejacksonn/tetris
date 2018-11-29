import DOM from '../utils/html.js'

import { pieceToGrid, colors } from '../models/pieces.js'

const { html, head, title, meta, link, body } = DOM
const { p, svg, rect, main, br } = DOM
const { Lines, Score, Level, Game, Preview } = DOM

export default state =>
  html([
    head([
      title('Home'),
      meta({ type: 'description', content: 'Welcome to this web app' }),
      link({
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Press+Start+2P',
      }),
      link({ rel: 'stylesheet', href: '/index.css' }),
    ]),
    body([
      main([
        Lines([p(`LINES-${state.lines.toString().padStart(3, '0')}`)]),
        Game([
          svg(
            {
              viewBox: '0, 0, 100, 200',
              height: '500px',
            },
            pieceToGrid(state.grid, state.piece).map((c, i) => {
              const [x, y] = [i % 10, Math.floor(i / 10)]
              return rect({
                x: x * 10,
                y: (19 - y) * 10,
                width: '10',
                height: '10',
                fill: colors[c],
                stroke: '#000',
                strokeWidth: 8,
              })
            })
          ),
        ]),
        Score([
          p('TOP'),
          p(state.topScore.toString().padStart(6, '0')),
          br(),
          p('Score'),
          p(state.score.toString().padStart(6, '0')),
        ]),
        Level([p('LEVEL'), p(state.level.toString().padStart(2, '0'))]),
        Preview([
          p('NEXT'),
          br(),
          svg(
            {
              viewBox: '0, 0, 30, 30',
              height: '100px',
            },
            state.nextPiece.squares.map((square, i) => {
              const [x, y] = square
              return rect({
                x: 6 + x * 6,
                y: 6 + y * 6,
                width: '6',
                height: '6',
                stroke: '#000',
                strokeWidth: 8,
                fill: colors[state.nextPiece.type],
              })
            })
          ),
        ]),
      ]),
    ]),
  ])
