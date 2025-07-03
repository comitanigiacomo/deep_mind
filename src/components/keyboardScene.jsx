import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useState, useMemo } from 'react'
import { animated, useSpring } from '@react-spring/three'

function KeyWithPanel({ keyNode, panelNode }) {
  const [hovered, setHovered] = useState(false)

  const { y } = useSpring({
    y: hovered ? -0.4 : 0,
    config: { mass: 1, tension: 300, friction: 20 }
  })

  return (
    <animated.group
      position-y={y}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
    >
      <primitive object={keyNode} />
      {panelNode && <primitive object={panelNode} />}
    </animated.group>
  )
}

function Keyboard(props) {
  const { scene } = useGLTF('skils.glb')

  // Trova i nodi key-* e Panel.*
  const { keyWithPanels, others } = useMemo(() => {
    const keys = []
    const panels = new Map()
    const others = []

    scene.traverse((child) => {
      if (child.name.startsWith('key-')) {
        keys.push(child)
      } else if (child.name.startsWith('Plane')) {
        panels.set(child.name, child)
      } else {
        others.push(child)
      }
    })

    const matches = keys.map((keyNode) => {
      const panelName = keyNode.name.replace('key-', 'Plane-')
      return {
        keyNode,
        panelNode: panels.get(panelName) || null
      }
    })

    return { keyWithPanels: matches, others }
  }, [scene])

  return (
    <group {...props}>
      {others.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}

      {keyWithPanels.map(({ keyNode, panelNode }, i) => (
        <KeyWithPanel key={i} keyNode={keyNode} panelNode={panelNode} />
      ))}
    </group>
  )
}

export default function KeyboardScene() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [-3.48, 2.74, 9.96], fov: 80, rotation: [-0.27, -0.33, -0.09] }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />
      <Keyboard position={[7, 1, 0]} rotation={[7.3, 1.8, -0.5]} />
    </Canvas>
  )
}
