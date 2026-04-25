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

function Orbital() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.08;
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.08;
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
        />
      ))}
    </group>
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
}: {
  node: Node;
  radius: number;
  angle: number;
  offset: number;
  speed: number;
  setHovered: (n: string | null) => void;
  hovered: string | null;
}) {
  const ref = useRef<THREE.Group>(null);
  const color = CATEGORY_COLORS[node.category];
  const isActive = hovered === node.name;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const a = angle + t * speed + offset * 0.15;
    ref.current.position.x = Math.cos(a) * radius;
    ref.current.position.z = Math.sin(a) * radius;
    ref.current.position.y = Math.sin(t * 0.5 + offset) * 0.1;
  });

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
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isActive ? 0.35 : 0.18} />
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
          }}
        >
          {node.name}
        </div>
      </Html>
    </group>
  );
}

function PointerTilt({ baseZ }: { baseZ: number }) {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 1 + 2 - camera.position.y) * 0.04;
    camera.position.z += (baseZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
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
  return (
    <Canvas
      camera={{ position: [0, 2.2, baseZ], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Orbital />
        <PointerTilt baseZ={baseZ} />
        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.85} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
