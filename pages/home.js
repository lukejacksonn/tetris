import DOM from '../utils/html.js'
import { link } from '../utils/router.js'

import { pieceToGrid, colors } from '../models/pieces.js'

const { html, head, title, meta, body } = DOM
const { svg, rect } = DOM

const Grid = grid =>
  svg(
    {
      viewBox: '0, 0, 100, 200',
      height: '500px',
    },
    grid.map((c, i) => {
      const [x, y] = [i % 10, Math.floor(i / 10)]
      return rect({
        x: x * 10,
        y: (19 - y) * 10,
        width: '10',
        height: '10',
        fill: colors[c],
      })
    })
  )

export default state =>
  html([
    head([
      title('Home'),
      meta({ type: 'description', content: 'Welcome to this web app' }),
    ]),
    body([Grid(pieceToGrid(state.grid, state.piece))]),
  ])
