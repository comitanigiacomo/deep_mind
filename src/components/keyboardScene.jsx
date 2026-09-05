import { Canvas, useThree } from '@react-three/fiber'
import { Html, useGLTF, CameraControls as DreiCameraControls } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react'
import { animated, useSpring } from '@react-spring/three'
import Spinner from 'react-bootstrap/Spinner'
import './KeyboardScene.css'

function Key({ keyNode, onHover, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useMemo(() => window.matchMedia('(hover: none) and (pointer: coarse)').matches, [])

  const { y } = useSpring({
    y: isMobile ? 0 : (hovered ? -0.4 : 0),
    config: { mass: 1, tension: 300, friction: 20 }
  })

  return (
    <animated.group
      position-y={y}
      onPointerOver={(e) => {
        if (isMobile) return
        e.stopPropagation()
        setHovered(true)
        onHover(keyNode.name)
      }}
      onPointerOut={(e) => {
        if (isMobile) return
        e.stopPropagation()
        setHovered(false)
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick && onClick(keyNode.name)
      }}
      style={{ cursor: isMobile ? 'default' : 'pointer' }}
    >
      <primitive object={keyNode} />
    </animated.group>
  )
}

function KeyboardModel({ scene, onKeyHover, onKeyClick, onLoaded, ...props }) {
  const loadedRef = useRef(false)

  const { keys, others } = useMemo(() => {
    const keys = []
    const others = []

    scene.traverse((child) => {
      if (child.name.startsWith('key-')) {
        keys.push(child)
      } else {
        others.push(child)
      }
    })

    return { keys, others }
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
        <primitive key={`other-${i}`} object={obj} />
      ))}
      {keys.map((keyNode, i) => (
        <Key
          key={`key-${i}`}
          keyNode={keyNode}
          onHover={onKeyHover}
          onClick={onKeyClick}
        />
      ))}
    </group>
  )
}

function KeyboardWrapper(props) {
  const { scene } = useGLTF('/keyboard.glb')
  return <KeyboardModel {...props} scene={scene} />
}

function CameraControls({ initialCameraPosition, initialTarget, onResetRef }) {
  const controlsRef = useRef()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.setLookAt(
        initialCameraPosition[0], initialCameraPosition[1], initialCameraPosition[2],
        initialTarget[0], initialTarget[1], initialTarget[2],
        false // no animation on mount
      )
    }
  }, [initialCameraPosition, initialTarget])

  const resetView = useCallback(() => {
    const controls = controlsRef.current
    if (controls) {
      controls.setLookAt(
        initialCameraPosition[0], initialCameraPosition[1], initialCameraPosition[2],
        initialTarget[0], initialTarget[1], initialTarget[2],
        true // enable transition
      )
    }
  }, [initialCameraPosition, initialTarget])

  useEffect(() => {
    if (onResetRef) onResetRef.current = resetView
  }, [onResetRef, resetView])

  return (
    <DreiCameraControls
      ref={controlsRef}
      makeDefault
      minDistance={10}
      maxDistance={40}
      mouseButtons={{
        left: 1, // ACTION.ROTATE
        middle: 0, // ACTION.NONE
        right: 0, // ACTION.NONE
        wheel: 0, // ACTION.NONE
      }}
      touches={{
        one: 1, // ACTION.TOUCH_ROTATE
        two: 0, // ACTION.NONE
        three: 0 // ACTION.NONE
      }}
    />
  )
}

function CanvasLoader({ position }) {
  return (
    <Html center position={position}>
      <div className="canvas-spinner">
        <Spinner animation="border" variant="light" />
      </div>
    </Html>
  )
}

export default function KeyboardScene({
  onKeyHover,
  onKeyClick,
  fixedRotation = [0, 0, 0],
  scale = 1,
  onResetRef,
  ...props
}) {
  const [keyboardPosition, setKeyboardPosition] = useState([7, 1, 0])
  const [keyboardScale, setKeyboardScale] = useState(scale)

  const initialCameraPosition = useMemo(() => [-10.261, 23.82, -4.378], [])
  const initialTarget = useMemo(() => [2.0, -2.817, -6.848], [])

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth <= 768) {
        setKeyboardPosition([27, -11, 0])
        setKeyboardScale(2.2)
      } else {
        setKeyboardPosition([7, 1, 0])
        setKeyboardScale(scale)
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [scale])

  return (
    <div className="keyboard-wrapper">
      <Canvas camera={{ position: initialCameraPosition, fov: 80 }} {...props}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={<CanvasLoader position={initialTarget} />}>
          <KeyboardWrapper
            position={keyboardPosition}
            rotation={fixedRotation}
            scale={[keyboardScale, keyboardScale, keyboardScale]}
            onKeyHover={onKeyHover}
            onKeyClick={onKeyClick}
          />
        </Suspense>
        <CameraControls
          initialCameraPosition={initialCameraPosition}
          initialTarget={initialTarget}
          onResetRef={onResetRef}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/keyboard.glb')
