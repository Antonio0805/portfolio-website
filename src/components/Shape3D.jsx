import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Faceted "data crystal": a glassy core, a wireframe shell, orbit rings and a
// particle field. Follows the pointer and reacts to the `progress` motion value
// (0 → 1 while the hero scrolls out).
export default function Shape3D({ progress }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.className = "shapeCanvas";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 8.6);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.25, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f766e,
      metalness: 0.55,
      roughness: 0.28,
      clearcoat: 0.6,
      clearcoatRoughness: 0.35,
      iridescence: 0.7,
      iridescenceIOR: 1.6,
      flatShading: true,
      emissive: 0x052e2b,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const shellGeometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.75, 1));
    const shellMaterial = new THREE.LineBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.35 });
    const shell = new THREE.LineSegments(shellGeometry, shellMaterial);
    group.add(shell);

    const ringGeometry = new THREE.TorusGeometry(2.25, 0.008, 8, 200);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.55 });
    const ringA = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringB = new THREE.Mesh(ringGeometry, ringMaterial);
    ringA.rotation.set(1.2, 0.2, 0);
    ringB.rotation.set(-0.5, 0.9, 0.4);
    group.add(ringA, ringB);

    const satelliteGeometry = new THREE.OctahedronGeometry(0.09, 0);
    const satelliteMaterial = new THREE.MeshStandardMaterial({ color: 0x5eead4, emissive: 0x14b8a6, emissiveIntensity: 0.8 });
    const satellites = [0, 1, 2].map(() => {
      const mesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      group.add(mesh);
      return mesh;
    });

    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x99f6e4,
      size: 0.022,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const tealLight = new THREE.PointLight(0x2dd4bf, 40, 20);
    const blueLight = new THREE.PointLight(0x3b82f6, 40, 20);
    scene.add(tealLight, blueLight);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) {
        return;
      }
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const clock = new THREE.Clock();
    const renderFrame = () => {
      const t = reduceMotion ? 0 : clock.getElapsedTime();
      const p = progress?.get() ?? 0;

      group.rotation.x += (pointer.y * 0.35 + p * 0.8 - group.rotation.x) * 0.05;
      group.rotation.y += (pointer.x * 0.5 - group.rotation.y) * 0.05;
      group.scale.setScalar(1 - p * 0.3);

      core.rotation.set(t * 0.18, t * 0.26 + p * 3, 0);
      core.scale.setScalar(1 + Math.sin(t * 1.4) * 0.025);
      shell.rotation.set(-t * 0.08, -t * 0.12 - p * 2, t * 0.05);
      ringA.rotation.z = t * 0.2;
      ringB.rotation.z = -t * 0.15;
      particles.rotation.y = t * 0.03 + p * 0.6;

      satellites.forEach((satellite, index) => {
        const angle = t * (0.5 + index * 0.18) + (index * Math.PI * 2) / 3;
        satellite.position.set(Math.cos(angle) * 2.25, Math.sin(angle * 1.3) * 0.8, Math.sin(angle) * 2.25);
        satellite.rotation.set(t, t * 1.3, 0);
      });

      tealLight.position.set(Math.cos(t * 0.6) * 4, 2, Math.sin(t * 0.6) * 4);
      blueLight.position.set(Math.cos(t * 0.6 + Math.PI) * 4, -2, Math.sin(t * 0.6 + Math.PI) * 4);

      renderer.render(scene, camera);
    };

    let visible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(mount);

    if (reduceMotion) {
      renderFrame();
    } else {
      renderer.setAnimationLoop(() => {
        if (visible) {
          renderFrame();
        }
      });
    }

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      [coreGeometry, shellGeometry, ringGeometry, satelliteGeometry, particleGeometry].forEach((g) => g.dispose());
      [coreMaterial, shellMaterial, ringMaterial, satelliteMaterial, particleMaterial].forEach((m) => m.dispose());
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress]);

  return <div className="shapeMount" ref={mountRef} aria-hidden="true" />;
}
