const repeat = (valueFn, times) =>
  (new Array(times)).fill().map(valueFn)


module.exports = class WrappingGrid {
  constructor (width, height, values = null) {
    this.isGrid = true
    this.width = width
    this.height = height
    const emptyGrid = values || repeat(_ => repeat(_ => false, width), height)
    this.grid = emptyGrid
  }

  get (x, y) {
    return this.grid[(y + this.height) % this.height][(x + this.width) % this.width]
  }

  set (x, y, value = true) {
    this.grid[(y + this.height) % this.height][(x + this.width) % this.width] = value
    return this
  }

  map (f = (value, x, y) => false) {
    const grid = this.grid.map((rows, y) => rows.map((value, x) => f(value, x, y)))
    return new WrappingGrid(this.width, this.height, grid)
  }

  forEach (f = (value, x, y) => null) {
    this.grid.forEach((rows, y) => rows.forEach((value, x) => f(value, x, y)))
  }
}
