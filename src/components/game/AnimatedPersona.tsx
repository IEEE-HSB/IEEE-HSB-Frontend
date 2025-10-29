import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BuildingData } from './Game3DScene';

interface AnimatedPersonaProps {
  targetBuilding: BuildingData | null;
}

export function AnimatedPersona({ targetBuilding }: AnimatedPersonaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const targetPosition = useRef(new THREE.Vector3(0, 4, 0));
  const currentPosition = useRef(new THREE.Vector3(0, 4, 0));
  const isMoving = useRef(false);
  const moveProgress = useRef(0);

  useEffect(() => {
    if (targetBuilding) {
      // Set new target position on top of building
      targetPosition.current.set(
        targetBuilding.position[0],
        4, // Height above building
        targetBuilding.position[2]
      );
      isMoving.current = true;
      moveProgress.current = 0;
    }
  }, [targetBuilding]);

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      if (isMoving.current) {
        // Animate movement to target building
        moveProgress.current += delta * 1.5; // Speed of movement
        
        if (moveProgress.current >= 1) {
          moveProgress.current = 1;
          isMoving.current = false;
          currentPosition.current.copy(targetPosition.current);
        }

        // Smooth interpolation with easing
        const t = moveProgress.current;
        const eased = t < 0.5 
          ? 2 * t * t 
          : -1 + (4 - 2 * t) * t; // Ease in-out

        groupRef.current.position.lerpVectors(
          currentPosition.current,
          targetPosition.current,
          eased
        );

        // Add jump arc during movement
        if (moveProgress.current < 1) {
          const jumpHeight = Math.sin(moveProgress.current * Math.PI) * 2;
          groupRef.current.position.y += jumpHeight;
        }
      } else {
        // Gentle floating when standing on building
        groupRef.current.position.y = targetPosition.current.y + Math.sin(timeRef.current * 2) * 0.15;
      }
    }

    if (orbRef.current) {
      // Rotation
      orbRef.current.rotation.y += delta * 2;
      orbRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.2;
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1 + Math.sin(timeRef.current * 3) * 0.2;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Robot Body - Main Orb */}
      <mesh ref={orbRef} castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#FFD100"
          emissive="#FFD100"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* IEEE Logo Representation - Blue Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.08, 16, 32]} />
        <meshStandardMaterial
          color="#00629B"
          emissive="#00629B"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary Ring */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.5, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#009CA6"
          emissive="#009CA6"
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Robot Eyes */}
      <mesh position={[0.15, 0.15, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#00629B"
          emissive="#00629B"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-0.15, 0.15, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#00629B"
          emissive="#00629B"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#FFD100"
          emissive="#FFD100"
          emissiveIntensity={0.8}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Robot Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial
          color="#00629B"
          emissive="#00629B"
          emissiveIntensity={1}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#FFD100"
          emissive="#FFD100"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Point Light following the robot */}
      <pointLight color="#FFD100" intensity={3} distance={10} />
      
      {/* Spotlight pointing down */}
      <spotLight
        position={[0, -0.5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#FFD100"
        target-position={[0, -2, 0]}
      />
    </group>
  );
}
