"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PerformanceMonitor } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const NODE_COUNT = 48;

function Network({ pointerRef }) {
  const group = useRef(null);
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < NODE_COUNT; i += 1) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2,
        ),
      );
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].distanceTo(nodes[j]) < 1.35) {
          pairs.push([nodes[i], nodes[j]]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    const target = new THREE.Vector3(
      pointerRef.current.x * 1.2,
      pointerRef.current.y * 0.8,
      0,
    );
    group.current.position.lerp(target, 0.04);
  });

  return (
    <group ref={group}>
      {edges.map(([a, b], index) => (
        <Line
          key={`edge-${index}`}
          points={[a, b]}
          color="#3d8f8f"
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#5b8fd4" emissive="#1a2234" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function NetworkScene() {
  const [dpr, setDpr] = useState(1.5);
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={Math.min(dpr, 2)}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMove={(event) => {
        pointerRef.current.x = (event.pointer.x || 0) * 0.6;
        pointerRef.current.y = (event.pointer.y || 0) * 0.6;
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <color attach="background" args={["#0c1222"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#c9a227" />
      <Network pointerRef={pointerRef} />
    </Canvas>
  );
}
