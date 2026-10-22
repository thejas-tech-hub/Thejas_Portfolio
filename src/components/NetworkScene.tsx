import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#5fd6e8");
const VIOLET = new THREE.Color("#a98bf0");

function Network({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  const { points, lines, colors } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < count; i++) {
      const r = 2.2 + rand() * 1.6;
      const t = rand() * Math.PI * 2;
      const p = Math.acos(2 * rand() - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(p) * Math.cos(t),
          r * Math.sin(p) * Math.sin(t) * 0.75,
          r * Math.cos(p),
        ),
      );
    }
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    pts.forEach((v, i) => {
      pos.set([v.x, v.y, v.z], i * 3);
      const c = CYAN.clone().lerp(VIOLET, rand() * 0.8);
      col.set([c.r, c.g, c.b], i * 3);
    });
    const seg: number[] = [];
    for (let i = 0; i < count; i++)
      for (let j = i + 1; j < count; j++) {
        const a = pts[i]!,
          b = pts[j]!;
        if (a.distanceTo(b) < 1.15) seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    return { points: pos, lines: new Float32Array(seg), colors: col };
  }, [count]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !animate) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.05;
    const tx = state.pointer.y * 0.15;
    const ty = state.pointer.x * 0.25;
    g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-2 * dt));
    g.position.x += (ty - g.position.x) * (1 - Math.exp(-2 * dt));
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} vertexColors transparent opacity={0.95} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={CYAN} transparent opacity={0.13} />
      </lineSegments>
    </group>
  );
}

export default function NetworkScene({
  mobile,
  reduced,
  visible = true,
}: {
  mobile: boolean;
  reduced: boolean;
  visible?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, mobile ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      frameloop={reduced || !visible ? "demand" : "always"}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <Network count={mobile ? 70 : 150} animate={!reduced && visible} />
    </Canvas>
  );
}
