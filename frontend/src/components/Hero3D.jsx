
import { Suspense, useRef, useSyncExternalStore } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'

const MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToMotionPreference(callback) {
  const mediaQuery = window.matchMedia(MOTION_QUERY)

  mediaQuery.addEventListener('change', callback)

  return () => {
    mediaQuery.removeEventListener('change', callback)
  }
}

function getMotionPreference() {
  return window.matchMedia(MOTION_QUERY).matches
}

function getServerMotionPreference() {
  return false
}

function AnimatedCore() {
  const coreRef = useRef(null)
  const ringRef = useRef(null)

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.18
      coreRef.current.rotation.y += delta * 0.32
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.12
      ringRef.current.rotation.y -= delta * 0.2
    }
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.55}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.05, 2]} />

          <MeshDistortMaterial
            color="#6388ff"
            emissive="#31206f"
            emissiveIntensity={0.65}
            roughness={0.18}
            metalness={0.65}
            distort={0.28}
            speed={1.8}
          />
        </mesh>

        <mesh scale={1.12}>
          <icosahedronGeometry args={[1.05, 1]} />

          <meshBasicMaterial
            color="#4de4f5"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[1.1, 0.2, 0.4]}>
        <torusGeometry args={[1.55, 0.012, 12, 120]} />
        <meshBasicMaterial color="#4de4f5" />
      </mesh>

      <mesh rotation={[0.45, 0.9, 1.1]}>
        <torusGeometry args={[1.78, 0.009, 10, 120]} />

        <meshBasicMaterial
          color="#9b6bff"
          transparent
          opacity={0.8}
        />
      </mesh>

      <Sparkles
        count={90}
        scale={5}
        size={2.2}
        speed={0.35}
        color="#8da8ff"
        opacity={0.8}
      />
    </group>
  )
}

export default function Hero3D() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  )

  return (
    <div className="hero-3d-canvas">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={prefersReducedMotion ? 'never' : 'always'}
      >
        <ambientLight intensity={1.1} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={2.2}
          color="#ffffff"
        />

        <pointLight
          position={[-3, -2, 2]}
          intensity={35}
          color="#4de4f5"
        />

        <pointLight
          position={[3, 1, -2]}
          intensity={28}
          color="#9b6bff"
        />

        <Suspense fallback={null}>
          <AnimatedCore />
        </Suspense>
      </Canvas>
    </div>
  )
}
