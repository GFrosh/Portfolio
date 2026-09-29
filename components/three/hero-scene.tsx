import { Suspense, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { clamp } from "@/lib/utils";
import { useActiveWhenVisible } from "@/lib/capabilities";

type Pointer = RefObject<{ x: number; y: number }>;

const CYAN = "#22d3ee";

/** Slow wireframe shell that leans toward the pointer. */
function WireShell({ pointer }: { pointer: Pointer }) {
  const shell = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const node = shell.current;
    if (!node) return;
    const p = pointer.current;
    node.rotation.y += delta * 0.12;
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, (p?.y ?? 0) * 0.18, 2, delta);
    node.rotation.z = THREE.MathUtils.damp(node.rotation.z, (p?.x ?? 0) * -0.12, 2, delta);
  });

  return (
    <group ref={shell}>
      <Icosahedron args={[1.45, 1]}>
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.38} />
      </Icosahedron>
      <Icosahedron args={[0.92, 0]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.28} />
      </Icosahedron>
    </group>
  );
}

/**
 * Deterministic node cloud — a golden-angle spiral, so there is no RNG and no
 * server/client hydration mismatch.
 */
function NodeCloud({ pointer }: { pointer: Pointer }) {
  const cloud = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 260;
    const array = new Float32Array(count * 3);
    const golden = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < count; i += 1) {
      const t = (i + 0.5) / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = golden * i;
      const radius = 2.1 + ((i % 7) / 7) * 1.4;
      array[i * 3] = radius * Math.sin(inclination) * Math.cos(azimuth);
      array[i * 3 + 1] = radius * Math.sin(inclination) * Math.sin(azimuth);
      array[i * 3 + 2] = radius * Math.cos(inclination);
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    const node = cloud.current;
    if (!node) return;
    const p = pointer.current;
    node.rotation.y -= delta * 0.05;
    node.position.x = THREE.MathUtils.damp(node.position.x, (p?.x ?? 0) * 0.28, 1.6, delta);
    node.position.y = THREE.MathUtils.damp(node.position.y, (p?.y ?? 0) * 0.22, 1.6, delta);
  });

  return (
    <Points ref={cloud} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#7dd3fc"
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

/** Camera parallax. The frameloop is already frozen off-screen, so this is free. */
function CameraRig({ pointer }: { pointer: Pointer }) {
  useFrame((state, delta) => {
    const p = pointer.current;
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      (p?.x ?? 0) * 0.45,
      1.4,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      (p?.y ?? 0) * 0.32,
      1.4,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  // Rendering only runs while the hero is on screen AND the tab is visible.
  const active = useActiveWhenVisible(wrapper);

  return (
    <div
      ref={wrapper}
      className="absolute inset-0"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1),
          y: clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1),
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <WireShell pointer={pointer} />
          <NodeCloud pointer={pointer} />
          <CameraRig pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
