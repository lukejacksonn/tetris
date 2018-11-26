import { isPieceLegal, pieceToGrid, makePiece } from './pieces.js'
import { isGridFull, gridCoords, clearRows, makeGrid } from './grid.js'

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

export const move = move => state => {
  const testPiece = move(state.piece)
  // If the piece can be moved in the desired direction
  if (isPieceLegal(state.grid, testPiece)) return { ...state, piece: testPiece }
  // Do nothing if the move was invalid
  if (move !== moves['40']) return state
  // The piece touches the bottom so clear any full rows
  const newGrid = clearRows(pieceToGrid(state.grid, state.piece))
  // After clearing rows there is still space on the grid so make a new piece
  if (!isGridFull(newGrid))
    return { ...state, grid: newGrid, piece: makePiece() }
  // It is game over
  return {
    ...state,
    piece: makePiece(),
    grid: makeGrid(),
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
