export const makeGrid = _ => [...Array(200)].map(_ => 0)

export const gridCoords = ({ origin: [ox, oy], squares }) =>
  squares.map(([x, y]) => [ox + x, oy + y])

export const gridIndices = piece =>
  gridCoords(piece).map(([x, y]) => y * 10 + x)

export const isGridFull = grid =>
  grid.slice(190, 200).reduce((full, i) => full || i > 0, false)

export const gridToRows = grid => {
  var lines = []
  while (grid.length) lines.push(grid.splice(0, 10))
  return lines
}

const emptyRow = _ => [...Array(10)].map(_ => 0)

export const rowIsNotFull = row => row.reduce((ok, i) => ok || i === 0, false)

const replenishRows = rows =>
  rows.length < 20 ? replenishRows(rows.concat([emptyRow()])) : rows

const rowsToGrid = rows => [].concat(...rows)

export const clearRows = grid =>
  rowsToGrid(replenishRows(gridToRows(grid).filter(rowIsNotFull)))
