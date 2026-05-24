import { createRoot } from 'react-dom/client'
import { useRef } from 'react'
import { Canvas, useThree, useFrame, extend, type ThreeElement } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Scene1 from './Scene1'
import SceneNodes from './Nodes'
import * as THREE from 'three/webgpu'
import { MeshStandardNodeMaterial } from 'three/webgpu'
import './style.css'

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof OrbitControls>
    meshStandardNodeMaterial: ThreeElement<typeof MeshStandardNodeMaterial>
  }
}

extend({ OrbitControls, MeshStandardNodeMaterial })

const Controls = () => {
  const { camera, gl } = useThree()
  const controlsRef = useRef<OrbitControls>(null)

  useFrame(() => {
    // for damping to work
    if (controlsRef.current) controlsRef.current.update()
  })

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      // enablePan={false}
      // enableDamping
      // minZoom={10}
      // maxZoom={10}
    />
  )
}

const Experience = () => {
  return (
    <>
      <Controls />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <gridHelper args={[10, 10, 0xaaaaaa, 0x555555]} />

      {/* <Scene1 /> */}
      <SceneNodes />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <Canvas
    gl={async (props) => {
      const renderer = new THREE.WebGPURenderer(props as any)
      await renderer.init()
      return renderer
    }}
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [3, 2, 6],
    }}
  >
    <Experience />
  </Canvas>
)
