import { gridIndices, gridCoords } from './grid.js'

export const colors = [
  '#000',
  '#f00',
  '#0f0',
  '#00f',
  '#ff0',
  '#f0f',
  '#0ff',
  '#ccc',
]

const pieces = [
  [],
  [[0, 0], [-1, 0], [1, 0], [0, 1]], // T
  [[0, 0], [-1, 1], [0, 1], [0, -1]], // L
  [[0, 0], [1, 1], [0, 1], [0, -1]], // J
  [[0, 0], [-1, 1], [0, 1], [1, 0]], // Z
  [[0, 0], [1, 1], [0, 1], [-1, 0]], // S
  [[0, 0], [0, 1], [1, 1], [1, 0]], // O
  [[0, 0], [0, 1], [0, 2], [0, -1]], // I
]

export const makePiece = () => {
  const type = Math.floor(Math.random() * (colors.length - 1)) + 1
  return {
    type,
    origin: [4, 19],
    squares: pieces[type],
  }
}

export const pieceToGrid = (grid, piece) => {
  grid = grid.slice()
  gridIndices(piece).forEach(i => (grid[i] = piece.type))
  return grid
}

export const isPieceLegal = (_ => {
  const isInside = piece =>
    gridCoords(piece).reduce(
      (ok, [x, y]) => ok && x >= 0 && x <= 9 && y >= 0,
      true
    )
  const isFree = (grid, piece) =>
    gridIndices(piece).reduce(
      (ok, i) => ok && (i >= 200 || grid[i] === 0),
      true
    )
  return (grid, piece) => isFree(grid, piece) && isInside(piece)
})()
