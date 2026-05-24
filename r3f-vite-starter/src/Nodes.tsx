import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { color, uniform } from 'three/tsl'
import { GUI } from 'lil-gui'

export default function Nodes() {
  const groupRef = useRef(null)

  const colorNode = uniform(color('#ff0000'))

  useEffect(() => {
    const gui = new GUI()

    return () => {
      gui.destroy()
    }
  }, [])

  // useFrame((state, delta) => {})

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <planeGeometry />
          <meshStandardNodeMaterial colorNode={colorNode} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  )
}
