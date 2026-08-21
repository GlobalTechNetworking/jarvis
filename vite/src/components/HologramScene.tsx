import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import { DevModel } from "./DevModel";
import { BinaryRings } from "./BinaryRings";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#fff4d6" />
      <pointLight position={[-3, 2, -2]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[2, -1, 3]} intensity={0.8} color="#c9a227" />
    </>
  );
}

export function HologramScene() {
  return (
    <Canvas
      dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
      camera={{ position: [0, 0.15, 3.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent", touchAction: "none" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#050508", 1);
      }}
    >
      <color attach="background" args={["#050508"]} />
      <fog attach="fog" args={["#050508", 7, 16]} />
      <Lights />
      <Suspense fallback={null}>
        <DevModel />
        <BinaryRings />
        <Sparkles count={36} scale={5.5} size={2} speed={0.28} color="#00d4ff" opacity={0.5} />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={8} blur={2.6} far={4} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2.4}
        maxDistance={5.2}
        maxPolarAngle={Math.PI * 0.58}
        minPolarAngle={Math.PI * 0.32}
        target={[0, 0.1, 0]}
        touches={{ ONE: 32 /* ROTATE */, TWO: 64 /* DOLLY */ } as never}
      />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.28} luminanceSmoothing={0.45} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
