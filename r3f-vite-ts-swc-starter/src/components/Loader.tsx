import { Html, useProgress } from '@react-three/drei'

export function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
