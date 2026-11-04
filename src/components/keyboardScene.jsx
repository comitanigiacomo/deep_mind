import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, CameraControls as DreiCameraControls } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react'
import { animated, useSpring } from '@react-spring/three'
import { Box3, Vector3 } from 'three'
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

function KeyboardModel({ scene, onKeyHover, onKeyClick, onLoaded, onBounds, ...props }) {
  const loadedRef = useRef(false)

  const { keys, others, centerOffset, radius } = useMemo(() => {
    const keys = []
    const others = []

    scene.traverse((child) => {
      if (child.name.startsWith('key-')) {
        keys.push(child)
      } else {
        others.push(child)
      }
    })

    const box = new Box3().setFromObject(scene)
    const center = new Vector3()
    box.getCenter(center)
    const centerOffset = [-center.x, -center.y, -center.z]
    // Raggio della sfera che contiene il modello: invariante rispetto
    // all'angolazione della camera, serve per garantire che non venga mai tagliato.
    const radius = box.getSize(new Vector3()).length() / 2

    return { keys, others, centerOffset, radius }
  }, [scene])

  useEffect(() => {
    if (!loadedRef.current && onLoaded) {
      onLoaded()
      loadedRef.current = true
    }
  }, [onLoaded])

  useEffect(() => {
    if (onBounds) {
      onBounds(radius)
    }
  }, [onBounds, radius])

  return (
    <group {...props}>
      <group position={centerOffset}>
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
    </group>
  )
}

function KeyboardWrapper(props) {
  // The model is plain glTF (no Draco, no Meshopt): disabling both decoders
  // avoids fetching a CDN decoder and compiling WASM, which a strict CSP would
  // otherwise block. See the CSP in nginx.conf.
  const { scene } = useGLTF('/keyboard.glb', false, false)
  return <KeyboardModel {...props} scene={scene} />
}

/*
  Il pivot del modello (centro del bounding box) deve restare il centro di
  rotazione di CameraControls, ma con fov 80 il baricentro *visivo* del modello
  cade qualche unità sotto/sinistra il centro geometrico. Invece di spostare il
  target (che sposterebbe anche il centro di rotazione), decentriamo il frustum:
  la scena si sposta nell'inquadratura, la camera e il target non si muovono.
  Lo shift è espresso in unità mondo, quindi vale a qualunque distanza.
*/
const FRAMING_SHIFT_RIGHT = 1.389
const FRAMING_SHIFT_UP = 2.083

// Margine attorno al modello quando la camera è allineata al caso peggiore,
// in frazione del lato del canvas.
const FIT_MARGIN_X = 0.03
const FIT_MARGIN_Y = 0.02

/*
  Distanza minima alla quale la sfera che contiene il modello resta interamente
  dentro il canvas, a qualunque angolazione. Il modello è racchiuso da una sfera
  centrata sul pivot: proiettata da una prospettiva è sempre un cerchio, quindi
  il caso peggiore (la diagonale del bounding box verticale sullo schermo) è
  coperto da questa condizione. Si risolve per bisezione perché anche il
  decentramento del frustum dipende dalla distanza.
*/
function fitDistanceFor(radius, width, height, tanHalfFov) {
  if (!radius || !width || !height) {
    return null
  }

  const marginX = width * FIT_MARGIN_X
  const marginY = height * FIT_MARGIN_Y

  const fits = (distance) => {
    const pxPerUnit = (height / 2) / (distance * tanHalfFov)
    const projectedRadius =
      ((height / 2) * (radius / Math.sqrt(distance * distance - radius * radius))) / tanHalfFov

    return (
      projectedRadius + FRAMING_SHIFT_UP * pxPerUnit <= height / 2 - marginY &&
      projectedRadius + FRAMING_SHIFT_RIGHT * pxPerUnit <= width / 2 - marginX
    )
  }

  let near = radius * 1.01
  let far = radius * 30

  if (fits(near)) {
    return near
  }
  if (!fits(far)) {
    return far
  }

  for (let i = 0; i < 40; i += 1) {
    const mid = (near + far) / 2
    if (fits(mid)) {
      far = mid
    } else {
      near = mid
    }
  }

  return far
}

function CameraControls({
  initialCameraPosition,
  initialTarget,
  modelRadius,
  modelScale,
  onResetRef,
  isMobile,
}) {
  const controlsRef = useRef()
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)

  const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360)
  const scaledRadius = modelRadius ? modelRadius * modelScale : null

  const fitDistance = useMemo(
    () => fitDistanceFor(scaledRadius, size.width, size.height, tanHalfFov),
    [scaledRadius, size.width, size.height, tanHalfFov]
  )

  const initialDirection = useMemo(() => {
    const direction = new Vector3(...initialCameraPosition)
    return direction.lengthSq() > 0 ? direction.normalize() : new Vector3(0, 1, 0)
  }, [initialCameraPosition])

  // Decentra il frustum: il modello appare centrato senza spostare il target.
  useEffect(() => {
    if (!fitDistance || !size.width || !size.height) {
      return undefined
    }

    const pxPerUnit = (size.height / 2) / (fitDistance * tanHalfFov)
    camera.setViewOffset(
      size.width,
      size.height,
      -FRAMING_SHIFT_RIGHT * pxPerUnit,
      FRAMING_SHIFT_UP * pxPerUnit,
      size.width,
      size.height
    )
    camera.updateProjectionMatrix()

    return () => {
      camera.clearViewOffset()
      camera.updateProjectionMatrix()
    }
  }, [camera, fitDistance, size.width, size.height, tanHalfFov])

  // Arretra la camera quanto basta a contenere il modello, mantenendo
  // l'angolazione corrente (o quella iniziale al primo posizionamento).
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls || !fitDistance) {
      return
    }

    const target = new Vector3(...initialTarget)
    const offset = camera.position.clone().sub(target)
    const direction = offset.lengthSq() > 0 ? offset.normalize() : initialDirection

    controls.setLookAt(
      target.x + direction.x * fitDistance,
      target.y + direction.y * fitDistance,
      target.z + direction.z * fitDistance,
      target.x, target.y, target.z,
      false
    )
  }, [camera, fitDistance, initialDirection, initialTarget])

  const resetView = useCallback(() => {
    const controls = controlsRef.current
    if (!controls) {
      return
    }

    const target = new Vector3(...initialTarget)
    const distance = fitDistance ?? new Vector3(...initialCameraPosition).length()

    controls.setLookAt(
      target.x + initialDirection.x * distance,
      target.y + initialDirection.y * distance,
      target.z + initialDirection.z * distance,
      target.x, target.y, target.z,
      true // enable transition
    )
  }, [fitDistance, initialCameraPosition, initialDirection, initialTarget])

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
        left: isMobile ? 0 : 1, // ACTION.ROTATE only on desktop
        middle: 0, // ACTION.NONE
        right: 0, // ACTION.NONE
        wheel: 0, // ACTION.NONE
      }}
      touches={{
        one: isMobile ? 0 : 1, // ACTION.TOUCH_ROTATE only on desktop
        two: 0, // ACTION.NONE
        three: 0 // ACTION.NONE
      }}
    />
  )
}

const noop = () => {}

export default function KeyboardScene({
  onKeyHover = noop,
  onKeyClick = noop,
  onLoaded = noop,
  fixedRotation = [0, 0, 0],
  scale = 1,
  onResetRef,
  ...props
}) {
  const [keyboardPosition, setKeyboardPosition] = useState([0, 0, 0])
  const [keyboardScale, setKeyboardScale] = useState(scale)
  const [isMobile, setIsMobile] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [modelRadius, setModelRadius] = useState(null)

  const handleLoaded = useCallback(() => {
    setIsReady(true)
    onLoaded()
  }, [onLoaded])

  const handleBounds = useCallback((radius) => setModelRadius(radius), [])

  // Direzione di vista iniziale (il modulo viene ricalcolato dall'auto-fit in
  // base al raggio del modello). Il target è il centro geometrico del modello:
  // è anche il centro di rotazione.
  const initialCameraPosition = useMemo(() => [-6.457, 14.027, 1.301], [])
  const initialTarget = useMemo(() => [0, 0, 0], [])

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (mobile) {
        setKeyboardPosition([0, 0, 0])
        setKeyboardScale(1.8) // Reduced scale so it doesn't get cut off
      } else {
        setKeyboardPosition([0, 0, 0])
        setKeyboardScale(scale)
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [scale])

  return (
    <div className={`keyboard-wrapper${isReady ? ' keyboard-wrapper--ready' : ''}`}>
      <Canvas 
        camera={{ position: initialCameraPosition, fov: 80 }} 
        style={{ touchAction: isMobile ? 'auto' : 'none' }}
        {...props}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <KeyboardWrapper
            position={keyboardPosition}
            rotation={fixedRotation}
            scale={[keyboardScale, keyboardScale, keyboardScale]}
            onKeyHover={onKeyHover}
            onKeyClick={onKeyClick}
            onLoaded={handleLoaded}
            onBounds={handleBounds}
          />
        </Suspense>
        <CameraControls
          initialCameraPosition={initialCameraPosition}
          initialTarget={initialTarget}
          modelRadius={modelRadius}
          modelScale={keyboardScale}
          onResetRef={onResetRef}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  )
}

// This module is loaded through React.lazy: the preload starts only when the
// skills section is about to become visible, never on first paint.
useGLTF.preload('/keyboard.glb', false, false)
