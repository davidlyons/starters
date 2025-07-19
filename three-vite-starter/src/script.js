import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { GUI } from 'lil-gui'
import gsap from 'gsap'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor('#111', 1)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(2, 2, 3)
camera.lookAt(new THREE.Vector3())

const controls = new OrbitControls(camera, renderer.domElement)

const gridHelper = new THREE.GridHelper(10, 10, 0x555555, 0x222222)
scene.add(gridHelper)

const aLight1 = new THREE.AmbientLight(0x333333)
scene.add(aLight1)

const dLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
dLight1.position.set(0.8, 1, 1)
scene.add(dLight1)

const dLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
dLight2.position.set(-1, 0.5, -0.8)
scene.add(dLight2)

const dLightHelper1 = new THREE.DirectionalLightHelper(dLight1, 0.25)
scene.add(dLightHelper1)

const dLightHelper2 = new THREE.DirectionalLightHelper(dLight2, 0.25)
scene.add(dLightHelper2)

const axesHelper = new THREE.AxesHelper()
axesHelper.position.y = 0.01
scene.add(axesHelper)

// -----------------------------------------------------------

const debugObject = {}

// Three.js applies color management and modifies the color internally
// save non-modified color outside so the picker is the same value
debugObject.color = '#a778d8'

const geometry = new RoundedBoxGeometry(1, 1, 1, 2, 0.12)
const material = new THREE.MeshPhongMaterial({ color: debugObject.color, side: THREE.DoubleSide })
const cube = (window.cube = new THREE.Mesh(geometry, material))
scene.add(cube)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')

window.addEventListener('keydown', (event) => {
  if (event.key == 'h') gui.show(gui._hidden)
})

cubeFolder.add(cube.rotation, 'y', -Math.PI, Math.PI, 0.01)
cubeFolder.addColor(debugObject, 'color').onChange(() => material.color.set(debugObject.color))

debugObject.move = () => gsap.to(cube.position, { duration: 1, delay: 0, x: cube.position.x < 1 ? 2 : 0 })
cubeFolder.add(debugObject, 'move')

// -----------------------------------------------------------

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

renderer.setAnimationLoop(loop)

function loop() {
  controls.update()
  renderer.render(scene, camera)
}
