import { useEffect, useRef } from "react";
import * as THREE from "three";

// One field of points that assembles from noise into structure as the page is
// scrolled: a loose cloud, a warehouse lattice, a bar chart, code brackets, a
// neural network and finally the "AS" monogram. `morph` is a motion value that
// runs 0 → 5 through those shapes; the pointer pushes points aside.

const TAU = Math.PI * 2;

function cloud(count, random) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const radius = 1.3 + Math.pow(random(), 0.55) * 2.4;
    const theta = random() * TAU;
    const phi = Math.acos(2 * random() - 1);
    out[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * 1.25;
    out[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
    out[i * 3 + 2] = radius * Math.cos(phi);
  }
  return out;
}

function lattice(count, random) {
  const out = new Float32Array(count * 3);
  const divisions = 4;
  const size = 3;
  const level = () => (Math.floor(random() * (divisions + 1)) / divisions - 0.5) * size;
  for (let i = 0; i < count; i += 1) {
    const point = [level(), level(), level()];
    if (random() < 0.82) {
      point[Math.floor(random() * 3)] = (random() - 0.5) * size;
    } else {
      point[0] += (random() - 0.5) * 0.08;
      point[1] += (random() - 0.5) * 0.08;
      point[2] += (random() - 0.5) * 0.08;
    }
    out.set(point, i * 3);
  }
  return out;
}

function bars(count, random) {
  const out = new Float32Array(count * 3);
  const heights = [0.9, 1.5, 1.2, 2.1, 1.8, 2.7, 3.3];
  const base = -1.65;
  const width = 0.42;
  const step = 0.68;
  const left = -((heights.length - 1) * step) / 2;
  for (let i = 0; i < count; i += 1) {
    const bar = Math.floor(random() * heights.length);
    const cx = left + bar * step;
    const height = heights[bar];
    if (random() < 0.12) {
      // The trend line drawn over the bar tops.
      const t = random() * (heights.length - 1);
      const a = Math.floor(t);
      const f = t - a;
      const b = Math.min(a + 1, heights.length - 1);
      out[i * 3] = left + t * step;
      out[i * 3 + 1] = base + heights[a] * (1 - f) + heights[b] * f + 0.38;
      out[i * 3 + 2] = (random() - 0.5) * 0.04;
      continue;
    }
    // A point on one face of the bar.
    const face = Math.floor(random() * 6);
    const u = random() - 0.5;
    const v = random();
    let x = cx + u * width;
    let y = base + v * height;
    let z = (random() - 0.5) * width;
    if (face === 0) x = cx - width / 2;
    if (face === 1) x = cx + width / 2;
    if (face === 2) z = -width / 2;
    if (face === 3) z = width / 2;
    if (face >= 4) y = base + height;
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

function network(count, random) {
  const out = new Float32Array(count * 3);
  const layers = [4, 7, 7, 3];
  const nodes = layers.map((size, layer) =>
    Array.from({ length: size }, (_, index) => [
      (layer / (layers.length - 1) - 0.5) * 4.4,
      ((index + 0.5) / size - 0.5) * 3.4,
      Math.sin(index * 1.7 + layer) * 0.6,
    ])
  );
  for (let i = 0; i < count; i += 1) {
    if (random() < 0.3) {
      const layer = nodes[Math.floor(random() * nodes.length)];
      const node = layer[Math.floor(random() * layer.length)];
      const r = Math.pow(random(), 2) * 0.16;
      const theta = random() * TAU;
      const phi = Math.acos(2 * random() - 1);
      out[i * 3] = node[0] + r * Math.sin(phi) * Math.cos(theta);
      out[i * 3 + 1] = node[1] + r * Math.sin(phi) * Math.sin(theta);
      out[i * 3 + 2] = node[2] + r * Math.cos(phi);
    } else {
      const layer = Math.floor(random() * (nodes.length - 1));
      const a = nodes[layer][Math.floor(random() * nodes[layer].length)];
      const b = nodes[layer + 1][Math.floor(random() * nodes[layer + 1].length)];
      const t = random();
      out[i * 3] = a[0] + (b[0] - a[0]) * t;
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t;
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t;
    }
  }
  return out;
}

function glyphs(text, count, random, width) {
  const out = new Float32Array(count * 3);
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 320;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const family = document.fonts?.check?.("800 200px 'Bricolage Grotesque'")
    ? "'Bricolage Grotesque', sans-serif"
    : "sans-serif";
  context.fillStyle = "#fff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `800 230px ${family}`;
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 10);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

  const filled = [];
  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      if (data[(y * canvas.width + x) * 4 + 3] > 128) {
        filled.push(x, y);
      }
    }
  }

  const pixels = filled.length / 2;
  const scale = width / canvas.width;
  for (let i = 0; i < count; i += 1) {
    const pick = pixels ? Math.floor(random() * pixels) * 2 : 0;
    out[i * 3] = ((filled[pick] ?? canvas.width / 2) + random() * 2 - canvas.width / 2) * scale;
    out[i * 3 + 1] = -((filled[pick + 1] ?? canvas.height / 2) + random() * 2 - canvas.height / 2) * scale;
    out[i * 3 + 2] = (random() - 0.5) * 0.35;
  }
  return out;
}

// Deterministic, so the field looks the same on every visit.
function seeded(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAspect;
  uniform float uPointerForce;
  uniform vec2 uPointer;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute vec3 aShape4;
  attribute vec3 aShape5;
  attribute float aRand;
  varying float vHeat;
  varying float vTint;

  float stage(float k) {
    float t = clamp((uMorph - k) * 1.4 - aRand * 0.4, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  void main() {
    vec3 p = position;
    p = mix(p, aShape1, stage(0.0));
    p = mix(p, aShape2, stage(1.0));
    p = mix(p, aShape3, stage(2.0));
    p = mix(p, aShape4, stage(3.0));
    p = mix(p, aShape5, stage(4.0));

    float loose = 1.0 - clamp(uMorph, 0.0, 1.0);
    float transit = sin(3.14159 * fract(uMorph));
    float amp = 0.2 * loose + 0.07 * transit + 0.012;
    p += vec3(
      sin(uTime * 0.6 + aRand * 40.0 + p.y * 1.3),
      cos(uTime * 0.5 + aRand * 25.0 + p.z * 1.1),
      sin(uTime * 0.4 + aRand * 12.0 + p.x)
    ) * amp;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 d = clip.xy / clip.w - uPointer;
    d.x *= uAspect;
    float force = (1.0 - smoothstep(0.0, 0.3, length(d))) * uPointerForce;
    mv.xy += normalize(d + 0.0001) * force * 0.5;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.5 + aRand) * (1.0 + force) / -mv.z;
    vHeat = force;
    vTint = step(0.62, aRand) * clamp(uMorph, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uTintColor;
  uniform vec3 uHeatColor;
  uniform float uOpacity;
  varying float vHeat;
  varying float vTint;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, r);
    vec3 color = mix(uColor, uTintColor, vTint);
    color = mix(color, uHeatColor, clamp(vHeat * 1.8, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`;

export default function ParticleField({ morph, onFail }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      onFail?.();
      return undefined;
    }

    const narrow = window.innerWidth < 768;
    const count = narrow ? 5200 : 10000;
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.domElement.className = "fieldCanvas";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const random = seeded(20260806);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(cloud(count, random), 3));
    geometry.setAttribute("aShape1", new THREE.BufferAttribute(lattice(count, random), 3));
    geometry.setAttribute("aShape2", new THREE.BufferAttribute(bars(count, random), 3));
    geometry.setAttribute("aShape3", new THREE.BufferAttribute(glyphs("</>", count, random, 6.4), 3));
    geometry.setAttribute("aShape4", new THREE.BufferAttribute(network(count, random), 3));
    geometry.setAttribute("aShape5", new THREE.BufferAttribute(glyphs("AS", count, random, 6.2), 3));
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      seeds[i] = random();
    }
    geometry.setAttribute("aRand", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uSize: { value: narrow ? 46 : 40 },
        uPixelRatio: { value: pixelRatio },
        uAspect: { value: 1 },
        uPointer: { value: new THREE.Vector2(9, 9) },
        uPointerForce: { value: 0 },
        uColor: { value: new THREE.Color("#e9e8e3") },
        uTintColor: { value: new THREE.Color("#3fc4b4") },
        uHeatColor: { value: new THREE.Color("#c8f560") },
        uOpacity: { value: narrow ? 0.5 : 0.62 },
      },
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) {
        return;
      }
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      material.uniforms.uAspect.value = camera.aspect;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const pointer = { x: 9, y: 9, force: 0, active: false };
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerLeave);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    const smoothPointer = new THREE.Vector2(9, 9);
    const clock = new THREE.Clock();
    const bump = (m, k) => Math.max(0, 1 - Math.abs(m - k));

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      const m = morph?.get() ?? 0;
      const uniforms = material.uniforms;

      uniforms.uTime.value = t;
      uniforms.uMorph.value = m;

      if (pointer.active) {
        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.18;
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.18;
      }
      pointer.force += ((pointer.active ? 1 : 0) - pointer.force) * 0.06;
      uniforms.uPointer.value.copy(smoothPointer);
      uniforms.uPointerForce.value = pointer.force;

      // Letters face the camera; the lattice, chart and network turn to show depth.
      const facing = Math.max(bump(m, 3), bump(m, 5));
      const wide = camera.aspect > 1.1;
      const swing = Math.sin(t * 0.3) * 0.7;
      const tiltX = pointer.active ? smoothPointer.y * -0.15 : 0;
      const tiltY = pointer.active ? smoothPointer.x * 0.25 : 0;
      group.rotation.y += (swing * (1 - facing) + tiltY - group.rotation.y) * 0.05;
      group.rotation.x += (0.18 * (1 - facing) + tiltX - group.rotation.x) * 0.05;

      const targetX = wide ? (m > 4.4 ? 0 : 2.1) : 0;
      const targetY = wide ? 0 : 1.2;
      const targetScale = wide ? 1 : 0.62;
      group.position.x += (targetX - group.position.x) * 0.06;
      group.position.y += (targetY - group.position.y) * 0.06;
      group.scale.setScalar(group.scale.x + (targetScale - group.scale.x) * 0.06);

      renderer.render(scene, camera);
    };

    let visible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(mount);

    renderer.setAnimationLoop(() => {
      if (visible && document.visibilityState === "visible") {
        renderFrame();
      }
    });

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerLeave);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [morph, onFail]);

  return <div className="fieldMount" ref={mountRef} aria-hidden="true" />;
}
