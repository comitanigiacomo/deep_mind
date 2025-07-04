import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/three'
import * as THREE from 'three'


function KeyWithPanel({ keyNode, panelNode, onHover }) {
  const [hovered, setHovered] = useState(false)

  const { y } = useSpring({
    y: hovered ? -0.4 : 0,
    config: { mass: 1, tension: 300, friction: 20 }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHover(keyNode.name)
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
    onHover(null)
  }

  return (
    <animated.group
      position-y={y}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={keyNode} />
      {panelNode && <primitive object={panelNode} />}
    </animated.group>
  )
}

function Keyboard({ onKeyHover, ...props }) {
  const { scene } = useGLTF('/skils.glb')

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
        <KeyWithPanel
          key={i}
          keyNode={keyNode}
          panelNode={panelNode}
          onHover={onKeyHover}
        />
      ))}
    </group>
  )
}

export default function KeyboardScene({ onKeyHover, fixedRotation = [0, 0, 0], scale = 1, ...props }) {
  const controlsRef = useRef()

  return (
    <Canvas camera={{ position: [-2.261002305580865, 23.819658128449888, -4.378382727281629], fov: 80 }} {...props}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      <OrbitControls
        ref={controlsRef}
        target={[9.592548488616103, -2.8169092959774797, -6.84844724550611]}
        enableZoom={false}
        
      />
      <Keyboard
        position={[7, 1, 0]}
        rotation={fixedRotation}
        scale={[scale, scale, scale]}
        onKeyHover={onKeyHover}
      />
    </Canvas>
  )
}
