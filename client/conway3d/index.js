const Three = require('three')

const addThrottledEventListener = require('../addThrottledEventListener')
const life = require('./life')

const orange = 0xff9600
const white = 0xffffff

const initialCameraDistance = 23
const cameraZoom = 1.3 // per generation

class Conway {
  constructor (container, generations = 128) {
    this.container = container

    this.h = [[-2, -2], [-2, -1], [-1, -1], [-2, 0], [0, 0]]
    this.c = [[0, -1], [1, -1], [-1, 0], [0, 1], [1, 1]]
    this.frame = 0
    this.meshCache = {}
    this.evolutionRatio = 0
    this.evolutionRate = 0

    this.renderer = new Three.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    container.appendChild(this.renderer.domElement)

    this.scene = new Three.Scene()

    const aspect = container.clientWidth / container.clientHeight
    this.camera = new Three.PerspectiveCamera(30, aspect, 1, 1000)
    this.camera.position.z = initialCameraDistance

    this.light = new Three.DirectionalLight(white, 1, 0)
    this.light.position.set(20, 20, generations)
    this.scene.add(this.light)

    this.game = new Three.Object3D()
    this.scene.add(this.game)

    this.materials = {
      [orange]: new Three.MeshLambertMaterial({color: orange}),
      [white]: new Three.MeshLambertMaterial({color: white}),
    }
    this.geometry = new Three.BoxGeometry(1, 1, 1)
    // this.geometry = new Three.PlaneGeometry(1, 1, 1)

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

    const onMouseMove = event => {
      this.mouseX = (event.clientX / window.innerWidth) * 2 - 1
      this.mouseY = (event.clientY / window.innerHeight) * 2 - 1
    }
    addThrottledEventListener('mousemove', onMouseMove)

    const onScroll = event => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      const scrolledAmount = scrollTop / document.body.clientHeight
      this.evolutionRatio = scrolledAmount > 1 ? 1 : scrolledAmount < 0 ? 0 : scrolledAmount
    }
    addThrottledEventListener('scroll', onScroll)

    this.generations = this.getGenerations(generations)
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
    const generation = this.generations.length * this.evolutionRatio
    let cells = [this.generations[0]]
    for (let i = 1; i < generation; i++) {
      cells.push(this.generations[i])
    }
    this.game.children = cells
    this.camera.position.z = initialCameraDistance + this.evolutionRatio * this.generations.length * cameraZoom

    this.game.rotation.x = this.mouseX

    this.evolutionRatio += this.evolutionRate
    if (this.evolutionRatio > 1) {
      this.evolutionRatio = 1
      this.evolutionRate = 0
    }
    if (this.evolutionRatio < 0) {
      this.evolutionRatio = 0
      this.evolutionRate = 0
    }
  }

  evolveToEnd () {
    this.evolutionRate = 1 / 60
  }

  getMesh (x, y, step, color) {
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

  getGenerations (maxGenerations) {
    let h = this.h
    let c = this.c
    let boards = []
    for (let generation = 0; generation < maxGenerations; generation++) {
      const hCells = h.map(([x, y]) => this.getMesh(x, y, generation, orange))
      const cCells = c.map(([x, y]) => this.getMesh(x, y, generation, white))
      const object = new Three.Object3D()
      object.children = hCells.concat(cCells)
      boards.push(object)
      h = life(h)
      c = life(c)
    }
    return boards
  }
}

module.exports = Conway
