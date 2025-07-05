import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useMemo, useState, Suspense, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/three'
import Spinner from 'react-bootstrap/Spinner'
import './KeyboardScene.css'

function KeyWithPanel({ keyNode, panelNode, onHover, onClick }) {
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

  const handleClick = (e) => {
    e.stopPropagation()
    onClick && onClick(keyNode.name)
  }

  return (
    <animated.group
      position-y={y}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <primitive object={keyNode} />
      {panelNode && <primitive object={panelNode} />}
    </animated.group>
  )
}

function Keyboard({ onKeyHover, onKeyClick, onLoaded, ...props }) {
  const { scene } = useGLTF('/skils.glb')
  const loadedRef = useRef(false)

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

  useEffect(() => {
    if (!loadedRef.current && onLoaded) {
      onLoaded()
      loadedRef.current = true
    }
  }, [onLoaded])

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
          onClick={onKeyClick}
        />
      ))}
    </group>
  )
}

function CameraControls({ initialCameraPosition, initialTarget }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  const [{ cameraPosition, target }, api] = useSpring(() => ({
    cameraPosition: initialCameraPosition,
    target: initialTarget,
    config: { tension: 80, friction: 30 }
  }))

  useFrame(() => {
    const controls = controlsRef.current
    if (!controls) return

    const camPos = cameraPosition.get()
    const tarPos = target.get()

    camera.position.set(...camPos)
    controls.target.set(...tarPos)
    controls.update()
  })

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    controls.enableZoom = false
    controls.enablePan = false

  }, [])

  const handleEnd = () => {
    api.start({
      cameraPosition: initialCameraPosition,
      target: initialTarget
    })
  }

  return (
    <OrbitControls
      ref={controlsRef}
      target={initialTarget}
      enableZoom={false}
      onEnd={handleEnd}
    />
  )
}

export default function KeyboardScene({
  onKeyHover,
  onKeyClick,
  fixedRotation = [0, 0, 0],
  scale = 1,
  ...props
}) {
  const [loading, setLoading] = useState(true)
  const [keyboardPosition, setKeyboardPosition] = useState([7, 1, 0]) 

  const initialCameraPosition = [-2.261, 23.82, -4.378]
  const initialTarget = [9.593, -2.817, -6.848]

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth <= 768) {
        setKeyboardPosition([17, -11, 0])
      } else {
        setKeyboardPosition([7, 1, 0])
      }
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  return (
    <div className="keyboard-wrapper">
      {loading && (
        <div className="custom-spinner top-left">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Canvas camera={{ position: initialCameraPosition, fov: 80 }} {...props}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Keyboard
            position={keyboardPosition}
            rotation={fixedRotation}
            scale={[scale, scale, scale]}
            onKeyHover={onKeyHover}
            onKeyClick={onKeyClick}
            onLoaded={() => setLoading(false)}
          />
        </Suspense>
        <CameraControls
          initialCameraPosition={initialCameraPosition}
          initialTarget={initialTarget}
        />
      </Canvas>
    </div>
  )
}