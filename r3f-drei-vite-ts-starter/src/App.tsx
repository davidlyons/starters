import {
  Suspense,
  // useRef
} from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  // useHelper,
} from '@react-three/drei'
import { Box } from './components/Box'
import { Suzanne } from './components/Suzanne'
import { Loader } from './components/Loader'
import { useControls } from 'leva'

// https://docs.pmnd.rs/react-three-fiber/tutorials/typescript
// TS Starter https://codesandbox.io/s/brnsm

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models
// GLTF Loader https://codesandbox.io/s/vbnbf

const Scene = () => {
  const { grid, rotation } = useControls({
    grid: false,
    rotation: {
      value: 0,
      min: 0,
      max: 4,
      step: 0.01,
    },
  })

  // const dirLight1 = useRef(null!)
  // const dirLight2 = useRef(null!)
  // useHelper(dirLight1, THREE.DirectionalLightHelper, 1, '#fff')
  // useHelper(dirLight2, THREE.DirectionalLightHelper, 1, '#fff')

  return (
    <>
      <OrbitControls enableDamping={false} />
      {grid && <gridHelper args={[40, 10, 0x333333, 0x444444]} />}

      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} ref={dirLight1} />
      <directionalLight position={[-2, 0, 0]} intensity={0.5} ref={dirLight2} /> */}

      <Environment
        preset="warehouse"
        environmentIntensity={0.6}
        ground={{ height: 22, radius: 80, scale: 2000 }}
      />

      <group scale={4}>
        <Box position={[-2.2, 2, 0]} />
        <Box position={[2.2, 2, 0]} rotation-y={rotation} />
        <Suzanne position={[0, 0.5, 0]} />
      </group>

      <ContactShadows scale={40} frames={1} resolution={128} opacity={0.5} far={45} />

      <PerspectiveCamera makeDefault near={0.1} far={10000} position={[10, 20, 40]} fov={45} />
    </>
  )
}

export default function App() {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
