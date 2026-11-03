"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Avatar3DSceneProps {
  className?: string;
}

export const Avatar3DScene: React.FC<Avatar3DSceneProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    let animationFrameId: number | undefined;
    let isVisible = false;
    let renderer: THREE.WebGLRenderer;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 2. Texture Loader with Error Handling
    const textureLoader = new THREE.TextureLoader();
    let avatarMesh: THREE.Mesh | null = null;
    let particlesMesh: THREE.Points | null = null;
    let glowMesh: THREE.Mesh | null = null;

    // Create a particle texture programmatically
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(56, 189, 248, 1)");
        gradient.addColorStop(0.3, "rgba(37, 99, 235, 0.7)");
        gradient.addColorStop(0.7, "rgba(37, 99, 235, 0.2)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    // Create background radial glow texture programmatically
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, "rgba(37, 99, 235, 0.45)");
        gradient.addColorStop(0.4, "rgba(56, 189, 248, 0.2)");
        gradient.addColorStop(0.75, "rgba(5, 8, 23, 0.05)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // 3. Volumetric Blue Glow Plane Behind Avatar
    const glowTexture = createGlowTexture();
    const glowGeo = new THREE.PlaneGeometry(3.8, 3.8);
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.set(0, 0.2, -0.6);
    avatarGroup.add(glowMesh);

    // 4. Elegant 3D Ambient Dust / Bokeh Particles
    const particleCount = 42;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particlePhases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 3.6; // X
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.2; // Y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5 - 0.2; // Z (-1.45 to +1.05)
      particleSpeeds[i] = 0.25 + Math.random() * 0.45;
      particlePhases[i] = Math.random() * Math.PI * 2;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleTexture = createParticleTexture();
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // 5. Load Avatar Texture & Depth Map for 3D Volumetric Mesh
    let shaderMaterial: THREE.ShaderMaterial | null = null;

    textureLoader.load("/saimon-portrait.png", (portraitTex) => {
      portraitTex.generateMipmaps = true;
      portraitTex.minFilter = THREE.LinearMipmapLinearFilter;
      portraitTex.magFilter = THREE.LinearFilter;

      textureLoader.load("/saimon-depth.png", (depthTex) => {
        depthTex.generateMipmaps = true;
        depthTex.minFilter = THREE.LinearMipmapLinearFilter;
        depthTex.magFilter = THREE.LinearFilter;

        // Custom Shader Material for Depth Parallax & Vertex Displacement
        shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: portraitTex },
            uDepthMap: { value: depthTex },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uTime: { value: 0 },
            uHover: { value: 0 },
            uResolution: { value: new THREE.Vector2(876, 1024) },
          },
          vertexShader: `
            uniform sampler2D uDepthMap;
            uniform float uTime;
            uniform float uHover;
            varying vec2 vUv;
            varying float vDepth;

            void main() {
              vUv = uv;
              float depth = texture2D(uDepthMap, uv).r;
              vDepth = depth;

              vec3 pos = position;

              // Genuine 3D surface displacement along Z
              pos.z += depth * 0.32;

              // Natural subtle breathing motion (expanding chest & float)
              float breath = sin(uTime * 1.5) * 0.012 * depth;
              pos.y += breath;
              pos.z += sin(uTime * 1.5 + 0.5) * 0.015 * depth;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform sampler2D uDepthMap;
            uniform vec2 uMouse;
            uniform float uTime;
            uniform float uHover;
            uniform vec2 uResolution;
            varying vec2 vUv;
            varying float vDepth;

            void main() {
              // Sample depth at base UV
              float depth = texture2D(uDepthMap, vUv).r;

              // Dynamic 3D depth parallax offset: front features shift more than torso/bg
              vec2 parallax = uMouse * (depth - 0.42) * 0.040 * (1.0 + uHover * 0.28);

              // Subtle breathing displacement
              float breath = sin(uTime * 1.5) * 0.003 * depth;

              vec2 uv = vUv + parallax;
              uv.y += breath;
              uv = clamp(uv, vec2(0.001), vec2(0.999));

              // Sample base color
              vec4 color = texture2D(uTexture, uv);

              // Resample depth at displaced UV for lighting
              float dispDepth = texture2D(uDepthMap, uv).r;

              // Approximate normals from depth map gradients for dynamic electric blue rim lighting
              vec2 texel = 1.0 / uResolution;
              float dRight = texture2D(uDepthMap, uv + vec2(texel.x * 2.5, 0.0)).r;
              float dLeft  = texture2D(uDepthMap, uv - vec2(texel.x * 2.5, 0.0)).r;
              float dUp    = texture2D(uDepthMap, uv + vec2(0.0, texel.y * 2.5)).r;
              float dDown  = texture2D(uDepthMap, uv - vec2(0.0, texel.y * 2.5)).r;

              vec3 normal = normalize(vec3((dLeft - dRight) * 3.2, (dDown - dUp) * 3.2, 1.0));

              // Dynamic electric blue rim light
              vec3 lightDir = normalize(vec3(0.5 + uMouse.x * 0.6, 0.7 + uMouse.y * 0.4, 0.85));
              float rim = 1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0);
              rim = smoothstep(0.42, 0.90, rim) * dispDepth;

              vec3 rimColor = vec3(0.18, 0.58, 1.0) * pow(rim, 1.6) * 0.85;

              // Specular glint along sunglasses frame & hair volume
              float spec = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 14.0);
              vec3 specColor = vec3(0.35, 0.75, 1.0) * spec * dispDepth * 0.45;

              // Apply cinematic rim & specular only to visible avatar
              color.rgb += (rimColor + specColor) * color.a;

              // Gentle mask at bottom edge feathering into dark navy background
              float bottomFade = smoothstep(0.0, 0.20, uv.y);
              color.a *= bottomFade;

              gl_FragColor = color;
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        });

        // Aspect ratio: 876 / 1024 ~ 0.855
        // Geometry with 80x80 subdivision for fluid vertex depth
        const aspect = 876 / 1024;
        const meshHeight = 3.6;
        const meshWidth = meshHeight * aspect;
        const planeGeo = new THREE.PlaneGeometry(meshWidth, meshHeight, 80, 80);

        avatarMesh = new THREE.Mesh(planeGeo, shaderMaterial);
        avatarMesh.position.set(0, -0.05, 0);
        avatarGroup.add(avatarMesh);

        setIsLoaded(true);
        if (prefersReducedMotion && isVisible) renderer.render(scene, camera);
      });
    });

    // 6. Smooth Mouse & Interactive Physics
    const targetMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let isHovered = false;
    let hoverValue = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1); // -1 to 1

      targetMouse.x = Math.max(-1, Math.min(1, x));
      targetMouse.y = Math.max(-1, Math.min(1, y));
    };

    const handlePointerEnter = () => {
      isHovered = true;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetMouse.x = 0;
      targetMouse.y = 0;
    };

    if (!prefersReducedMotion) {
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerenter", handlePointerEnter);
      container.addEventListener("pointerleave", handlePointerLeave);
    }

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (prefersReducedMotion && isVisible) renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let startTime = 0;

    const animate = () => {
      animationFrameId = undefined;
      if (!isVisible) return;

      const elapsedTime = prefersReducedMotion
        ? 0
        : (performance.now() - startTime) / 1000;

      // Smooth mouse interpolation (Damped Spring / Lerp)
      const lerpSpeed = 0.055;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * lerpSpeed;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * lerpSpeed;

      // Smooth hover interpolation
      hoverValue += ((isHovered ? 1.0 : 0.0) - hoverValue) * 0.07;

      // Update shader uniforms
      if (shaderMaterial) {
        shaderMaterial.uniforms.uTime.value = elapsedTime;
        shaderMaterial.uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);
        shaderMaterial.uniforms.uHover.value = hoverValue;
      }

      // Idle 3D floating & natural movement
      if (!prefersReducedMotion) {
        const floatY = Math.sin(elapsedTime * 1.25) * 0.035;
        const idleRotZ = Math.sin(elapsedTime * 0.85) * 0.008;

        avatarGroup.position.y = floatY;
        avatarGroup.position.x = smoothMouse.x * 0.04;

        // Controlled 3D Tilt (smoothly following cursor with realistic weight)
        avatarGroup.rotation.y = smoothMouse.x * 0.11;
        avatarGroup.rotation.x = -smoothMouse.y * 0.075;
        avatarGroup.rotation.z = idleRotZ - smoothMouse.x * 0.02;

        // Background glow parallax movement
        if (glowMesh) {
          glowMesh.position.x = -smoothMouse.x * 0.14;
          glowMesh.position.y = 0.2 - smoothMouse.y * 0.12;
          glowMesh.scale.setScalar(1.0 + Math.sin(elapsedTime * 1.5) * 0.04 + hoverValue * 0.08);
        }

        // Animate 3D Particles
        if (particlesMesh) {
          const positions = particleGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            // Gentle upward drift with sinusoidal wave
            positions[i * 3 + 1] += particleSpeeds[i] * 0.003;
            positions[i * 3 + 0] += Math.sin(elapsedTime + particlePhases[i]) * 0.0015;

            // Loop back down when reaching top
            if (positions[i * 3 + 1] > 2.2) {
              positions[i * 3 + 1] = -2.2;
              positions[i * 3 + 0] = (Math.random() - 0.5) * 3.6;
            }
          }
          particleGeo.attributes.position.needsUpdate = true;

          // Particle cloud parallax
          particlesMesh.rotation.y = smoothMouse.x * 0.06;
          particlesMesh.rotation.x = -smoothMouse.y * 0.04;
        }
      }

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const startRendering = () => {
      isVisible = true;
      if (prefersReducedMotion) {
        animate();
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

    const visibilityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) startRendering();
          else stopRendering();
        }, { threshold: 0.05 })
      : null;

    if (visibilityObserver) {
      visibilityObserver.observe(container);
    } else {
      startRendering();
    }

    // 9. Comprehensive Resource Disposal on Unmount
    return () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
      visibilityObserver?.disconnect();
      resizeObserver.disconnect();

      if (!prefersReducedMotion) {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerenter", handlePointerEnter);
        container.removeEventListener("pointerleave", handlePointerLeave);
      }

      glowGeo.dispose();
      glowMat.dispose();
      glowTexture.dispose();

      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();

      if (avatarMesh) {
        avatarMesh.geometry.dispose();
      }
      if (shaderMaterial) {
        shaderMaterial.dispose();
      }

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] xs:h-[500px] sm:h-[540px] lg:h-[580px] flex items-center justify-center select-none ${className}`}
      style={{ touchAction: "pan-y" }}
      aria-label="Interactive 3D Avatar for Saimon Rana Magar"
      role="img"
    >
      {/* Fallback Static Image if WebGL is unavailable or while loading */}
      {(!webGLSupported || !isLoaded) && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
          style={{ opacity: isLoaded ? 0 : 1 }}
        >
          <img
            src="/saimon-portrait.png"
            alt="Saimon Rana Magar"
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_35px_rgba(5,8,23,0.7)]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.85) 82%, rgba(0, 0, 0, 0.3) 93%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.85) 82%, rgba(0, 0, 0, 0.3) 93%, transparent 100%)",
            }}
          />
        </div>
      )}
    </div>
  );
};
