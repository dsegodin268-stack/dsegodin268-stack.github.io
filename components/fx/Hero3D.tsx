"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json";

/* Порт hero3d.js з handoff-бандла: 3D-версія фірмового лок-апу —
   знак (стенсильна «S» у шестиграннику) зліва, праворуч текстовий блок
   SASS / ENGINEERING / тегляйн; довкола — світні орбіти й частинки. */

const CYAN = 0x4fc1f0;
const CYAN_D = 0x1e9ad6;
const STEEL = 0x9fb8cd;
const ORANGE = 0xf08c4f;
const NAVY = 0x3d82c4;

function buildLogo() {
  const g = new THREE.Group();
  const font = new FontLoader().parse(helvetikerBold);
  // лок-ап (знак + текст) збирається в окремій групі й центрується цілком
  const lockup = new THREE.Group();

  // --- знак зліва: стенсильна «S» у шестиграннику (як у лок-апі) ---
  const mark = new THREE.Group();
  const pts: Array<[number, number]> = [
    [0, 0], [8, 0], [8, 7], [3, 7], [3, 9], [8, 9],
    [8, 12], [0, 12], [0, 5], [5, 5], [5, 3], [0, 3],
  ];
  const shape = new THREE.Shape();
  pts.forEach((p, i) =>
    i ? shape.lineTo(p[0] - 4, p[1] - 6) : shape.moveTo(p[0] - 4, p[1] - 6)
  );
  const sGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 2.4,
    bevelEnabled: true,
    bevelThickness: 0.28,
    bevelSize: 0.24,
    bevelSegments: 3,
  });
  sGeo.center();
  const letter = new THREE.Mesh(
    sGeo,
    new THREE.MeshStandardMaterial({
      color: CYAN_D,
      emissive: CYAN_D,
      emissiveIntensity: 0.5,
      roughness: 0.28,
      metalness: 0.65,
    })
  );
  letter.scale.setScalar(0.66);
  mark.add(letter);

  const hex = new THREE.Mesh(
    new THREE.TorusGeometry(7.6, 0.34, 16, 6),
    new THREE.MeshStandardMaterial({
      color: CYAN_D,
      emissive: CYAN_D,
      emissiveIntensity: 0.25,
      roughness: 0.3,
      metalness: 0.85,
    })
  );
  hex.rotation.z = Math.PI / 6;
  mark.add(hex);
  mark.scale.setScalar(0.55);
  mark.position.set(-7.6, 1.1, 0);
  lockup.add(mark);

  // --- текстовий блок праворуч: SASS / ENGINEERING / тегляйн ---
  const leftAlign = (geo: TextGeometry) => {
    geo.computeBoundingBox();
    const bb = geo.boundingBox!;
    geo.translate(-bb.min.x, 0, -(bb.min.z + bb.max.z) / 2);
    return geo;
  };
  const textX = -3.4;

  const sass = new THREE.Mesh(
    leftAlign(
      new TextGeometry("SASS", {
        font,
        size: 2.7,
        depth: 1.2,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.18,
        bevelSize: 0.1,
        bevelSegments: 3,
      })
    ),
    new THREE.MeshStandardMaterial({
      color: NAVY,
      emissive: 0x1b4e8e,
      emissiveIntensity: 0.4,
      roughness: 0.35,
      metalness: 0.6,
    })
  );
  sass.position.set(textX, 1.15, 0);
  lockup.add(sass);

  // ENGINEERING — політерно, з широким трекінгом як у лок-апі
  const engMat = new THREE.MeshStandardMaterial({
    color: CYAN,
    emissive: CYAN,
    emissiveIntensity: 0.55,
    roughness: 0.3,
    metalness: 0.5,
  });
  const eng = new THREE.Group();
  let cx = 0;
  for (const ch of "ENGINEERING") {
    const cg = new TextGeometry(ch, {
      font,
      size: 0.78,
      depth: 0.4,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
      bevelSegments: 2,
    });
    cg.computeBoundingBox();
    const bb = cg.boundingBox!;
    cg.translate(-bb.min.x + cx, 0, -(bb.min.z + bb.max.z) / 2);
    eng.add(new THREE.Mesh(cg, engMat));
    cx += bb.max.x - bb.min.x + 0.17;
  }
  eng.position.set(textX, -0.55, 0);
  lockup.add(eng);

  // тегляйн; роздільник «·» — з фолбеком на «-», якщо гліфа немає в шрифті
  const glyphs = (helvetikerBold as unknown as { glyphs: Record<string, unknown> })
    .glyphs;
  const sep = glyphs["·"] ? "·" : "-";
  const tag = new THREE.Mesh(
    leftAlign(
      new TextGeometry(`DESIGN ${sep} ELECTRICAL INSTALLATION ${sep} PROJECTS`, {
        font,
        size: 0.34,
        depth: 0.1,
        curveSegments: 6,
        bevelEnabled: false,
      })
    ),
    new THREE.MeshStandardMaterial({
      color: STEEL,
      emissive: STEEL,
      emissiveIntensity: 0.15,
      roughness: 0.5,
      metalness: 0.3,
    })
  );
  tag.position.set(textX, -1.6, 0);
  lockup.add(tag);

  // центруємо лок-ап відносно осі обертання сцени
  const box = new THREE.Box3().setFromObject(lockup);
  const center = box.getCenter(new THREE.Vector3());
  lockup.position.set(-center.x, -center.y, 0);
  g.add(lockup);

  const ringMat = new THREE.MeshStandardMaterial({
    color: CYAN,
    emissive: CYAN,
    emissiveIntensity: 1,
    roughness: 0.4,
    metalness: 0.2,
    transparent: true,
    opacity: 0.85,
  });
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(9.6, 0.07, 10, 96), ringMat);
  r1.rotation.x = Math.PI / 2.35;
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(10.7, 0.055, 10, 96), ringMat);
  r2.rotation.x = -Math.PI / 2.6;
  r2.rotation.y = 0.6;
  g.add(r1, r2);

  const eMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: CYAN,
    emissiveIntensity: 2.4,
    roughness: 0.2,
    metalness: 0,
  });
  const e1 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), eMat);
  const e2 = e1.clone();
  const e3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 20, 20),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: ORANGE,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    })
  );
  g.add(e1, e2, e3);

  const N = 320;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 11 + Math.random() * 9;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(p) * Math.cos(t);
    pos[i * 3 + 1] = r * Math.cos(p) * 0.7;
    pos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      color: CYAN,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  g.add(particles);
  return { g, letter, hex, r1, r2, e1, e2, e3, particles };
}

export default function Hero3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    cam.position.set(0, 1.5, 30);
    scene.add(new THREE.AmbientLight(0x24384d, 1.6));
    const key = new THREE.PointLight(CYAN, 900, 0, 2);
    key.position.set(14, 12, 16);
    scene.add(key);
    const rim = new THREE.PointLight(ORANGE, 300, 0, 2);
    rim.position.set(-16, -8, 10);
    scene.add(rim);

    const parts = buildLogo();
    scene.add(parts.g);

    let tX = 0;
    let tY = 0;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tY = (e.clientX / innerWidth - 0.5) * 0.9;
      tX = (e.clientY / innerHeight - 0.5) * 0.55;
    };
    if (!reduced) addEventListener("pointermove", onMove, { passive: true });

    const size = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(() => {
      size();
      if (reduced) renderer.render(scene, cam);
    });
    ro.observe(el);

    const clock = new THREE.Clock();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = clock.getElapsedTime();
      parts.g.rotation.y +=
        (t * 0.001 + tY * 0.9 - parts.g.rotation.y) * 0.06 + 0.004;
      parts.g.rotation.x += (tX * 0.6 - parts.g.rotation.x) * 0.06;
      parts.letter.position.y = Math.sin(t * 1.4) * 0.45;
      parts.letter.rotation.y = Math.sin(t * 0.7) * 0.22;
      parts.hex.rotation.z = Math.PI / 6 + t * 0.12;
      parts.r1.rotation.z = t * 0.5;
      parts.r2.rotation.z = -t * 0.38;
      const a = t * 1.1;
      parts.e1.position.set(
        Math.cos(a) * 9.6,
        Math.sin(a) * 9.6 * Math.cos(Math.PI / 2.35),
        Math.sin(a) * 9.6 * Math.sin(Math.PI / 2.35)
      );
      parts.e2.position.set(
        Math.cos(-a + 2) * 10.7 * Math.cos(0.6),
        Math.sin(-a + 2) * 10.7 * Math.cos(Math.PI / 2.6),
        Math.cos(-a + 2) * 10.7 * Math.sin(0.6) * 0.4 + Math.sin(-a + 2) * 3
      );
      parts.e3.position.set(
        Math.cos(a * 0.7 + 4) * 8.4,
        Math.sin(a * 1.3) * 2.2,
        Math.sin(a * 0.7 + 4) * 8.4
      );
      parts.particles.rotation.y = t * 0.05;
      renderer.render(scene, cam);
    };

    if (reduced) {
      // статичний кадр без анімаційного циклу
      renderer.render(scene, cam);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("pointermove", onMove);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="relative aspect-[4/3]"
      data-no-tilt
    />
  );
}
