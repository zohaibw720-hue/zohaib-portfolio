
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const outfits = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#16a34a",
  "#ea580c",
  "#db2777",
  "#475569",
  "#0f766e",
  "#9333ea",
  "#b45309",
];

// ========================================
// Laptop with glowing display
// ========================================
function Laptop() {
  const screenLight = useRef();

  useFrame(({ clock }) => {
    if (screenLight.current) {
      screenLight.current.intensity =
        2.2 + Math.sin(clock.elapsedTime * 2) * 0.12;
    }
  });

  return (
    <group position={[0, -0.72, 0.35]} rotation={[0, Math.PI, 0]}>
      <mesh>
        <boxGeometry args={[1.65, 0.075, 0.95]} />
        <meshStandardMaterial
          color="#202b3b"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Keyboard panel */}
      <mesh position={[0, 0.043, -0.12]}>
        <boxGeometry args={[1.35, 0.018, 0.43]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Keyboard keys */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((__, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.61 + col * 0.111,
              0.057,
              -0.28 + row * 0.09,
            ]}
          >
            <boxGeometry args={[0.075, 0.012, 0.055]} />
            <meshStandardMaterial
              color="#a5d8ff"
              emissive="#38bdf8"
              emissiveIntensity={0.18}
            />
          </mesh>
        ))
      )}

      {/* Trackpad */}
      <mesh position={[0, 0.046, 0.29]}>
        <boxGeometry args={[0.4, 0.012, 0.19]} />
        <meshStandardMaterial color="#526174" />
      </mesh>

      {/* Screen hinge */}
      <mesh position={[0, 0.055, -0.43]}>
        <boxGeometry args={[1.4, 0.055, 0.055]} />
        <meshStandardMaterial color="#64748b" metalness={0.7} />
      </mesh>

      {/* Screen */}
      <group position={[0, 0.43, -0.42]} rotation={[-0.12, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.48, 0.86, 0.065]} />
          <meshStandardMaterial
            color="#101827"
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>

        <mesh position={[0, 0, 0.037]}>
          <planeGeometry args={[1.36, 0.75]} />
          <meshStandardMaterial
            color="#67d9ff"
            emissive="#159bff"
            emissiveIntensity={2.4}
          />
        </mesh>

        {/* Code-like lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              -0.39 + (i % 3) * 0.1,
              0.23 - i * 0.065,
              0.041,
            ]}
          >
            <planeGeometry args={[0.42 + (i % 2) * 0.2, 0.012]} />
            <meshBasicMaterial
              color={i % 2 ? "#c4f1ff" : "#a7f3d0"}
            />
          </mesh>
        ))}

        <pointLight
          ref={screenLight}
          color="#48cfff"
          intensity={2.2}
          distance={3.8}
          decay={2}
          position={[0, -0.05, 0.25]}
        />
      </group>
    </group>
  );
}

// ========================================
// Desk
// ========================================
function Desk() {
  return (
    <group position={[0, -0.85, 0.35]}>
      <mesh>
        <boxGeometry args={[3.7, 0.14, 1.6]} />
        <meshStandardMaterial color="#70452c" roughness={0.6} />
      </mesh>

      {[-1.55, 1.55].map((x) => (
        <group key={x} position={[x, -0.7, 0]}>
          {[-0.58, 0.58].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <boxGeometry args={[0.12, 1.3, 0.12]} />
              <meshStandardMaterial color="#3b2a22" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// ========================================
// Office chair
// ========================================
function OfficeChair() {
  return (
    <group position={[0, -1.35, -0.75]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.95, 0.12, 0.85]} />
        <meshStandardMaterial color="#202a3b" />
      </mesh>

      <mesh position={[0, 0.85, -0.35]}>
        <boxGeometry args={[0.95, 1.05, 0.12]} />
        <meshStandardMaterial color="#27364b" />
      </mesh>

      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.65, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.7} />
      </mesh>

      <mesh position={[0, -0.43, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.07, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

// ========================================
// Developer
// Cursor moves: pause typing and look at cursor
// Cursor stops: resume typing and look at laptop
// ========================================
function Developer() {
  const leftArm = useRef();
  const rightArm = useRef();
  const eyes = useRef();
  const fingers = useRef([]);

  const lastPointer = useRef({ x: 0, y: 0 });
  const stillTime = useRef(0);
  const hasMoved = useRef(false);
  const typing = useRef(true);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const dx = pointer.x - lastPointer.current.x;
    const dy = pointer.y - lastPointer.current.y;
    const moved = Math.hypot(dx, dy) > 0.0015;

    if (moved) {
      lastPointer.current = { x: pointer.x, y: pointer.y };
      stillTime.current = 0;
      hasMoved.current = true;
      typing.current = false;
    } else {
      stillTime.current += delta;

      if (!hasMoved.current || stillTime.current >= 0.8) {
        typing.current = true;
      }
    }

    const amount = typing.current ? 1 : 0.08;

    // Arms move more actively during typing
    if (leftArm.current) {
      leftArm.current.rotation.x =
        Math.sin(t * 10) * 0.1 * amount;
    }

    if (rightArm.current) {
      rightArm.current.rotation.x =
        Math.sin(t * 10 + 1) * 0.1 * amount;
    }

    // Individual fingers tap in a repeating typing pattern
    fingers.current.forEach((finger, index) => {
      if (!finger) return;

      const phase = t * 13 + index * 1.7;
      const tap = typing.current
        ? Math.max(0, Math.sin(phase)) * 0.16
        : 0;

      finger.rotation.x = THREE.MathUtils.damp(
        finger.rotation.x,
        tap,
        14,
        delta
      );
    });

    // Eyes follow the cursor, then return to laptop
    if (eyes.current) {
      const targetX = typing.current ? 0 : pointer.x * 0.06;
      const targetY = typing.current ? -0.018 : pointer.y * 0.025;

      eyes.current.position.x = THREE.MathUtils.damp(
        eyes.current.position.x,
        targetX,
        7,
        delta
      );

      eyes.current.position.y = THREE.MathUtils.damp(
        eyes.current.position.y,
        targetY,
        7,
        delta
      );
    }
  });

  const skin = "#d6a17c";
  const shirt = "#2563eb";

  return (
    <group position={[0, -1.05, -0.15]}>
      {/* Body */}
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.35, 0.7, 6, 12]} />
        <meshStandardMaterial color={shirt} roughness={0.65} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.08, 0.02]}>
        <cylinderGeometry args={[0.11, 0.13, 0.2, 12]} />
        <meshStandardMaterial color={skin} />
      </mesh>

      {/* Head */}
      <group position={[0, 1.34, 0.04]}>
        <mesh>
          <sphereGeometry args={[0.27, 24, 24]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.14, -0.04]}>
          <sphereGeometry
            args={[0.275, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.48]}
          />
          <meshStandardMaterial color="#20202a" roughness={0.85} />
        </mesh>

        {/* Eyes */}
        <group ref={eyes} position={[0, 0.015, 0.251]}>
          {[-0.078, 0.078].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.044, 16, 12]} />
                <meshStandardMaterial color="white" />
              </mesh>

              <mesh position={[0, 0, 0.037]}>
                <sphereGeometry args={[0.023, 12, 12]} />
                <meshStandardMaterial color="#202a38" />
              </mesh>

              <mesh position={[-0.007, 0.009, 0.056]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="white" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Nose */}
        <mesh position={[0, -0.035, 0.265]}>
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshStandardMaterial color="#bd8263" />
        </mesh>
      </group>

      {/* Left arm */}
      <group ref={leftArm} position={[-0.27, 0.77, 0.13]}>
        <mesh position={[0.13, -0.2, 0.23]} rotation={[0.75, 0, -0.55]}>
          <capsuleGeometry args={[0.095, 0.43, 5, 10]} />
          <meshStandardMaterial color={shirt} />
        </mesh>

        {/* Palm */}
        <mesh position={[0.24, -0.38, 0.43]}>
          <boxGeometry args={[0.19, 0.065, 0.13]} />
          <meshStandardMaterial color={skin} />
        </mesh>

        {/* Five left fingers */}
        {Array.from({ length: 5 }).map((_, i) => (
          <group
            key={`left-${i}`}
            ref={(node) => {
              fingers.current[i] = node;
            }}
            position={[
              0.17 + i * 0.035,
              -0.4,
              0.48 + Math.abs(i - 2) * 0.008,
            ]}
          >
            <mesh>
              <capsuleGeometry args={[0.018, 0.085, 4, 8]} />
              <meshStandardMaterial color={skin} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Right arm */}
      <group ref={rightArm} position={[0.27, 0.77, 0.13]}>
        <mesh position={[-0.13, -0.2, 0.23]} rotation={[0.75, 0, 0.55]}>
          <capsuleGeometry args={[0.095, 0.43, 5, 10]} />
          <meshStandardMaterial color={shirt} />
        </mesh>

        {/* Palm */}
        <mesh position={[-0.24, -0.38, 0.43]}>
          <boxGeometry args={[0.19, 0.065, 0.13]} />
          <meshStandardMaterial color={skin} />
        </mesh>

        {/* Five right fingers */}
        {Array.from({ length: 5 }).map((_, i) => (
          <group
            key={`right-${i}`}
            ref={(node) => {
              fingers.current[i + 5] = node;
            }}
            position={[
              -0.17 - i * 0.035,
              -0.4,
              0.48 + Math.abs(i - 2) * 0.008,
            ]}
          >
            <mesh>
              <capsuleGeometry args={[0.018, 0.085, 4, 8]} />
              <meshStandardMaterial color={skin} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Legs */}
      {[-0.22, 0.22].map((x) => (
        <mesh
          key={x}
          position={[x, -0.05, 0.05]}
          rotation={[0.25, 0, x * 0.25]}
        >
          <capsuleGeometry args={[0.13, 0.55, 5, 10]} />
          <meshStandardMaterial color="#172554" />
        </mesh>
      ))}
    </group>
  );
}

// ========================================
// Colleague
// ========================================
function Colleague({ position, color }) {
  const head = useRef();
  const eyes = useRef();
  const lastPointer = useRef({ x: 0, y: 0 });
  const stillTime = useRef(0);
  const hasMoved = useRef(false);

  useFrame(({ pointer }, delta) => {
    const dx = pointer.x - lastPointer.current.x;
    const dy = pointer.y - lastPointer.current.y;
    const moved = Math.hypot(dx, dy) > 0.0015;

    if (moved) {
      lastPointer.current = { x: pointer.x, y: pointer.y };
      stillTime.current = 0;
      hasMoved.current = true;
    } else {
      stillTime.current += delta;
    }

    const following =
      hasMoved.current && stillTime.current < 0.8;

    // Look at cursor, then look back toward developer
    const targetY = following ? pointer.x * 0.45 : 0;
    const targetX = following ? -pointer.y * 0.2 : 0;

    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.damp(
        head.current.rotation.y,
        targetY,
        4,
        delta
      );

      head.current.rotation.x = THREE.MathUtils.damp(
        head.current.rotation.x,
        targetX,
        4,
        delta
      );
    }

    if (eyes.current) {
      eyes.current.position.x = THREE.MathUtils.damp(
        eyes.current.position.x,
        following ? pointer.x * 0.035 : 0,
        5,
        delta
      );
    }
  });

  const yaw = Math.atan2(-position[0], 1.8);

  return (
    <group position={position} rotation={[0, yaw, 0]} scale={1.22}>
      {/* Body */}
      <mesh position={[0, 0.68, 0]}>
        <capsuleGeometry args={[0.28, 0.62, 5, 10]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.12, 0.02]}>
        <cylinderGeometry args={[0.09, 0.1, 0.18, 12]} />
        <meshStandardMaterial color="#c99170" />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 1.39, 0.025]}>
        <mesh>
          <sphereGeometry args={[0.235, 24, 24]} />
          <meshStandardMaterial color="#d8a17d" roughness={0.7} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.105, -0.015]}>
          <sphereGeometry
            args={[0.238, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.48]}
          />
          <meshStandardMaterial color="#29252a" roughness={0.9} />
        </mesh>

        {/* Eyes */}
        <group ref={eyes} position={[0, 0.015, 0.207]}>
          {[-0.075, 0.075].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.043, 16, 12]} />
                <meshStandardMaterial color="#fffdf5" />
              </mesh>

              <mesh position={[0, 0, 0.035]}>
                <sphereGeometry args={[0.023, 12, 12]} />
                <meshStandardMaterial color="#202a38" />
              </mesh>

              <mesh position={[-0.007, 0.009, 0.053]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="white" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Nose */}
        <mesh position={[0, -0.035, 0.235]}>
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshStandardMaterial color="#bd8263" />
        </mesh>
      </group>

      {/* Arms */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.31, 0.88, 0]}>
          <mesh
            position={[side * 0.09, -0.24, 0.025]}
            rotation={[0, 0, -side * 0.22]}
          >
            <capsuleGeometry args={[0.075, 0.38, 5, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>

          <mesh position={[side * 0.14, -0.47, 0.045]}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color="#d8a17d" />
          </mesh>
        </group>
      ))}

      {/* Legs */}
      {[-0.14, 0.14].map((x) => (
        <mesh key={x} position={[x, 0.13, 0]}>
          <capsuleGeometry args={[0.105, 0.38, 5, 8]} />
          <meshStandardMaterial color="#26354a" />
        </mesh>
      ))}
    </group>
  );
}

// ========================================
// Ten colleagues
// ========================================
function Colleagues() {
  const positions = [
    [-3.15, -1.9, -1.2],
    [-2.55, -1.9, -1.7],
    [-1.95, -1.9, -2.1],
    [-1.35, -1.9, -2.4],
    [-0.72, -1.9, -2.6],
    [0.72, -1.9, -2.6],
    [1.35, -1.9, -2.4],
    [1.95, -1.9, -2.1],
    [2.55, -1.9, -1.7],
    [3.15, -1.9, -1.2],
  ];

  return positions.map((position, index) => (
    <Colleague
      key={index}
      position={position}
      color={outfits[index]}
    />
  ));
}

// ========================================
// Scene
// ========================================
function Scene() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#d8efff", "#172033", 1.1]} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2}
        color="#ffffff"
      />

      <pointLight
        position={[0, 0.1, 1.2]}
        intensity={0.8}
        color="#8bdcff"
        distance={6}
      />

      <Desk />
      <OfficeChair />
      <Laptop />
      <Developer />
      <Colleagues />
    </>
  );
}

// ========================================
// Hero3D export
// ========================================
export default function Hero3D() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "520px" }}>
      <Canvas
        camera={{ position: [0, 0.2, 7.6], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.8]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
