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
    this.lastRenderedFrame = 0
    this.frame = 0

    this.scene = new Three.Scene()
    const aspect = container.clientWidth / container.clientHeight
    this.camera = new Three.PerspectiveCamera(20, aspect, 1, 1000)
    this.renderer = new Three.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    container.appendChild(this.renderer.domElement)

    this.camera.position.z = 20

    this.light = new Three.PointLight(white, 1, 0)
    this.light.position.set(0, 10, 20)
    this.scene.add(this.light)

    const onResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    }
    onResize()
    addThrottledEventListener('resize', onResize)

    const onMouseMove = event => {
      // const oldMouseX = this.mouseX
      // const oldMouseY = this.mouseY
      this.mouseX = event.clientX / window.innerWidth
      this.mouseY = event.clientY / window.innerHeight
      // this.camera.rotation.y = (this.mouseX - 0.5) / 2
      // this.camera.rotation.y = (this.mouseY - 0.5) / 2
    }
    addThrottledEventListener('mousemove', onMouseMove)

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
      // this.scene.children = [this.camera, this.light]
      this.h.forEach(([x, y]) => {
        this.addCube(x, y, this.step, orange)
      })
      this.c.forEach(([x, y]) => {
        this.addCube(x, y, this.step, white)
      })
      this.renderedStep++
    }
    if (this.frame < 2 * 60) {
      return
    }
    if (this.lastRenderedFrame < this.frame - 10) {
      this.h = life(this.h)
      this.c = life(this.c)

      this.step++
      this.lastRenderedFrame = this.frame
    }
    const cameraSpeed = 10 / 60
    this.camera.position.z += cameraSpeed
    this.light.position.z += cameraSpeed
  }

  addCube (x, y, step, color) {
    const geometry = new Three.BoxGeometry(1, 1, 1)
    const material = new Three.MeshLambertMaterial({color})
    const cube = new Three.Mesh(geometry, material)
    cube.position.x = x
    cube.position.y = -y
    cube.position.z = step
    this.scene.add(cube)
  }
}

module.exports = Conway
