"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PerformanceMonitor } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { buildNetworkEdges, buildNetworkNodes } from "@/lib/network-nodes";
import { useHeroProbeRef } from "./HeroProbeContext.js";

const ACCENT = "#8fa3b8";
const ACCENT_MUTED = "#5c6d7e";
const VOID = "#0a0c0f";

function Network({ pointerRef }) {
  const group = useRef(null);
  const nodes = useMemo(() => buildNetworkNodes(48), []);
  const edges = useMemo(() => buildNetworkEdges(nodes), [nodes]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    const targetX = pointerRef.current.x * 1.2;
    const targetY = pointerRef.current.y * 0.8;
    group.current.position.x += (targetX - group.current.position.x) * 0.04;
    group.current.position.y += (targetY - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      {edges.map(([a, b], index) => (
        <Line
          key={`edge-${index}`}
          points={[a, b]}
          color={ACCENT_MUTED}
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      ))}
      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color={ACCENT} emissive={VOID} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * @param {{ onDegrade?: () => void }} props
 */
export function NetworkScene({ onDegrade }) {
  const probeRef = useHeroProbeRef();
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMove={(event) => {
        pointerRef.current.x = (event.pointer.x || 0) * 0.6;
        pointerRef.current.y = (event.pointer.y || 0) * 0.6;
        if (probeRef.current.active) {
          probeRef.current.x = event.pointer.x || 0;
          probeRef.current.y = event.pointer.y || 0;
        }
      }}
    >
      <PerformanceMonitor onDecline={() => onDegrade?.()} flipflops={3} />
      <color attach="background" args={[VOID]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={1.1} color={ACCENT} />
      <Network pointerRef={pointerRef} />
    </Canvas>
  );
}
