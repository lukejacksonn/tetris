import { isPieceLegal, pieceToGrid, makePiece } from './pieces.js'
import {
  isGridFull,
  gridCoords,
  clearRows,
  makeGrid,
  gridToRows,
  rowIsNotFull,
} from './grid.js'

export const moves = {
  '40': ({ squares, type, origin: [x, y] }) => ({
    origin: [x, y - 1],
    squares,
    type,
  }),
  '39': ({ squares, type, origin: [x, y] }) => ({
    origin: [x + 1, y],
    squares,
    type,
  }),
  '37': ({ squares, type, origin: [x, y] }) => ({
    origin: [x - 1, y],
    squares,
    type,
  }),
  '90': ({ squares, type, origin }) => ({
    origin,
    squares: squares.map(([x, y]) => [-y, x]),
    type,
  }),
  '88': ({ squares, type, origin }) => ({
    squares: squares.map(([x, y]) => [y, -x]),
    type,
    origin,
  }),
}

const points = n => ({
  1: 40 * (n + 1),
  2: 100 * (n + 1),
  3: 300 * (n + 1),
  4: 1200 * (n + 1),
})

export const move = (m = x => x) => state => {
  const testPiece = m(state.piece)
  // If the piece can be moved in the desired direction
  if (isPieceLegal(state.grid, testPiece)) return { ...state, piece: testPiece }
  // Do nothing if the move was invalid
  if (m !== moves[40]) return state
  // Calculate the amount of full lines there are after placing the piece
  const lines =
    20 -
    gridToRows([...pieceToGrid(state.grid, state.piece)]).filter(rowIsNotFull)
      .length
  // The piece touches the bottom so clear any full rows
  const newGrid = clearRows(pieceToGrid(state.grid, state.piece))
  // After clearing rows there is still space on the grid so make a new piece
  if (!isGridFull(newGrid))
    return {
      ...state,
      grid: newGrid,
      piece: makePiece(),
      score: lines > 0 ? state.score + points(state.level)[lines] : state.score,
      lines: lines > 0 ? state.lines + lines : state.lines,
      level:
        lines > 0 && ((state.lines + lines) / 10) << 0 > state.level
          ? ((state.lines + lines) / 10) << 0
          : state.level,
    }
  // It is game over
  return {
    ...state,
    piece: makePiece(),
    grid: makeGrid(),
    score: 0,
    lines: 0,
    level: 0,
  }
}

const keyupDirection = ({ keyCode, type }) =>
  type === 'keydown' && (keyCode === 90 || keyCode === 88)

const keydownRotate = ({ keyCode, type }) =>
  type === 'keyup' && (keyCode === 39 || keyCode === 37)

export const movePiece = (state, e) => {
  // Ignore certain keyboard event types for certain moves
  return keyupDirection(e) || keydownRotate(e)
    ? state
    : move(moves[e.keyCode || 40])
}
