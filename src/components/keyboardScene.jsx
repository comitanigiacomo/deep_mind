import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { animated, useSpring } from '@react-spring/three'
import Spinner from 'react-bootstrap/Spinner'
import './KeyboardScene.css'

function Key({ keyNode, onHover, onClick }) {
  const [hovered, setHovered] = useState(false)

  const { y } = useSpring({
    y: hovered ? -0.4 : 0,
    config: { mass: 1, tension: 300, friction: 20 }
  })

  return (
    <animated.group
      position-y={y}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        onHover(keyNode.name)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick && onClick(keyNode.name)
      }}
      style={{ cursor: 'pointer' }}
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

function CanvasLoader() {
  return (
    <Html center>
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
  ...props
}) {
  const [loading, setLoading] = useState(true)
  const [keyboardPosition, setKeyboardPosition] = useState([7, 1, 0])
  const [keyboardScale, setKeyboardScale] = useState(scale) // Nuovo stato per la scala

  const initialCameraPosition = [-10.261, 23.82, -4.378];
  const initialTarget = [2.0, -2.817, -6.848];
  
  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth <= 768) {
        setKeyboardPosition([27, -11, 0])
        setKeyboardScale(2.2) // Scala ingrandita per Mobile
      } else {
        setKeyboardPosition([7, 1, 0])
        setKeyboardScale(scale) // Scala standard per Desktop passata dai props
      }
    }
    
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [scale]) // Aggiunto 'scale' come dipendenza

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
        <Suspense fallback={<CanvasLoader />}>
          <KeyboardWrapper
            position={keyboardPosition}
            rotation={fixedRotation}
            scale={[keyboardScale, keyboardScale, keyboardScale]} // Usa il nuovo stato qui
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

useGLTF.preload('/keyboard.glb')