'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useMemo, useRef, Suspense } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1800;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color('#4f7cff');
    const purple = new THREE.Color('#a855f7');
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() > 0.5 ? blue : purple;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Circuit() {
  const group = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const out: { pts: THREE.Vector3[]; color: string }[] = [];
    for (let i = 0; i < 18; i++) {
      const pts: THREE.Vector3[] = [];
      const r = 3.2 + Math.random() * 2.4;
      const segs = 6 + Math.floor(Math.random() * 4);
      let angle = Math.random() * Math.PI * 2;
      const yBase = (Math.random() - 0.5) * 4;
      for (let j = 0; j < segs; j++) {
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        pts.push(new THREE.Vector3(x, yBase + (Math.random() - 0.5) * 0.8, z));
        angle += (Math.random() - 0.5) * 0.8 + 0.3;
      }
      out.push({ pts, color: i % 2 === 0 ? '#4f7cff' : '#a855f7' });
    }
    return out;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y -= delta * 0.06;
  });

  return (
    <group ref={group}>
      {lines.map((line, idx) => {
        const geom = new THREE.BufferGeometry().setFromPoints(line.pts);
        return (
          <line key={idx}>
            <primitive object={geom} attach="geometry" />
            <lineBasicMaterial
              attach="material"
              color={line.color}
              transparent
              opacity={0.55}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}
      {lines.flatMap((line, i) =>
        line.pts.map((p, j) => (
          <mesh key={`n-${i}-${j}`} position={p.toArray()}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#7ab0ff' : '#d88bff'} />
          </mesh>
        )),
      )}
    </group>
  );
}

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.04);
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.15, 1]} />
      <meshBasicMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function PointerTilt() {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.6 + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#05051a']} />
        <fog attach="fog" args={['#05051a', 6, 16]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 2, 3]} intensity={2.0} color="#4f7cff" />
        <pointLight position={[-5, -1, -2]} intensity={2.0} color="#a855f7" />

        <Core />
        <Circuit />
        <ParticleField />
        <PointerTilt />

        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0018, 0.0018)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
