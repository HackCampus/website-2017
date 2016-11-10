const Three = require('three')

const addThrottledEventListener = require('../addThrottledEventListener')
const life = require('./life')

const orange = 0xff9600
const white = 0xffffff

class Conway {
  constructor (container) {
    this.container = container

    this.h = [[-2, -2], [-2, -1], [-1, -1], [-2, 0], [0, 0]]
    this.c = [[0, -1], [1, -1], [-1, 0], [0, 1], [1, 1]]
    this.step = 0
    this.renderedStep = -1
    this.cellsToRender = []
    this.lastRenderedFrame = 0
    this.frame = 0
    this.meshCache = {}

    this.renderer = new Three.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    container.appendChild(this.renderer.domElement)

    this.scene = new Three.Scene()

    const aspect = container.clientWidth / container.clientHeight
    this.camera = new Three.PerspectiveCamera(20, aspect, 1, 1000)
    this.camera.position.z = 20

    this.light = new Three.PointLight(white, 1, 0)
    this.light.position.set(0, 10, 500)
    this.scene.add(this.light)

    this.game = new Three.Object3D()
    this.scene.add(this.game)

    this.materials = {
      [orange]: new Three.MeshLambertMaterial({color: orange}),
      [white]: new Three.MeshLambertMaterial({color: white}),
    }
    this.geometry = new Three.BoxGeometry(1, 1, 1)

    const onResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
      this.renderer.render(this.scene, this.camera)
    }
    onResize()
    addThrottledEventListener('resize', onResize)

    // const onMouseMove = event => {
    //   this.mouseX = event.clientX / window.innerWidth
    //   this.mouseY = event.clientY / window.innerHeight
    // }
    // addThrottledEventListener('mousemove', onMouseMove)

    window.addEventListener('mousedown', () => {
      this.stop()
    })
  }

  start () {
    this.started = true
    const render = () => {
      if (!this.started) return
      this.draw()
      this.renderer.render(this.scene, this.camera)
      this.frame++
      window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)
  }

  stop () {
    this.started = false
  }

  draw () {
    if (this.renderedStep < this.step) {
      // this.cellsToRender = this.getCellsToRender(this.h, this.cellsToRender, this.step)
      // const meshes = this.cellsToRender.map(([x, y, step]) => this.createMesh(x, y, step, orange))
      const newCells = this.h.map(([x, y]) => this.createMesh(x, y, this.step, orange))
      this.game.children = this.game.children.concat(newCells)
      this.renderedStep++
    }

    // pause on logo
    if (this.frame < 2 * 60) {
      return
    }

    // perform game of life step
    if (this.frame > this.lastRenderedFrame + 10) {
      this.h = life(this.h)
      this.step++
      this.lastRenderedFrame = this.frame
    }

    // zoom out
    const cameraSpeed = 2 / 10
    this.camera.position.z += cameraSpeed
    this.light.position.z += cameraSpeed
  }

  // board & oldRenderedCells must be in order, by y, then by x.
  getCellsToRender (newBoard, oldRenderedCells, newStep) {
    let liveCells = []

    const oldCells = oldRenderedCells[Symbol.iterator]()
    const newCells = newBoard[Symbol.iterator]()
    let newCell = newCells.next().value
    let oldCell = oldCells.next().value

    while (!(oldCell == null && newCell == null)) {
      // no more new cells
      if (newCell == null) {
        liveCells.push(oldCell)
        oldCell = oldCells.next().value
        continue
      }

      const [newX, newY] = newCell

      // no more old cells
      if (oldCell == null) {
        liveCells.push([newX, newY, newStep])
        newCell = newCells.next().value
        continue
      }

      const [oldX, oldY, oldStep] = oldCell

      // render all old cells that are before the next new cell
      // ie. they died, we want to keep them in old generation
      if (oldY < newY || oldY === newY && oldX < newX) {
        liveCells.push(oldCell)
        oldCell = oldCells.next().value
        continue
      }

      // old cell survives, render it in the new step
      if (oldY === newY && oldX === newX) {
        liveCells.push([oldX, oldY, newStep])
        oldCell = oldCells.next().value
        newCell = newCells.next().value
        continue
      }

      // a new cell is born
      if (oldY === newY && oldX > newX || oldY > newY) {
        liveCells.push([newX, newY, newStep])
        newCell = newCells.next().value
        continue
      }
    }
    return liveCells
  }

  createMesh (x, y, step, color) {
    const cacheKey = `${x},${y},${step},${color}`
    const cached = this.meshCache[cacheKey]
    if (cached) {
      return cached
    }
    const cube = new Three.Mesh(this.geometry, this.materials[color])
    cube.position.x = x
    cube.position.y = -y
    cube.position.z = step
    this.meshCache[cacheKey] = cube
    return cube
  }
}

module.exports = Conway
