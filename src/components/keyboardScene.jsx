import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { animated, useSpring } from '@react-spring/three'
import Spinner from 'react-bootstrap/Spinner'
import './KeyboardScene.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { unzip } from 'fflate'


function KeyWithPanel({ keyNode, panelNode, onHover, onClick }) {
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
      {panelNode && <primitive object={panelNode} />}
    </animated.group>
  )
}


function useGLTFZip(zipUrl, glbFileName) {
  const [scene, setScene] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function loadGLBFromZip() {
      try {
        const response = await fetch(zipUrl)
        const zipBuffer = await response.arrayBuffer()

        const files = await new Promise((resolve, reject) => {
          unzip(new Uint8Array(zipBuffer), (err, files) => {
            if (err) reject(err)
            else resolve(files)
          })
        })

        const glbFile = files[glbFileName]

        if (!glbFile) throw new Error(`File ${glbFileName} not found in ZIP`)

        const loader = new GLTFLoader()
        loader.parse(
          glbFile.buffer,
          '',
          (gltf) => {
            if (mounted) setScene(gltf.scene)
          },
          (err) => {
            if (mounted) {
              console.error('GLTF parse error:', err)
              setError(err)
            }
          }
        )
      } catch (err) {
        console.error('ZIP load error:', err)
        if (mounted) setError(err)
      }
    }

    loadGLBFromZip()
    return () => {
      mounted = false
    }
  }, [zipUrl, glbFileName])

  return { scene, error }
}


function KeyboardModel({ scene, onKeyHover, onKeyClick, onLoaded, ...props }) {
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


function KeyboardWrapper(props) {
  const { scene, error } = useGLTFZip('/skils.zip', 'skils.glb')

  if (error) throw error
  if (!scene) return null // invece di bloccare il Suspense

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
        <Suspense fallback={<CanvasLoader />}>
          <KeyboardWrapper
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
