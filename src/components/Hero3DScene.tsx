"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const Hero3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const isSupported = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
      if (!isSupported) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050817, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. Lighting Setup (Cinematic Navy & Electric Blue Specular)
    const ambientLight = new THREE.AmbientLight(0x0a1128, 1.4);
    scene.add(ambientLight);

    const bluePointLight = new THREE.PointLight(0x2563eb, 4.5, 25);
    bluePointLight.position.set(5, 4, 4);
    scene.add(bluePointLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 2.8, 20);
    cyanPointLight.position.set(-5, -3, 3);
    scene.add(cyanPointLight);

    const directionalKey = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalKey.position.set(0, 6, 6);
    scene.add(directionalKey);

    // 2. Geometry Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Offset position to right side on desktop so headline text on left stays prominent & readable
    const isMobile = window.innerWidth < 768;
    mainGroup.position.set(isMobile ? 0 : 2.2, isMobile ? -0.8 : 0, 0);

    // A. Central Metallic Faceted Polyhedron (AI / Tech Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.65, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.92,
      roughness: 0.18,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // B. Wireframe Outer Resonance Lattice (Optical Aperture / Lens Lattice)
    const wireGeometry = new THREE.IcosahedronGeometry(1.78, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    mainGroup.add(wireMesh);

    // C. Floating Cinematic Orbital Torus Ring (Film Reel & Digital Cycles)
    const ringGeometry = new THREE.TorusGeometry(2.35, 0.04, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x0a2540,
      emissiveIntensity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    mainGroup.add(ringMesh);

    // D. Floating Secondary Geometric Metallic Prisms
    const octaGeometry = new THREE.OctahedronGeometry(0.45, 0);
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.12,
    });

    const sat1 = new THREE.Mesh(octaGeometry, chromeMaterial);
    sat1.position.set(-3.2, 1.8, -1.2);
    mainGroup.add(sat1);

    const sat2 = new THREE.Mesh(octaGeometry, chromeMaterial);
    sat2.position.set(2.8, -2.1, 1.2);
    sat2.scale.set(0.7, 0.7, 0.7);
    mainGroup.add(sat2);

    const smallRingGeo = new THREE.TorusGeometry(0.65, 0.03, 12, 48);
    const satRing = new THREE.Mesh(smallRingGeo, ringMaterial);
    satRing.position.set(-2.5, -1.9, 0.8);
    satRing.rotation.x = Math.PI / 4;
    mainGroup.add(satRing);

    // 3. Subtle Cinematic Particle Cloud (Neural Stardust / Film Beam Motes)
    const particleCount = isMobile ? 80 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Mouse Interaction Coordinates (Smooth Lerping)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
    }

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      const mobileCheck = window.innerWidth < 768;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);

      mainGroup.position.set(mobileCheck ? 0 : 2.2, mobileCheck ? -0.8 : 0, 0);
      if (prefersReducedMotion) renderer.render(scene, camera);
    };

    window.addEventListener("resize", onResize);

    let startTime = 0;
    let isVisible = false;
    let animationFrameId: number | undefined;

    const animate = () => {
      animationFrameId = undefined;
      if (!isVisible || prefersReducedMotion) return;

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous slow rotation
        coreMesh.rotation.y = elapsedTime * 0.15;
        coreMesh.rotation.x = elapsedTime * 0.08;

        wireMesh.rotation.y = -elapsedTime * 0.12;
        wireMesh.rotation.z = elapsedTime * 0.06;

        ringMesh.rotation.z = elapsedTime * 0.2;

        sat1.rotation.y = elapsedTime * 0.4;
        sat1.position.y = 1.8 + Math.sin(elapsedTime * 1.5) * 0.15;

        sat2.rotation.x = elapsedTime * 0.35;
        sat2.position.y = -2.1 + Math.cos(elapsedTime * 1.8) * 0.12;

        satRing.rotation.y = elapsedTime * 0.25;

        // Particle subtle drift
        particlePoints.rotation.y = elapsedTime * 0.02;

        // Interactive mouse parallax on group & camera
        mainGroup.rotation.y = mouse.x * 0.35;
        mainGroup.rotation.x = -mouse.y * 0.25;

        camera.position.x = mouse.x * 0.4;
        camera.position.y = mouse.y * 0.3;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const startRendering = () => {
      isVisible = true;
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      } else if (animationFrameId === undefined) {
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopRendering = () => {
      isVisible = false;
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
      }
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) startRendering();
          else stopRendering();
        }, { threshold: 0.05 })
      : null;

    renderer.render(scene, camera);
    if (observer) {
      observer.observe(container);
    } else {
      startRendering();
    }

    // Cleanup resources on unmount
    return () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
      if (!prefersReducedMotion) window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();

      // Dispose geometries & materials
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      octaGeometry.dispose();
      chromeMaterial.dispose();
      smallRingGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {!webGLSupported && (
        <div className="absolute inset-0 radial-glow-blue opacity-50 blur-3xl pointer-events-none" />
      )}
    </div>
  );
};
