import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function makeBinaryTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#c9a227";
  ctx.font = "28px monospace";
  const bits = "01";
  for (let y = 0; y < size; y += 32) {
    for (let x = 0; x < size; x += 22) {
      ctx.fillText(bits[(x + y) % 2], x, y + 24);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  return tex;
}

export function BinaryRings() {
  const group = useRef<Group>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const tex = useMemo(() => makeBinaryTexture(), []);

  useFrame((_, dt) => {
    if (ringA.current) ringA.current.rotation.z += dt * 0.22;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.14;
  });

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      <mesh ref={ringA} rotation={[Math.PI / 2.1, 0.15, 0]}>
        <torusGeometry args={[1.55, 0.018, 12, 96]} />
        <meshBasicMaterial map={tex} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.4, -0.2, 0.3]}>
        <torusGeometry args={[1.85, 0.012, 12, 96]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.05, 2.08, 80]} />
        <meshBasicMaterial color="#c9a227" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
