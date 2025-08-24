"use client";
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles({ count = 1000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function WaveGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.2, 0.6, 1.0) },
        uOpacity: { value: 0.3 }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          float wave = sin(pos.x * 0.05 + uTime * 0.5) * sin(pos.y * 0.05 + uTime * 0.3) * 0.5;
          pos.z += wave;
          vWave = wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          float strength = (vWave + 0.5) * 0.5;
          vec3 color = mix(uColor, vec3(1.0, 0.8, 0.9), strength);
          gl_FragColor = vec4(color, uOpacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} material={shaderMaterial}>
      <planeGeometry args={[10, 10, 50, 50]} />
    </mesh>
  );
}

function FloatingCodeElements() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <Float
          key={`float-cube-${i}`}
          speed={1 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 4,
            Math.sin(i) * 2,
            Math.sin((i / 5) * Math.PI * 2) * 4
          ]}
        >
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial
              color={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i]}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const helixRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    helixRef.current.forEach((sphere, i) => {
      if (sphere) {
        const time = state.clock.elapsedTime;
        const angle = (i / 20) * Math.PI * 2 + time * 0.5;
        sphere.position.x = Math.cos(angle) * 2;
        sphere.position.z = Math.sin(angle) * 2;
        sphere.position.y = (i - 10) * 0.2;
        sphere.scale.setScalar(0.8 + Math.sin(time * 2 + i * 0.5) * 0.2);
      }
    });
  });

  return (
    <group ref={groupRef} position={[6, 0, -3]}>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={`helix-${i}`}
          ref={(el) => {
            if (el) helixRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

interface ThreeSceneProps {
  className?: string;
  showDNA?: boolean;
}

export function ThreeScene({ className = "", showDNA = false }: ThreeSceneProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <FloatingParticles count={800} />
        <WaveGeometry />
        <FloatingCodeElements />
        {showDNA && <DNAHelix />}
      </Canvas>
    </div>
  );
}
