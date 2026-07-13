'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Html } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';

type Node = {
  name: string;
  category: 'ai' | 'auto' | 'ops' | 'comms';
  ring: number;
};

const NODES: Node[] = [
  { name: 'OpenAI', category: 'ai', ring: 0 },
  { name: 'Claude', category: 'ai', ring: 0 },
  { name: 'Gemini', category: 'ai', ring: 0 },
  { name: 'n8n', category: 'auto', ring: 1 },
  { name: 'Make', category: 'auto', ring: 1 },
  { name: 'Zapier', category: 'auto', ring: 1 },
  { name: 'Notion', category: 'ops', ring: 2 },
  { name: 'Airtable', category: 'ops', ring: 2 },
  { name: 'Google', category: 'ops', ring: 2 },
  { name: 'Slack', category: 'comms', ring: 3 },
  { name: 'Telegram', category: 'comms', ring: 3 },
  { name: 'WhatsApp', category: 'comms', ring: 3 },
];

const RING_RADII = [1.6, 2.6, 3.6, 4.6];
const CATEGORY_COLORS: Record<Node['category'], string> = {
  ai: '#4f7cff',
  auto: '#a855f7',
  ops: '#d010ff',
  comms: '#7ab0ff',
};

function Orbital({
  hovered,
  setHovered,
  paused,
}: {
  hovered: string | null;
  setHovered: (n: string | null) => void;
  paused: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Category of the hovered node — same-category nodes are treated as connected.
  const hoveredCategory = hovered
    ? NODES.find((n) => n.name === hovered)?.category ?? null
    : null;

  // Live (group-local) position of every node, written each frame by the nodes
  // and read by <Connections> so the connecting lines track the orbit.
  const positionsRef = useRef<Record<string, THREE.Vector3>>({});
  if (Object.keys(positionsRef.current).length === 0) {
    NODES.forEach((n) => {
      positionsRef.current[n.name] = new THREE.Vector3();
    });
  }

  const placed = useMemo(() => {
    const byRing: Record<number, Node[]> = {};
    NODES.forEach((n) => {
      byRing[n.ring] ??= [];
      byRing[n.ring].push(n);
    });
    const items: { node: Node; angle: number; radius: number; offset: number; speed: number }[] = [];
    Object.entries(byRing).forEach(([ring, list]) => {
      const r = RING_RADII[Number(ring)];
      const speed = 0.08 + Number(ring) * 0.04;
      list.forEach((n, i) => {
        const angle = (i / list.length) * Math.PI * 2;
        items.push({ node: n, angle, radius: r, offset: Math.random() * Math.PI * 2, speed });
      });
    });
    return items;
  }, []);

  // The orbit runs on its own clock so it can pause: while the cursor is
  // anywhere over the scene (paused) or a node is hovered, the speed factor
  // eases to 0 so the planets become still, easy-to-click targets, then eases
  // back to 1 when the cursor leaves. Easing avoids a visible jerk.
  const orbitTime = useRef(0);
  const speedFactor = useRef(1);
  useFrame((_, delta) => {
    const target = paused || hovered ? 0 : 1;
    if (reducedMotion) {
      speedFactor.current = target;
    } else {
      speedFactor.current += (target - speedFactor.current) * Math.min(1, delta * 5);
    }
    orbitTime.current += delta * speedFactor.current;
    if (!group.current) return;
    group.current.rotation.y = orbitTime.current * 0.08;
    group.current.rotation.x = Math.sin(orbitTime.current * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      {RING_RADII.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.008, r + 0.008, 128]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#4f7cff' : '#a855f7'}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>

      {placed.map((p) => (
        <OrbitingNode
          key={p.node.name}
          node={p.node}
          radius={p.radius}
          angle={p.angle}
          offset={p.offset}
          speed={p.speed}
          setHovered={setHovered}
          hovered={hovered}
          hoveredCategory={hoveredCategory}
          reducedMotion={reducedMotion}
          positionsRef={positionsRef}
          orbitTimeRef={orbitTime}
        />
      ))}

      <Connections
        hovered={hovered}
        hoveredCategory={hoveredCategory}
        positionsRef={positionsRef}
      />
    </group>
  );
}

function Connections({
  hovered,
  hoveredCategory,
  positionsRef,
}: {
  hovered: string | null;
  hoveredCategory: Node['category'] | null;
  positionsRef: { current: Record<string, THREE.Vector3> };
}) {
  const lineRef = useRef<THREE.LineSegments>(null);
  // One segment per potential peer link; two vertices (xyz each) per segment.
  const positions = useMemo(() => new Float32Array(NODES.length * 2 * 3), []);

  useFrame(() => {
    const line = lineRef.current;
    if (!line) return;
    const origin = hovered ? positionsRef.current[hovered] : null;
    if (!hovered || !hoveredCategory || !origin) {
      line.visible = false;
      return;
    }
    let seg = 0;
    NODES.forEach((n) => {
      if (n.category !== hoveredCategory || n.name === hovered) return;
      const p = positionsRef.current[n.name];
      if (!p) return;
      const base = seg * 6;
      positions[base] = origin.x;
      positions[base + 1] = origin.y;
      positions[base + 2] = origin.z;
      positions[base + 3] = p.x;
      positions[base + 4] = p.y;
      positions[base + 5] = p.z;
      seg++;
    });
    const attr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
    attr.needsUpdate = true;
    line.geometry.setDrawRange(0, seg * 2);
    (line.material as THREE.LineBasicMaterial).color.set(CATEGORY_COLORS[hoveredCategory]);
    line.visible = seg > 0;
  });

  return (
    <lineSegments ref={lineRef} frustumCulled={false} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial transparent opacity={0.7} toneMapped={false} />
    </lineSegments>
  );
}

function OrbitingNode({
  node,
  radius,
  angle,
  offset,
  speed,
  setHovered,
  hovered,
  hoveredCategory,
  reducedMotion,
  positionsRef,
  orbitTimeRef,
}: {
  node: Node;
  radius: number;
  angle: number;
  offset: number;
  speed: number;
  setHovered: (n: string | null) => void;
  hovered: string | null;
  hoveredCategory: Node['category'] | null;
  reducedMotion: boolean;
  positionsRef: { current: Record<string, THREE.Vector3> };
  orbitTimeRef: { current: number };
}) {
  const ref = useRef<THREE.Group>(null);
  const color = CATEGORY_COLORS[node.category];
  const isActive = hovered === node.name;
  // Same-category peers of the hovered node read as "connected" and stay lit;
  // everything else dims so the highlighted cluster reads.
  const isRelated = hoveredCategory !== null && node.category === hoveredCategory;
  const isDimmed = hovered !== null && !isRelated;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // Position runs on the shared pausable orbit clock (freezes on hover)…
    const t = orbitTimeRef.current;
    const a = angle + t * speed + offset * 0.15;
    ref.current.position.x = Math.cos(a) * radius;
    ref.current.position.z = Math.sin(a) * radius;
    ref.current.position.y = Math.sin(t * 0.5 + offset) * 0.1;
    // Publish live position for the connecting lines.
    positionsRef.current[node.name]?.copy(ref.current.position);
    // …while the hover pulse runs on real time so it keeps breathing during
    // the pause. Suppressed under reduced motion.
    const pulse =
      isActive && !reducedMotion ? 1 + Math.sin(clock.getElapsedTime() * 4) * 0.06 : 1;
    ref.current.scale.setScalar(pulse);
  });

  // Always restore the cursor when this node unmounts mid-hover.
  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(node.name);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = '';
        }}
      >
        <sphereGeometry args={[isActive ? 0.16 : 0.11, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isDimmed ? 0.4 : 1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.4 : isRelated ? 0.3 : isDimmed ? 0.06 : 0.18}
        />
      </mesh>
      <Html center distanceFactor={8} zIndexRange={[10, 0]}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isActive ? '0.85rem' : '0.74rem',
            letterSpacing: '0.12em',
            color: isActive ? '#fff' : 'rgba(230, 232, 255, 0.85)',
            padding: '2px 8px',
            background: isActive ? `linear-gradient(135deg, #2a5bff, #a855f7)` : 'rgba(5, 5, 20, 0.6)',
            border: `1px solid ${color}`,
            whiteSpace: 'nowrap',
            transform: 'translateY(22px)',
            pointerEvents: 'none',
            textShadow: '0 0 8px rgba(0,0,0,0.8)',
            opacity: isDimmed ? 0.35 : 1,
          }}
        >
          {node.name}
        </div>
      </Html>
    </group>
  );
}

function PointerTilt({ baseZ, paused }: { baseZ: number; paused: boolean }) {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    // While a node is hovered the camera stops chasing the mouse — otherwise
    // the whole scene keeps shifting under the cursor even with the orbit
    // frozen, and the "planet" never truly holds still. Resuming lerps from
    // the current position, so there is no jump either way.
    if (!paused) {
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 1 + 2 - camera.position.y) * 0.04;
    }
    camera.position.z += (baseZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useResponsiveCameraZ() {
  const [z, setZ] = useState(7);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 480) setZ(13);
      else if (w < 760) setZ(10.5);
      else if (w < 1024) setZ(8);
      else setZ(7);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return z;
}

export function StackOrbital() {
  const baseZ = useResponsiveCameraZ();
  // Hover state lives here so BOTH moving systems can pause on it:
  // the orbit (Orbital) and the mouse-chasing camera (PointerTilt).
  const [hovered, setHovered] = useState<string | null>(null);
  // The camera settles as soon as the cursor is anywhere over the scene —
  // otherwise it keeps chasing the mouse while you AIM at a planet and the
  // target slides away from the cursor. Planets keep orbiting until one is
  // actually hovered.
  const [pointerOver, setPointerOver] = useState(false);
  return (
    <div
      style={{ position: 'absolute', inset: 0 }}
      // Mouse only: on touch there is no hover, and pointerleave after a tap
      // is unreliable, so a tap must never freeze the orbit permanently.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPointerOver(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPointerOver(false)}
    >
      <Canvas
        camera={{ position: [0, 2.2, baseZ], fov: 55 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Orbital hovered={hovered} setHovered={setHovered} paused={pointerOver} />
          <PointerTilt baseZ={baseZ} paused={pointerOver || hovered !== null} />
          <EffectComposer>
            <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.85} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
