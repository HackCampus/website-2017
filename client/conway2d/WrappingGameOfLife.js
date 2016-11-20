const repeat = (valueFn, times) =>
  (new Array(times)).fill().map(valueFn)

class WrappingGameOfLife {
  constructor (width, height) {
    this.width = width
    this.height = height
    const emptyGrid = repeat(_ => repeat(_ => false, width), height)
    this.next = emptyGrid
    this.history = []
  }

  get (x, y, generation = WrappingGameOfLife.latest) {
    let board
    if (generation === WrappingGameOfLife.latest) {
      board = this.next
    } else if (generation >= this.history.length || generation < 0) {
      console.error('requested generation not generated...', generation, this.history.length)
      board = this.history[this.history.length - 1]
    } else {
      board = this.history[generation]
    }
    return board[(y + this.height) % this.height][(x + this.width) % this.width]
  }

  set (x, y, alive = true) {
    this.next[(y + this.height) % this.height][(x + this.width) % this.width] = alive
    return this
  }

  neighbors (x, y) {
    return [ this.get(x - 1, y - 1), this.get(x  , y - 1), this.get(x + 1, y - 1)
           , this.get(x - 1, y    ),                     , this.get(x + 1, y    )
           , this.get(x - 1, y + 1), this.get(x  , y + 1), this.get(x + 1, y + 1) ]
  }

  step (steps = 1) {
    for (let i = 0; i < steps; i++) {
      this.stepOne()
    }
  }

  stepOne () {
    this.history.push(this.next)
    this.next = this.map((alive, x, y) => {
      const lives = this.neighbors(x, y).filter(living => living).length
      return alive
        ? lives == 2 || lives == 3
        : lives == 3
    })
  }

  map (f = (alive, x, y) => false) {
    return this.next.map((rows, y) =>
      rows.map((alive, x) => f(alive, x, y)))
  }
}

WrappingGameOfLife.latest = -1337

module.exports = WrappingGameOfLife
