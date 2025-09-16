import * as THREE from 'three/webgpu'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { checker, uv, uniform, convertToTexture } from 'three/tsl'
import { GUI } from 'lil-gui'
import gsap from 'gsap'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const renderer = new THREE.WebGPURenderer({
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

THREE.DefaultLoadingManager.onLoad = function () {
  console.log('Loading Complete!')
}

const gui = new GUI()

window.addEventListener('keydown', (event) => {
  if (event.key == 'h') gui.show(gui._hidden)
})

const debugObject = {}

const textureLoader = new THREE.TextureLoader()

// --------------------------------------------------------------------

// Three.js applies color management and modifies the color internally
// save non-modified color outside so the picker is the same value
debugObject.color = '#a778d8'

const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.12)
const material = new THREE.MeshPhongMaterial({ color: debugObject.color, side: THREE.DoubleSide })
const cube = (window.cube = new THREE.Mesh(geometry, material))
scene.add(cube)

const cubeFolder = gui.addFolder('Cube')

cubeFolder.add(cube.rotation, 'y', -Math.PI, Math.PI, 0.01)
cubeFolder.addColor(debugObject, 'color').onChange(() => material.color.set(debugObject.color))

debugObject.move = () => gsap.to(cube.position, { duration: 1, delay: 0, z: cube.position.z < 1 ? 2 : 0 })
cubeFolder.add(debugObject, 'move')

// ---------------------------------

// checker texture

// https://uvchecker.vinzi.xyz/
const texture2 = textureLoader.load('/textures/uv-checker-2k-gambit.png')

// textures used on the map or matcap properties of a material are supposed to be encoded in sRGB
texture2.colorSpace = THREE.SRGBColorSpace

texture2.repeat.setScalar(0.25)
texture2.wrapS = THREE.RepeatWrapping
texture2.wrapT = THREE.RepeatWrapping

const material2 = new THREE.MeshBasicMaterial({ map: texture2 })
const cube2 = new THREE.Mesh(geometry, material2)
scene.add(cube2)
cube2.position.x = -1.5

// ----------------------------------

// checker TSL shader
// https://threejs.org/examples/?q=texture#webgpu_procedural_texture

const uvScale = uniform(1)

const procedural = checker(uv().mul(uvScale))
const colorNode = convertToTexture(procedural, 512, 512) // ( node, width, height )

const material3 = new THREE.MeshBasicNodeMaterial()
material3.colorNode = colorNode

const cube3 = new THREE.Mesh(geometry, material3)
scene.add(cube3)
cube3.position.x = 1.5

const checkerFolder = gui.addFolder('Checker shader')
checkerFolder.add(uvScale, 'value', 1, 10).step(1).name('uv scale')

// --------------------------------------------------------------------

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
