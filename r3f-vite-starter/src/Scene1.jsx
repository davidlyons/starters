import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { GUI } from 'lil-gui'
import CustomObject from './CustomObject.jsx'

export default function Scene1() {
  const cubeRef = useRef()
  const groupRef = useRef()

  useEffect(() => {
    const gui = new GUI()
    gui.add(cubeRef.current.position, 'x', -5, 5)

    return () => {
      gui.destroy()
    }
  }, [])

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
  })

  return (
    <>
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <CustomObject />
    </>
  )
}
