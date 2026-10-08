"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js";

export default function Scene() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const W = () => el.clientWidth, H = () => el.clientHeight;
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.setSize(W(), H());
    el.appendChild(r.domElement);
    const s = new THREE.Scene();
    const c = new THREE.PerspectiveCamera(40, W() / H(), 0.1, 100);
    c.position.z = 10;
    s.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(4, 6, 6); s.add(key);
    const rim = new THREE.PointLight(0x5fd6df, 24, 30); rim.position.set(-5, -2, 3); s.add(rim);
    const fill = new THREE.DirectionalLight(0xffe9cc, 0.8); fill.position.set(-4, 1, 5); s.add(fill);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xf4f0e8,
      roughness: 0.23,
      clearcoat: 0.42,
      clearcoatRoughness: 0.18,
      sheen: 0.35,
      sheenColor: new THREE.Color(0xfff7e9),
    });

    const tooth = new THREE.Group();
    const toothMesh = new MarchingCubes(64, mat, false, false, 40000);
    const toothScale = 1.8;
    toothMesh.scale.setScalar(toothScale);
    toothMesh.position.y = -0.35;
    toothMesh.isolation = 80;
    toothMesh.reset();
    const addToothBall = (x, y, z, ballRadius) => {
      const sign = Math.sign(ballRadius);
      const radius = Math.abs(ballRadius);
      const normalizedRadius = radius / (2 * toothScale);
      const strength = (toothMesh.isolation + 12) * normalizedRadius ** 2;
      toothMesh.addBall(
        (x / toothScale + 1) / 2,
        ((y - toothMesh.position.y) / toothScale + 1) / 2,
        (z / toothScale + 1) / 2,
        strength * sign,
        12
      );
    };

    addToothBall(0, 0.18, 0, 0.38);
    [
      [-0.43, 0.2, -0.31, 0.5],
      [0.43, 0.2, -0.31, 0.49],
      [-0.43, 0.2, 0.31, 0.48],
      [0.43, 0.2, 0.31, 0.5],
    ].forEach(([x, y, z, radius]) => addToothBall(x, y, z, radius));
    [
      [-0.4, 0.72, -0.29, 0.27],
      [0.4, 0.72, -0.29, 0.27],
      [-0.4, 0.72, 0.29, 0.27],
      [0.4, 0.72, 0.29, 0.28],
    ].forEach(([x, y, z, radius]) => addToothBall(x, y, z, radius));
    addToothBall(0, 0.78, 0, -0.055);
    addToothBall(0, -0.2, 0, 0.42);

    [
      { start: [-0.28, -0.1], end: [-0.56, -0.17], length: 1.75, radius: 0.24 },
      { start: [0.28, -0.1], end: [0.56, -0.17], length: 1.82, radius: 0.25 },
      { start: [0, 0.32], end: [0.02, 0.48], length: 1.65, radius: 0.22 },
    ].forEach(({ start, end, length, radius }) => {
      Array.from({ length: 15 }, (_, index) => index / 14).forEach((t) => {
        const taper = Math.pow(1 - t, 0.48);
        addToothBall(
          THREE.MathUtils.lerp(start[0], end[0], t),
          -0.32 - length * t,
          THREE.MathUtils.lerp(start[1], end[1], t),
          Math.max(radius * taper, 0.08)
        );
      });
    });

    toothMesh.update();
    tooth.add(toothMesh);
    s.add(tooth);

    const N = 240, pos = new Float32Array(N * 3).map(() => (Math.random() - 0.5) * 18);
    const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x5fd6df, size: 0.07, transparent: true, opacity: 0.8 }));
    s.add(pts);

    const place = () => { const wide = W() > 800; tooth.position.x = wide ? 3 : 0; tooth.position.y = wide ? 0 : -2.2; tooth.scale.setScalar(wide ? 1 : 0.7); };
    place();
    const m = { x: 0, y: 0 };
    const move = (e) => { m.x = e.clientX / innerWidth - 0.5; m.y = e.clientY / innerHeight - 0.5; };
    const resize = () => { r.setSize(W(), H()); c.aspect = W() / H(); c.updateProjectionMatrix(); place(); };
    addEventListener("pointermove", move); addEventListener("resize", resize);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!still) t += 0.01;
      const sc = Math.min(scrollY / innerHeight, 1.5);
      tooth.rotation.y += (t * 0.6 + m.x * 1.2 + sc * 2 - tooth.rotation.y) * 0.05;
      tooth.rotation.x += (m.y * 0.5 + sc * 0.6 - tooth.rotation.x) * 0.05;
      toothMesh.position.y = -0.35 + Math.sin(t * 2) * 0.06;
      pts.rotation.y = t * 0.05 + sc * 0.4;
      r.render(s, c);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("resize", resize);
      toothMesh.geometry.dispose();
      pg.dispose();
      pts.material.dispose();
      mat.dispose();
      r.dispose();
      el.removeChild(r.domElement);
    };
  }, []);
  return <div ref={ref} className="scene" aria-hidden="true" />;
}
