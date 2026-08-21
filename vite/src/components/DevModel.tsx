import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import { useDevStore } from "../store";

const IMAGE_URL = "/dev-ref.jpg";

export function DevModel() {
  const group = useRef<Group>(null);
  const tex = useTexture(IMAGE_URL);
  const phase = useDevStore((s) => s.phase);
  const setModelReady = useDevStore((s) => s.setModelReady);

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    setModelReady(true);
  }, [tex, setModelReady]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const speed = phase === "speaking" ? 0.45 : phase === "listening" ? 0.28 : 0.14;
    group.current.rotation.y = Math.sin(t * speed) * 0.2;
    group.current.position.y = Math.sin(t * 1.15) * 0.05;
  });

  const size = 2.4;

  return (
    <Float speed={1.05} rotationIntensity={0.05} floatIntensity={0.18}>
      <group ref={group} position={[0, 0.08, 0]}>
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[size * 0.62, 64]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} toneMapped={false} />
        </mesh>
        <mesh>
          <planeGeometry args={[size, size]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[size, size]} />
          <meshBasicMaterial
            color="#c9a227"
            transparent
            opacity={0.04}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}
