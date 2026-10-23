import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { PROFILE, PORTFOLIO_PILLARS } from '../data/portfolioData';
import {
  createSmartProjectTexture,
  createSmartPortraitTexture,
  createDetailBadgeTexture,
} from './proceduralTextures';

function getStageVisibility(progress, start, end) {
  if (progress <= start || progress >= end) return 0;
  const span = end - start;
  const fade = span * 0.2;
  if (progress < start + fade) {
    return THREE.MathUtils.smoothstep(progress, start, start + fade);
  }
  if (progress > end - fade) {
    return 1 - THREE.MathUtils.smoothstep(progress, end - fade, end);
  }
  return 1;
}

function StageCameraRig({ scrollStateRef, reducedMotion }) {
  const lightRef = useRef();

  useFrame((state, delta) => {
    const p = scrollStateRef.current.progress || 0;
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.45;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.28;

    const targetZ = 10.2 - Math.sin(p * Math.PI * 4) * 0.35;
    const targetX = pointerX;
    const targetY = 0.25 + pointerY;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 5, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 5, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 5, delta);

    state.camera.lookAt(pointerX * 0.2, 0.2 + pointerY * 0.15, 0);

    if (lightRef.current) {
      lightRef.current.position.copy(state.camera.position);
    }
  });

  return <pointLight ref={lightRef} intensity={2.4} distance={26} color="#F3F1EE" />;
}

/**
 * STAGE 01: Opening Portrait Monolith (Scroll 0.00 -> 0.15)
 */
function OpeningPortraitStage({ scrollStateRef, reducedMotion }) {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();

  const portraitTexture = useMemo(
    () => createSmartPortraitTexture(PROFILE.portraitPath),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollStateRef.current.progress || 0;
    const vis = p < 0.16 ? 1 - THREE.MathUtils.smoothstep(p, 0.09, 0.16) : 0;

    groupRef.current.visible = vis > 0.005;
    const s = THREE.MathUtils.lerp(0.55, 1.0, vis);
    groupRef.current.scale.set(s, s, s);
    groupRef.current.position.x = THREE.MathUtils.lerp(3.8, 2.35, vis);
    groupRef.current.position.y = THREE.MathUtils.lerp(1.4, 0.25, vis);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(-0.9, -0.24, vis);

    if (!reducedMotion) {
      const t = state.clock.getElapsedTime();
      if (outerRingRef.current) outerRingRef.current.rotation.z = t * 0.16;
      if (innerRingRef.current) innerRingRef.current.rotation.z = -t * 0.24;
    }
  });

  return (
    <group ref={groupRef} position={[2.35, 0.25, 0]}>
      <mesh position={[0, 0, -0.09]}>
        <boxGeometry args={[2.7, 3.4, 0.12]} />
        <meshStandardMaterial color="#16181C" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.78, 3.48]} />
        <meshBasicMaterial color="#F04444" />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.62, 3.32]} />
        <meshBasicMaterial map={portraitTexture} />
      </mesh>
      <mesh ref={outerRingRef} position={[0, 0, -0.5]}>
        <torusGeometry args={[2.35, 0.016, 16, 100]} />
        <meshBasicMaterial color="#F04444" transparent opacity={0.5} />
      </mesh>
      <mesh ref={innerRingRef} position={[0, 0, -0.8]}>
        <torusGeometry args={[1.95, 0.012, 16, 90]} />
        <meshBasicMaterial color="#F3F1EE" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/**
 * 3D Sculptural Niche Icon that appears in the center of the viewport:
 * - 'reel': 3D Movie Reel & Cinema Lens (Documentary & Storytelling)
 * - 'gaming': 3D Tactical Gyroscope & Energy Core (Gaming & High-Octane)
 * - 'motion': 3D Geodesic Map Globe & Keyframe Orbit (Motion Graphics & VFX)
 * - 'automation': 3D YouTube Play Prism & AI Node Ring (YouTube Automation & AI)
 */
function NicheSculptureIcon({ iconType, reducedMotion }) {
  const iconRef = useRef();

  useFrame((state) => {
    if (reducedMotion || !iconRef.current) return;
    const t = state.clock.getElapsedTime();
    iconRef.current.rotation.y = t * 0.65;
    iconRef.current.rotation.x = Math.sin(t * 0.8) * 0.22;
  });

  if (iconType === 'reel') {
    return (
      <group ref={iconRef}>
        {/* Outer Cinema Film Reel Rim */}
        <mesh>
          <torusGeometry args={[1.15, 0.09, 20, 80]} />
          <meshStandardMaterial
            color="#F04444"
            emissive="#F04444"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Inner Film Hub */}
        <mesh>
          <torusGeometry args={[0.42, 0.06, 16, 48]} />
          <meshStandardMaterial color="#F3F1EE" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Reel Spokes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
            <boxGeometry args={[2.15, 0.07, 0.06]} />
            <meshStandardMaterial color="#F3F1EE" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
      </group>
    );
  }

  if (iconType === 'gaming') {
    return (
      <group ref={iconRef}>
        <mesh>
          <octahedronGeometry args={[0.82, 0]} />
          <meshStandardMaterial
            color="#F04444"
            emissive="#F04444"
            emissiveIntensity={0.55}
            wireframe
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#181A1F" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.25, 0.035, 16, 80]} />
          <meshBasicMaterial color="#F04444" />
        </mesh>
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.25, 0.025, 16, 80]} />
          <meshBasicMaterial color="#F3F1EE" />
        </mesh>
      </group>
    );
  }

  if (iconType === 'motion') {
    return (
      <group ref={iconRef}>
        <mesh>
          <icosahedronGeometry args={[0.98, 1]} />
          <meshStandardMaterial
            color="#F04444"
            emissive="#F04444"
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[1.35, 0.03, 16, 90]} />
          <meshBasicMaterial color="#F3F1EE" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={iconRef}>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.8, 1.3, 3]} />
        <meshStandardMaterial
          color="#F04444"
          emissive="#F04444"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.28, 0.025, 16, 90]} />
        <meshBasicMaterial color="#F3F1EE" transparent opacity={0.7} />
      </mesh>
      {[0, 1, 2, 3].map((n) => {
        const angle = (n * Math.PI) / 2;
        return (
          <mesh key={n} position={[Math.cos(angle) * 1.28, Math.sin(angle) * 1.28, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#F04444" />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * 3D Detail Badge that bursts outward from the central 3D Niche Icon
 */
function EmergingDetailNode({ text, index, targetPos, burstFactorRef }) {
  const meshRef = useRef();
  const texture = useMemo(() => createDetailBadgeTexture(text, index), [text, index]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const b = burstFactorRef.current;

    meshRef.current.position.x = THREE.MathUtils.damp(
      meshRef.current.position.x,
      targetPos[0] * b,
      6,
      delta
    );
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetPos[1] * b,
      6,
      delta
    );
    meshRef.current.position.z = THREE.MathUtils.damp(
      meshRef.current.position.z,
      targetPos[2] * b,
      6,
      delta
    );

    const s = Math.max(0.001, b);
    meshRef.current.scale.setScalar(
      THREE.MathUtils.damp(meshRef.current.scale.x, s, 6, delta)
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1.85, 0.4]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

/**
 * 3D Project Screen that bursts out of the center of the active 3D Niche Icon
 */
function EmergingProjectScreen({ project, burstFactorRef, onSelectProject }) {
  const screenGroupRef = useRef();
  const beamRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => createSmartProjectTexture(project), [project]);

  useFrame((_, delta) => {
    if (!screenGroupRef.current) return;
    const b = burstFactorRef.current;

    const targetX = project.emergeOffset[0] * b;
    const targetY = project.emergeOffset[1] * b;
    const targetZ = project.emergeOffset[2] * b;

    screenGroupRef.current.position.x = THREE.MathUtils.damp(
      screenGroupRef.current.position.x,
      targetX,
      6.5,
      delta
    );
    screenGroupRef.current.position.y = THREE.MathUtils.damp(
      screenGroupRef.current.position.y,
      targetY,
      6.5,
      delta
    );
    screenGroupRef.current.position.z = THREE.MathUtils.damp(
      screenGroupRef.current.position.z,
      targetZ,
      6.5,
      delta
    );

    const hoverBoost = hovered ? 1.07 : 1.0;
    const targetScale = Math.max(0.001, b * hoverBoost);
    screenGroupRef.current.scale.setScalar(
      THREE.MathUtils.damp(screenGroupRef.current.scale.x, targetScale, 6.5, delta)
    );

    screenGroupRef.current.rotation.y = project.emergeRotation[1] * b;

    if (beamRef.current) {
      beamRef.current.scale.x = Math.max(0.001, b);
    }
  });

  const isLeft = project.emergeOffset[0] < 0;

  return (
    <group>
      {/* Glowing Energy Beam connecting the Center 3D Icon to the Emerging Screen */}
      <mesh
        ref={beamRef}
        position={[isLeft ? -1.65 : 1.65, 0.55, 0.1]}
        rotation={[0, 0, isLeft ? 0.25 : -0.25]}
      >
        <boxGeometry args={[3.1, 0.022, 0.022]} />
        <meshBasicMaterial color="#F04444" transparent opacity={0.7} />
      </mesh>

      <group
        ref={screenGroupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(project);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[0, 0, -0.07]}>
          <boxGeometry args={[3.55, 2.05, 0.1]} />
          <meshStandardMaterial color="#181A1F" metalness={0.85} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3.63, 2.13]} />
          <meshBasicMaterial
            color={hovered ? '#F04444' : '#3A3D45'}
            transparent
            opacity={hovered ? 0.98 : 0.65}
          />
        </mesh>

        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.45, 1.95]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Complete Niche Stage:
 * 1. Materializes the 3D Niche Icon at center
 * 2. Bursts the 2 Project Screens + 4 Floating Detail Badges out of the Icon
 * 3. Retracts & dissolves everything cleanly when scrolling to the next Niche
 */
function NicheIconBurstStage({
  pillar,
  scrollStateRef,
  onSelectProject,
  reducedMotion,
}) {
  const stageGroupRef = useRef();
  const iconHolderRef = useRef();
  const burstFactorRef = useRef(0);

  const detailPositions = [
    [-2.4, 1.75, 0.3],
    [2.4, 1.75, 0.3],
    [-2.4, -1.35, 0.3],
    [2.4, -1.35, 0.3],
  ];

  useFrame((_, delta) => {
    if (!stageGroupRef.current || !iconHolderRef.current) return;
    const p = scrollStateRef.current.progress || 0;
    const [start, end] = pillar.range;

    const vis = getStageVisibility(p, start, end);
    stageGroupRef.current.visible = vis > 0.005;

    const localProgress = THREE.MathUtils.clamp((p - start) / (end - start), 0, 1);
    const burst =
      localProgress < 0.16
        ? THREE.MathUtils.smoothstep(localProgress, 0.03, 0.16)
        : localProgress > 0.84
        ? 1 - THREE.MathUtils.smoothstep(localProgress, 0.84, 0.97)
        : 1;

    burstFactorRef.current = burst * vis;

    const iconScale = THREE.MathUtils.lerp(0.01, 0.88, vis);
    iconHolderRef.current.scale.setScalar(
      THREE.MathUtils.damp(iconHolderRef.current.scale.x, iconScale, 7, delta)
    );

    const targetIconY = THREE.MathUtils.lerp(0.2, 1.35, burst);
    iconHolderRef.current.position.y = THREE.MathUtils.damp(
      iconHolderRef.current.position.y,
      targetIconY,
      6,
      delta
    );
  });

  return (
    <group ref={stageGroupRef} position={[0, 0.2, 0]}>
      {/* Central 3D Niche Icon */}
      <group ref={iconHolderRef}>
        <NicheSculptureIcon iconType={pillar.iconType} reducedMotion={reducedMotion} />
      </group>

      {/* 4 Floating Niche Detail Badges Emerging Out of the Icon */}
      {pillar.floatingDetails.map((detailText, i) => (
        <EmergingDetailNode
          key={detailText}
          text={detailText}
          index={i}
          targetPos={detailPositions[i]}
          burstFactorRef={burstFactorRef}
        />
      ))}

      {/* 2 Floating 3D Project Screens Emerging Out of the Icon */}
      {pillar.projects.map((proj) => (
        <EmergingProjectScreen
          key={proj.id}
          project={proj}
          burstFactorRef={burstFactorRef}
          onSelectProject={onSelectProject}
        />
      ))}
    </group>
  );
}

/**
 * STAGE 06: Final Aperture Portal (Scroll 0.88 -> 1.00)
 */
function FinalPortalStage({ scrollStateRef, reducedMotion }) {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollStateRef.current.progress || 0;
    const vis = p > 0.86 ? THREE.MathUtils.smoothstep(p, 0.86, 0.93) : 0;
    groupRef.current.visible = vis > 0.005;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1, vis));

    if (!reducedMotion) {
      const t = state.clock.getElapsedTime();
      if (outerRingRef.current) outerRingRef.current.rotation.z = t * 0.22;
      if (innerRingRef.current) innerRingRef.current.rotation.z = -t * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -1.5]}>
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3.4, 0.04, 24, 120]} />
        <meshBasicMaterial color="#F04444" />
      </mesh>
      <mesh ref={innerRingRef} position={[0, 0, -0.8]}>
        <torusGeometry args={[2.3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#F3F1EE" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function StudioFloor() {
  return (
    <group position={[0, -2.25, 0]}>
      <gridHelper args={[42, 42, '#F04444', '#1A1D22']} />
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.05, 42]} />
        <meshBasicMaterial color="#F04444" />
      </mesh>
    </group>
  );
}

export default function CinemaWorld({
  scrollStateRef,
  onSelectProject,
  reducedMotion,
}) {
  return (
    <>
      <color attach="background" args={['#0B0C0E']} />
      <fogExp2 attach="fog" args={['#0B0C0E', 0.04]} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 6]} intensity={1.6} color="#F3F1EE" />
      <pointLight position={[0, 2.5, 2]} intensity={2.4} distance={20} color="#F04444" />

      <StageCameraRig scrollStateRef={scrollStateRef} reducedMotion={reducedMotion} />

      {!reducedMotion && (
        <Sparkles
          count={320}
          scale={[16, 9, 12]}
          position={[0, 0.5, 0]}
          size={1.5}
          speed={0.25}
          opacity={0.35}
          color="#F04444"
        />
      )}

      <StudioFloor />

      <OpeningPortraitStage
        scrollStateRef={scrollStateRef}
        reducedMotion={reducedMotion}
      />

      {PORTFOLIO_PILLARS.map((pillar) => (
        <NicheIconBurstStage
          key={pillar.id}
          pillar={pillar}
          scrollStateRef={scrollStateRef}
          onSelectProject={onSelectProject}
          reducedMotion={reducedMotion}
        />
      ))}

      <FinalPortalStage
        scrollStateRef={scrollStateRef}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
