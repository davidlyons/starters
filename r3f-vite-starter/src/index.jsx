import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <Canvas
    gl={{
      antialias: true,
      toneMapping: THREE.NoToneMapping,
      // outputColorSpace: THREE.SRGBColorSpace
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
