const GameOfLife = require('./WrappingGameOfLife')

module.exports = class Conway {
  constructor (container, cellSize = 120) {
    this.cellSize = cellSize
    this.generation = 0

    const canvas = document.createElement('canvas')
    this.c = canvas.getContext('2d')
    container.appendChild(canvas)

    this.scale = window.devicePixelRatio || 1
    const setSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      this.width = width * this.scale
      this.height = height * this.scale
      canvas.width = this.width
      canvas.height = this.height
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      this.createGames()
      window.requestAnimationFrame(() => { this.draw() })
    }
    setSize()
    window.addEventListener('resize', setSize)
  }

  createGames () {
    this.gameWidth = Math.ceil(this.width / this.cellSize) + 2
    this.gameHeight = Math.ceil(this.height / this.cellSize) + 2
    this.hGame = new GameOfLife(this.gameWidth, this.gameHeight)
    this.cGame = new GameOfLife(this.gameWidth, this.gameHeight)
    this.trails = new GameOfLife(this.gameWidth, this.gameHeight)

    // center
    const [x, y] = [Math.floor(this.gameWidth / 2) - 2, Math.floor(this.gameHeight / 2) - 2]
    this.hGame.set(x-1, y-1)
              .set(x-1, y  ).set(x  , y  )
              .set(x-1, y+1)              .set(x+1, y+1)
    this.cGame                            .set(x+1, y  ).set(x+2, y  )
                            .set(x  , y+1)
                                          .set(x+1, y+2).set(x+2, y+2)
  }

  step () {
    this.generation++
    this.hGame.step()
    this.cGame.step()
    this.hGame.map((alive, x, y) => {
      if (alive) this.trails.set(x, y)
    })
  }

  draw (generation = 0) {
    this.c.clearRect(0, 0, this.width, this.height)
    const centerOffsetLeft = -(this.width % this.cellSize) / 2
    const centerOffsetTop = -(this.height % this.cellSize) / 2
    for (let y = 0; y < this.gameHeight; y++) {
      for (let x = 0; x < this.gameWidth; x++) {
        this.c.fillStyle = 'black'
        const trail = this.trails.get(x, y)
        if (trail) {
          this.c.fillRect(centerOffsetLeft + x * this.cellSize, centerOffsetTop + y * this.cellSize, this.cellSize, this.cellSize)
        }
        this.c.fillStyle = '#ff9600'
        const alive = this.hGame.get(x, y, generation)
        if (alive) {
          this.c.fillRect(centerOffsetLeft + x * this.cellSize, centerOffsetTop + y * this.cellSize, this.cellSize, this.cellSize)
        }
      }
    }
  }
}
