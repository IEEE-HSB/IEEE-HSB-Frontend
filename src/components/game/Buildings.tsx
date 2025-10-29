'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { BuildingData } from './Game3DScene';

interface BuildingProps {
  building: BuildingData;
  onClick: (building: BuildingData) => void;
}

function Building({ building, onClick }: BuildingProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const model = useGLTF('/assets/models/building5.glb');
  const models = [model];

 

  const modelIndex = building.id.length % models.length;
  const { scene } = models[modelIndex];

  useFrame((state) => {
    if (meshRef.current) {
      // floating animation
      meshRef.current.position.y = 0;


      // scale on hover
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group
      ref={meshRef}
      position={building.position}
      onClick={() => onClick(building)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Model GLB */}
      <primitive object={scene.clone()} scale={building.scale || 1.5} />

      {/* Glowing Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial
          color={building.color}
          emissive={building.color}
          emissiveIntensity={hovered ? 1 : 0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 3.1, 0]}
        fontSize={0.5}
        color={building.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="grey"
      >
        {building.name}
      </Text>

      {/* Hover Indicator */}
      {hovered && (
        <>
          <pointLight position={[0, 2, 0]} intensity={2} color={building.color} distance={5} />
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={building.color}
              emissive={building.color}
              emissiveIntensity={2}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

interface BuildingsProps {
  buildings: BuildingData[];
  onBuildingClick: (building: BuildingData) => void;
}

export function Buildings({ buildings, onBuildingClick }: BuildingsProps) {
  return (
    <>
      {buildings.map((building) => (
        <Building key={building.id} building={building} onClick={onBuildingClick} />
      ))}
    </>
  );
}

useGLTF.preload('/assets/models/building5.glb'); 

