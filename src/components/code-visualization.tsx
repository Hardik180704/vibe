"use client";
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function CodeCube({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + delay;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + delay) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group ref={linesRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8b5cf6"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

interface CodeVisualizationProps {
  className?: string;
  type?: "preview" | "code";
}

export function CodeVisualization({ className = "", type = "preview" }: CodeVisualizationProps) {
  const cubeColors = type === "preview" 
    ? ["#3b82f6", "#60a5fa", "#93c5fd"] 
    : ["#8b5cf6", "#a78bfa", "#c4b5fd"];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        
        <ParticleField />
        <ConnectingLines />
        
        {cubeColors.map((color, i) => (
          <CodeCube
            key={`cube-${i}-${color}`}
            position={[
              Math.cos((i / cubeColors.length) * Math.PI * 2) * 2,
              Math.sin((i / cubeColors.length) * Math.PI * 2) * 1.5,
              0
            ]}
            color={color}
            delay={i * 0.5}
          />
        ))}
      </Canvas>
    </div>
  );
}
