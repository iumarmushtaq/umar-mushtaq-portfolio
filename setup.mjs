/**
 * UMAR MUSHTAQ — COMPLETE 15-FILE 3D ICON-BURST PORTFOLIO GENERATOR
 * -----------------------------------------------------------------
 * Save this file as `setup.mjs` inside your `umar-portfolio` folder and run:
 *   node setup.mjs
 *   npm run dev
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const FILES = {
  'package.json': JSON.stringify(
    {
      name: 'umar-mushtaq-3d-portfolio',
      private: true,
      version: '4.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        '@react-three/drei': '^9.117.3',
        '@react-three/fiber': '^8.17.10',
        'framer-motion': '^11.11.17',
        gsap: '^3.12.5',
        'lucide-react': '^0.460.0',
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        three: '^0.169.0',
      },
      devDependencies: {
        '@types/react': '^18.3.12',
        '@types/react-dom': '^18.3.1',
        '@vitejs/plugin-react': '^4.3.3',
        autoprefixer: '^10.4.20',
        postcss: '^8.4.49',
        tailwindcss: '^3.4.15',
        vite: '^5.4.11',
      },
    },
    null,
    2
  ),

  'vite.config.js': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
});
`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#111315',
        deepblack: '#0B0C0E',
        charcoal: '#27292D',
        softwhite: '#F3F1EE',
        mutedgray: '#A6A8AC',
        electricred: '#F04444',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Syne"', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
`,

  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,

  'index.html': `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Umar Mushtaq — Video Editor, YouTube Automation & Creative Strategist</title>
    <meta
      name="description"
      content="Interactive 3D portfolio of Umar Mushtaq, Video Editor, YouTube Automation Specialist, and Creative Strategist with 5+ years of experience."
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Umar Mushtaq — Video Editor, YouTube Automation & Creative Strategist" />
    <meta
      property="og:description"
      content="I Turn Ideas Into Videos People Want to Watch. Explore an interactive 3D portfolio across Documentary Storytelling, Gaming Edits, Motion Graphics, and YouTube Automation."
    />
    <meta property="og:image" content="/assets/umar-portrait.jpg" />
    <meta name="theme-color" content="#0B0C0E" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-deepblack text-softwhite antialiased selection:bg-electricred selection:text-softwhite overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,

  'public/favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#0B0C0E"/>
  <path d="M18 18V36C18 43.732 24.268 50 32 50C39.732 50 46 43.732 46 36V18" stroke="#F3F1EE" stroke-width="5" stroke-linecap="round"/>
  <circle cx="32" cy="24" r="5" fill="#F04444"/>
</svg>
`,

  'public/assets/README-ASSETS.txt': `UMAR MUSHTAQ 3D PORTFOLIO — ASSET PLACEMENT GUIDE
===================================================

1. YOUR STUDIO PORTRAIT:
   Save your studio portrait image at:
   public/assets/umar-portrait.jpg

2. YOUR PROJECT THUMBNAILS (OPTIONAL):
   public/assets/projects/doc-1.jpg
   public/assets/projects/doc-2.jpg
   public/assets/projects/game-1.jpg
   public/assets/projects/game-2.jpg
   public/assets/projects/vfx-1.jpg
   public/assets/projects/vfx-2.jpg
   public/assets/projects/auto-1.jpg
   public/assets/projects/auto-2.jpg

3. VIDEO EMBED URLS:
   Open src/data/portfolioData.js and paste your YouTube or Vimeo embed URLs
   into each project's videoUrl field.
`,

  'README.md': `# Umar Mushtaq — Interactive 3D Portfolio

Built with React, Vite, Three.js, React Three Fiber, Drei, GSAP, and Tailwind CSS.

## Quick Start on Windows
1. \`node setup.mjs\`
2. \`npm install\` (if not already installed)
3. \`npm run dev\`
4. Open \`http://localhost:5173\`
`,

  'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html,
  body {
    background-color: #0B0C0E;
    color: #F3F1EE;
    font-family: 'Inter Tight', system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  .font-editorial {
    font-family: 'Cabinet Grotesk', 'Syne', sans-serif;
    letter-spacing: -0.03em;
  }

  :focus-visible {
    outline: 2px solid #F04444;
    outline-offset: 3px;
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hud-vignette {
  background: radial-gradient(
    circle at 50% 50%,
    transparent 52%,
    rgba(11, 12, 14, 0.82) 100%
  );
}
`,

  'src/data/portfolioData.js': `export const PROFILE = {
  name: 'Umar Mushtaq',
  title: 'Video Editor, YouTube Automation & Creative Strategist',
  experience: '5+ Years',
  location: 'Pakistan',
  availability: 'Available Worldwide / Remote',
  heroHeadline: 'I Turn Ideas Into Videos People Want to Watch.',
  heroSubcopy:
    "I'm Umar Mushtaq, a video editor and YouTube automation specialist with 5+ years of experience creating compelling video content. From cinematic storytelling and high-impact edits to complete YouTube production workflows, I help creators and businesses turn ideas into videos worth watching.",
  aboutCopy:
    "I'm Umar Mushtaq, a video editor and YouTube automation specialist with 5+ years of experience working across YouTube content, documentary-style storytelling, gaming edits, and AI-assisted production workflows. I combine editing, visual storytelling, and production systems to help creators turn ideas into polished videos. My focus is quality, consistency, and making each project work for its intended audience.",
  portraitPath: '/assets/umar-portrait.jpg',
  contacts: {
    whatsapp: 'https://wa.link/9td5l8',
    email: 'umarmushtaq6563@gmail.com',
    gmailCompose: 'https://mail.google.com/mail/?view=cm&to=umarmushtaq6563%40gmail.com',
    upwork: 'https://www.upwork.com/freelancers/~019c8bff4417e99bce',
    linkedin: 'https://www.linkedin.com/in/iumarmushtaq',
    discord: 'iumarmushtaq',
  },
};

export const STORY_CHAPTERS = [
  { id: 'opening', index: '01', label: 'Opening', progress: 0.0 },
  { id: 'documentary', index: '02', label: 'Documentary', progress: 0.25 },
  { id: 'gaming', index: '03', label: 'Gaming', progress: 0.44 },
  { id: 'motion', index: '04', label: 'Motion & VFX', progress: 0.62 },
  { id: 'automation', index: '05', label: 'Automation & AI', progress: 0.80 },
  { id: 'contact', index: '06', label: 'Proof & Contact', progress: 0.96 },
];

export const PORTFOLIO_PILLARS = [
  {
    id: 'documentary',
    number: '01',
    iconType: 'reel',
    iconName: '3D CINEMA FILM REEL',
    title: 'Documentary & Storytelling',
    shortLabel: 'Documentary',
    range: [0.15, 0.35],
    peakProgress: 0.25,
    description:
      'Long-form documentary editing, historical narratives, Wild West storytelling, geopolitics, archival footage, voice-over synchronization, narrative pacing, and cinematic storytelling.',
    floatingDetails: [
      'Historical & Wild West Narratives',
      'Geopolitics & Archival Footage',
      'Voice-Over Synchronization',
      'Cinematic Narrative Pacing',
    ],
    projects: [
      {
        id: 'doc-1',
        pillarNumber: '01',
        pillarTitle: 'Documentary & Storytelling',
        title: 'Geopolitics & Historical Documentary Edit',
        role: 'Video Editor & Storyteller',
        format: 'Long-Form Documentary',
        summary:
          'Long-form documentary editing combining archival footage, voice-over synchronization, narrative pacing, and cinematic visual storytelling.',
        deliverables: ['Documentary Editing', 'Archival Footage Pacing', 'Voice-Over Sync'],
        thumbnail: '/assets/projects/doc-1.jpg',
        videoUrl: '',
        emergeOffset: [-3.35, 0.05, 0.5],
        emergeRotation: [0, 0.22, 0],
      },
      {
        id: 'doc-2',
        pillarNumber: '01',
        pillarTitle: 'Documentary & Storytelling',
        title: 'Wild West & Historical Narrative Showcase',
        role: 'Documentary Video Editor',
        format: 'Historical Storytelling',
        summary:
          'Historical and Wild West storytelling crafted with atmospheric sound design, archival framing, and high-retention chapter structure.',
        deliverables: ['Historical Storytelling', 'Sound & Pacing', 'Chapter Transitions'],
        thumbnail: '/assets/projects/doc-2.jpg',
        videoUrl: '',
        emergeOffset: [3.35, 0.05, 0.5],
        emergeRotation: [0, -0.22, 0],
      },
    ],
  },
  {
    id: 'gaming',
    number: '02',
    iconType: 'gaming',
    iconName: '3D TACTICAL GAMING CORE',
    title: 'Gaming & High-Octane Editing',
    shortLabel: 'Gaming',
    range: [0.35, 0.53],
    peakProgress: 0.44,
    description:
      'Gaming videos and highlights, PUBG Mobile, Call of Duty-style edits, sound design, transitions, impactful pacing, and gameplay storytelling.',
    floatingDetails: [
      'PUBG Mobile Highlights & Edits',
      'Call of Duty-Style Edits',
      'Impactful Pacing & Sound Design',
      'Gameplay Storytelling',
    ],
    projects: [
      {
        id: 'game-1',
        pillarNumber: '02',
        pillarTitle: 'Gaming & High-Octane Editing',
        title: 'PUBG Mobile High-Octane Gameplay Edit',
        role: 'Video Editor & Sound Designer',
        format: 'Gaming Highlights',
        summary:
          'High-energy PUBG Mobile gameplay storytelling featuring custom sound design, kinetic transitions, and impactful pacing.',
        deliverables: ['Gameplay Storytelling', 'Layered Sound Design', 'Seamless Transitions'],
        thumbnail: '/assets/projects/game-1.jpg',
        videoUrl: '',
        emergeOffset: [-3.35, 0.05, 0.5],
        emergeRotation: [0, 0.22, 0],
      },
      {
        id: 'game-2',
        pillarNumber: '02',
        pillarTitle: 'Gaming & High-Octane Editing',
        title: 'Call of Duty-Style Montage & Pacing Edit',
        role: 'Video Editor',
        format: 'High-Impact Gaming Edit',
        summary:
          'Call of Duty-style editing built around frame-accurate audio hits, fast transitions, and high-retention action pacing.',
        deliverables: ['Impactful Pacing', 'Audio Synchronization', 'Visual Transitions'],
        thumbnail: '/assets/projects/game-2.jpg',
        videoUrl: '',
        emergeOffset: [3.35, 0.05, 0.5],
        emergeRotation: [0, -0.22, 0],
      },
    ],
  },
  {
    id: 'motion',
    number: '03',
    iconType: 'motion',
    iconName: '3D GEODESIC MAP & VFX PRISM',
    title: 'Motion Graphics & Visual Effects',
    shortLabel: 'Motion & VFX',
    range: [0.53, 0.71],
    peakProgress: 0.62,
    description:
      'Animated typography, map animations, compositing, overlays, transitions, visual effects, and before/after breakdowns.',
    floatingDetails: [
      'Custom Map Animations',
      'Animated Typography & Titles',
      'Compositing & Overlays',
      'Visual Effects & Transitions',
    ],
    projects: [
      {
        id: 'vfx-1',
        pillarNumber: '03',
        pillarTitle: 'Motion Graphics & Visual Effects',
        title: 'Map Animations & Geographical Storytelling',
        role: 'Motion Graphics Editor',
        format: 'Map Animation Showcase',
        summary:
          'Custom animated maps, route progressions, and visual callouts designed to make complex stories clear and engaging.',
        deliverables: ['Map Animations', 'Custom Overlays', 'Visual Transitions'],
        thumbnail: '/assets/projects/vfx-1.jpg',
        videoUrl: '',
        emergeOffset: [-3.35, 0.05, 0.5],
        emergeRotation: [0, 0.22, 0],
      },
      {
        id: 'vfx-2',
        pillarNumber: '03',
        pillarTitle: 'Motion Graphics & Visual Effects',
        title: 'Animated Typography & Compositing Breakdown',
        role: 'Motion Graphics & VFX Editor',
        format: 'Before / After Breakdown',
        summary:
          'Animated typography, multi-layer compositing, overlays, and visual effects crafted to elevate narrative retention.',
        deliverables: ['Animated Typography', 'Compositing', 'Before / After Polish'],
        thumbnail: '/assets/projects/vfx-2.jpg',
        videoUrl: '',
        emergeOffset: [3.35, 0.05, 0.5],
        emergeRotation: [0, -0.22, 0],
      },
    ],
  },
  {
    id: 'automation',
    number: '04',
    iconType: 'automation',
    iconName: '3D YOUTUBE AUTOMATION & AI CORE',
    title: 'YouTube Automation & AI Production',
    shortLabel: 'Automation & AI',
    range: [0.71, 0.89],
    peakProgress: 0.80,
    description:
      'Content research and production workflows, editing, visual sourcing, AI voice-over integration, appropriate AI-assisted visuals, thumbnails, SEO, uploading, scheduling, and channel management.',
    floatingDetails: [
      'Research & Production Workflows',
      'AI Voice-Over & Visual Integration',
      'Thumbnails, SEO & Scheduling',
      'Full Channel Management',
    ],
    projects: [
      {
        id: 'auto-1',
        pillarNumber: '04',
        pillarTitle: 'YouTube Automation & AI Production',
        title: 'Complete YouTube Production & Channel Workflow',
        role: 'YouTube Automation Specialist & Editor',
        format: 'End-to-End Channel Production',
        summary:
          'Complete workflow execution from content research, visual sourcing, and editing to thumbnails, SEO, uploading, scheduling, and channel management.',
        deliverables: ['Research & Visual Sourcing', 'Video Editing', 'SEO & Channel Management'],
        thumbnail: '/assets/projects/auto-1.jpg',
        videoUrl: '',
        emergeOffset: [-3.35, 0.05, 0.5],
        emergeRotation: [0, 0.22, 0],
      },
      {
        id: 'auto-2',
        pillarNumber: '04',
        pillarTitle: 'YouTube Automation & AI Production',
        title: 'AI-Assisted Voice & Visual Production Pipeline',
        role: 'Creative Strategist & Lead Editor',
        format: 'AI-Assisted Video Production',
        summary:
          'Integrating natural AI voice-overs and appropriate AI-assisted visuals into polished, human-edited YouTube videos.',
        deliverables: ['AI Voice-Over Integration', 'AI-Assisted Visuals', 'Editorial Finishing'],
        thumbnail: '/assets/projects/auto-2.jpg',
        videoUrl: '',
        emergeOffset: [3.35, 0.05, 0.5],
        emergeRotation: [0, -0.22, 0],
      },
    ],
  },
];

export const ALL_3D_PROJECTS = PORTFOLIO_PILLARS.flatMap((p) => p.projects);

export const CREDIBILITY_METRICS = [
  {
    id: 'exp',
    value: '5+ Years',
    label: 'Production Experience',
    context: '5+ years of video editing and content production experience.',
  },
  {
    id: 'subs',
    value: '900K+ Subs',
    label: 'Channel Collaboration',
    context: 'Worked with a YouTube channel with 900K+ subscribers.',
  },
  {
    id: 'views',
    value: 'Millions of Views',
    label: '1M+ View Videos',
    context: 'Multiple videos have individually achieved 1 million+ views.',
  },
  {
    id: 'channels',
    value: '10+ Channels',
    label: 'YouTube Channels',
    context: 'Worked on 10+ YouTube channels.',
  },
  {
    id: 'eligibility',
    value: '21 & 23 Days',
    label: 'Eligibility Milestones',
    context: 'Completed YouTube channel eligibility criteria in 21 days and 23 days on two separate occasions.',
  },
];

export const CLIENT_REVIEWS = [
  {
    id: 'review-1',
    stars: 5,
    quote:
      'A really good video creator and editor. On-time, professional in his approach and definitely worth hiring.',
    attributionNote: 'Client Review',
  },
  {
    id: 'review-2',
    stars: 5,
    quote:
      "Wow! He went ABOVE and beyond, I can't recommend this guy highly enough. Worked with him on one project and one really BIG project, and he is a weapon. Incredible human being, so well hearted and goes above and beyond! Thank you :)",
    attributionNote: 'Client Review',
  },
  {
    id: 'review-4',
    stars: 5,
    quote:
      'I am very satisfied with the work of Talha Touseef. Video was masterfully edited with attention to detail. Look forward to many more collaborations in the future.',
    attributionNote: 'Client Feedback (Collaborative Project Account)',
  },
  {
    id: 'personal-testimonial',
    stars: 5,
    quote:
      'You are the only freelancer from Pakistan I trust. I genuinely enjoy working with you and always look forward to bringing you more projects.',
    attributionNote: 'Long-Term Client Testimonial',
  },
];

export const SERVICES = [
  {
    number: '01',
    title: 'Video Editing',
    description:
      'Long-form YouTube, documentary-style content, storytelling, and gaming edits.',
    deliverables: [
      'Long-Form YouTube Editing',
      'Documentary-Style Content',
      'Narrative Storytelling',
      'Gaming Edits & Highlights',
    ],
  },
  {
    number: '02',
    title: 'YouTube Production',
    description:
      'Research, editing, visual sourcing, voice-over integration, thumbnails, SEO, and publishing support.',
    deliverables: [
      'Content Research & Visual Sourcing',
      'Voice-Over Integration',
      'Thumbnails & SEO Support',
      'Uploading & Publishing Support',
    ],
  },
  {
    number: '03',
    title: 'AI-Assisted Production',
    description:
      'Appropriate AI voice and visual integration into video workflows.',
    deliverables: [
      'AI Voice Integration',
      'Appropriate AI Visual Integration',
      'Production Workflow Systems',
      'Editorial Quality Control',
    ],
  },
  {
    number: '04',
    title: 'Motion Graphics & Visual Effects',
    description:
      'Animated titles, overlays, map graphics, compositing, transitions, and effects demonstrated by real work.',
    deliverables: [
      'Animated Titles & Overlays',
      'Map Graphics & Animations',
      'Compositing & Transitions',
      'Visual Effects',
    ],
  },
];
`,

  'src/three/proceduralTextures.js': `import * as THREE from 'three';

export function createSmartProjectTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  const drawSlate = () => {
    const grad = ctx.createLinearGradient(0, 0, 1280, 720);
    grad.addColorStop(0, '#1A1D23');
    grad.addColorStop(0.5, '#111317');
    grad.addColorStop(1, '#0B0C0E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 720);

    ctx.strokeStyle = 'rgba(243, 241, 238, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1280; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 720);
      ctx.stroke();
    }
    for (let y = 0; y <= 720; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1280, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#F04444';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 1208, 648);

    ctx.fillStyle = '#F04444';
    ctx.fillRect(68, 72, 110, 6);

    ctx.font = '600 24px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F04444';
    ctx.fillText(
      'PILLAR ' + project.pillarNumber + ' // ' + project.pillarTitle.toUpperCase(),
      68,
      132
    );

    ctx.font = '800 56px "Cabinet Grotesk", "Syne", sans-serif';
    ctx.fillStyle = '#F3F1EE';
    wrapText(ctx, project.title, 68, 235, 1120, 66);

    ctx.font = '500 28px "Inter Tight", sans-serif';
    ctx.fillStyle = '#A6A8AC';
    ctx.fillText(project.role + '  •  ' + project.format, 68, 425);

    ctx.fillStyle = 'rgba(240, 68, 68, 0.72)';
    for (let i = 0; i < 66; i++) {
      const barH = 14 + Math.abs(Math.sin(i * 0.42 + Number(project.pillarNumber)) * 48);
      ctx.fillRect(68 + i * 17, 545 - barH / 2, 9, barH);
    }

    ctx.font = '600 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F3F1EE';
    ctx.fillText('[ CLICK 3D SCREEN TO OPEN PROJECT & VIDEO ]', 68, 635);
  };

  drawSlate();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  if (project.thumbnail) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 1280, 720);
      ctx.drawImage(img, 0, 0, 1280, 720);

      const overlay = ctx.createLinearGradient(0, 440, 0, 720);
      overlay.addColorStop(0, 'rgba(11,12,14,0)');
      overlay.addColorStop(1, 'rgba(11,12,14,0.88)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 440, 1280, 280);

      ctx.font = '600 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F04444';
      ctx.fillText('PILLAR ' + project.pillarNumber + ' • ' + project.format.toUpperCase(), 48, 618);

      ctx.font = '800 40px "Cabinet Grotesk", sans-serif';
      ctx.fillStyle = '#F3F1EE';
      ctx.fillText(project.title, 48, 668);

      texture.needsUpdate = true;
    };
    img.src = project.thumbnail;
  }

  return texture;
}

export function createSmartPortraitTexture(portraitPath) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  const drawFallback = () => {
    const grad = ctx.createRadialGradient(400, 400, 50, 400, 500, 620);
    grad.addColorStop(0, '#27292D');
    grad.addColorStop(1, '#0B0C0E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1000);

    ctx.strokeStyle = '#F04444';
    ctx.lineWidth = 4;
    ctx.strokeRect(32, 32, 736, 936);

    ctx.beginPath();
    ctx.arc(400, 380, 110, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '800 54px "Cabinet Grotesk", sans-serif';
    ctx.fillStyle = '#F3F1EE';
    ctx.fillText('UMAR MUSHTAQ', 400, 610);

    ctx.font = '500 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F04444';
    ctx.fillText('VIDEO EDITOR & YOUTUBE STRATEGIST', 400, 660);

    ctx.font = '400 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#A6A8AC';
    ctx.fillText('Save portrait at public/assets/umar-portrait.jpg', 400, 910);
  };

  drawFallback();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (portraitPath) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 800, 1000);
      ctx.fillStyle = '#0B0C0E';
      ctx.fillRect(0, 0, 800, 1000);

      const scale = Math.max(800 / img.width, 1000 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      // Top-bias crop so chest-up portrait head is framed cleanly
      ctx.drawImage(img, (800 - w) / 2, (1000 - h) * 0.25, w, h);

      const grad = ctx.createLinearGradient(0, 720, 0, 1000);
      grad.addColorStop(0, 'rgba(11,12,14,0)');
      grad.addColorStop(1, 'rgba(11,12,14,0.92)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 720, 800, 280);

      ctx.textAlign = 'left';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F04444';
      ctx.fillText('● STUDIO PORTRAIT // 5+ YRS EXP', 44, 898);

      ctx.font = '800 42px "Cabinet Grotesk", sans-serif';
      ctx.fillStyle = '#F3F1EE';
      ctx.fillText('UMAR MUSHTAQ', 44, 948);

      texture.needsUpdate = true;
    };
    img.src = portraitPath;
  }

  return texture;
}

export function createDetailBadgeTexture(text, index) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 110;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#14171C';
  ctx.fillRect(0, 0, 512, 110);

  ctx.strokeStyle = '#F04444';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 504, 102);

  ctx.fillStyle = '#F04444';
  ctx.fillRect(20, 32, 8, 46);

  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F04444';
  ctx.fillText('0' + (index + 1), 42, 46);

  ctx.font = '700 24px "Cabinet Grotesk", "Inter Tight", sans-serif';
  ctx.fillStyle = '#F3F1EE';
  ctx.fillText(text, 42, 78);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
`,

  'src/three/CinemaWorld.jsx': `import React, { useMemo, useRef, useState } from 'react';
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
`,

  'src/components/ProjectDrawerModal.jsx': `import React from 'react';
import { X, MessageCircle, ArrowUpRight, CheckCircle2, Film } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function ProjectDrawerModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-deepblack/85 p-4 backdrop-blur-md"
    >
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-obsidian p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-electricred">
              PILLAR {project.pillarNumber} // {project.pillarTitle}
            </p>
            <h2 className="mt-1 font-editorial text-2xl font-bold text-softwhite sm:text-3xl">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-full border border-white/15 bg-charcoal p-2 text-mutedgray hover:text-softwhite"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-deepblack">
          {project.videoUrl ? (
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <Film className="mb-3 h-9 w-9 text-electricred" />
              <p className="font-editorial text-lg font-bold text-softwhite">
                Project Video Slot Ready
              </p>
              <p className="mt-1 max-w-md text-xs text-mutedgray">
                Add your YouTube or Vimeo embed URL to <code>videoUrl</code> in{' '}
                <code>src/data/portfolioData.js</code>, or message Umar on WhatsApp for a direct
                sample link.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <p className="font-mono text-xs uppercase tracking-wider text-electricred">
              Role: {project.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-softwhite/90">
              {project.summary}
            </p>
          </div>

          <div className="sm:col-span-5 border-t border-white/10 pt-4 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
            <p className="font-mono text-xs uppercase tracking-wider text-mutedgray">
              Focus Areas
            </p>
            <ul className="mt-3 space-y-2">
              {project.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-softwhite">
                  <CheckCircle2 className="h-3.5 w-3.5 text-electricred shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <a
            href={PROFILE.contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-electricred px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-softwhite hover:bg-electricred/90"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Discuss Similar Work on WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-wider text-mutedgray hover:text-softwhite"
          >
            Back to 3D Scene
          </button>
        </div>
      </div>
    </div>
  );
}
`,

  'src/components/ContactModal.jsx': `import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Mail, Copy, Check } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function ContactModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialService || 'Documentary & Storytelling',
    budget: '',
    description: '',
    preferredMethod: 'WhatsApp',
  });
  const [errors, setErrors] = useState({});
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim() || !/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      nextErrors.description =
        'Please share a brief overview of your project (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const formatBriefText = () => {
    return [
      "Hi Umar, I'd like to discuss a project:",
      '',
      '• Name: ' + formData.name,
      '• Email: ' + formData.email,
      '• Project Type: ' + formData.projectType,
      '• Estimated Budget: ' + (formData.budget || 'Not specified'),
      '• Preferred Contact: ' + formData.preferredMethod,
      '',
      'Project Details:',
      formData.description,
    ].join('\\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const briefText = formatBriefText();

    if (formData.preferredMethod === 'Email') {
      const subject = encodeURIComponent(
        'Project Inquiry: ' + formData.projectType + ' — ' + formData.name
      );
      const body = encodeURIComponent(briefText);
      const gmailUrl = PROFILE.contacts.gmailCompose + '&su=' + subject + '&body=' + body;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else {
      try {
        await navigator.clipboard.writeText(briefText);
        setCopiedBrief(true);
        setTimeout(() => setCopiedBrief(false), 4000);
      } catch {
        // Optional clipboard
      }
      window.open(PROFILE.contacts.whatsapp, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyBriefOnly = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formatBriefText());
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-deepblack/85 p-4 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative my-8 w-full max-w-xl rounded-2xl border border-white/15 bg-obsidian p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-electricred">
              Direct Project Inquiry
            </p>
            <h2
              id="contact-modal-title"
              className="mt-1 font-editorial text-2xl font-bold text-softwhite"
            >
              Start a Project With Umar
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full border border-white/10 bg-charcoal p-2 text-mutedgray hover:text-softwhite"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="modal-name" className="block font-mono text-xs uppercase text-mutedgray">
                Name *
              </label>
              <input
                id="modal-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-deepblack px-3.5 py-2.5 text-sm text-softwhite focus:border-electricred focus:outline-none"
                placeholder="Your name or channel"
              />
              {errors.name && <p className="mt-1 text-xs text-electricred">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="modal-email" className="block font-mono text-xs uppercase text-mutedgray">
                Email *
              </label>
              <input
                id="modal-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-deepblack px-3.5 py-2.5 text-sm text-softwhite focus:border-electricred focus:outline-none"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-electricred">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="modal-project-type"
                className="block font-mono text-xs uppercase text-mutedgray"
              >
                Project Type
              </label>
              <select
                id="modal-project-type"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-deepblack px-3.5 py-2.5 text-sm text-softwhite focus:border-electricred focus:outline-none"
              >
                <option value="Documentary & Storytelling">Documentary &amp; Storytelling</option>
                <option value="Gaming & High-Octane Editing">Gaming &amp; High-Octane Editing</option>
                <option value="Motion Graphics & Visual Effects">Motion Graphics &amp; Visual Effects</option>
                <option value="YouTube Automation & AI Production">
                  YouTube Automation &amp; AI Production
                </option>
                <option value="Video Editing">Video Editing</option>
                <option value="YouTube Production">YouTube Production</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-budget" className="block font-mono text-xs uppercase text-mutedgray">
                Estimated Budget (Optional)
              </label>
              <input
                id="modal-budget"
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-deepblack px-3.5 py-2.5 text-sm text-softwhite focus:border-electricred focus:outline-none"
                placeholder="Per video or monthly retainer"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="modal-description"
              className="block font-mono text-xs uppercase text-mutedgray"
            >
              Project Description *
            </label>
            <textarea
              id="modal-description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-deepblack p-3.5 text-sm text-softwhite focus:border-electricred focus:outline-none"
              placeholder="Share your video length, style reference, turnaround needs, or channel goals..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-electricred">{errors.description}</p>
            )}
          </div>

          <div>
            <span className="block font-mono text-xs uppercase text-mutedgray">
              Preferred Contact Method
            </span>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {['WhatsApp', 'Email'].map((method) => {
                const btnClass =
                  'rounded-lg border py-2.5 font-mono text-xs uppercase tracking-wider transition ' +
                  (formData.preferredMethod === method
                    ? 'border-electricred bg-electricred/15 text-softwhite'
                    : 'border-white/15 bg-deepblack text-mutedgray hover:text-softwhite');
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredMethod: method })}
                    className={btnClass}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {copiedBrief && (
            <div className="rounded-lg border border-electricred/40 bg-electricred/10 p-3 text-xs text-softwhite">
              Formatted brief copied to your clipboard! Paste it directly into the chat window.
            </div>
          )}

          <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-electricred px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-softwhite transition hover:bg-electricred/90"
            >
              {formData.preferredMethod === 'Email' ? (
                <>
                  <Mail className="h-4 w-4" />
                  <span>Open in Gmail Compose</span>
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4" />
                  <span>Copy Brief &amp; Open WhatsApp</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyBriefOnly}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-deepblack px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-softwhite hover:border-softwhite"
            >
              {copiedBrief ? (
                <Check className="h-4 w-4 text-electricred" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copiedBrief ? 'Copied' : 'Copy Brief'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
`,

  'src/App.jsx': `import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  MessageCircle,
  ArrowUpRight,
  Star,
  Sparkles as SparklesIcon,
  Eye,
  Layers,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Play,
} from 'lucide-react';
import CinemaWorld from './three/CinemaWorld';
import ProjectDrawerModal from './components/ProjectDrawerModal';
import ContactModal from './components/ContactModal';
import {
  PROFILE,
  STORY_CHAPTERS,
  PORTFOLIO_PILLARS,
  CREDIBILITY_METRICS,
  CLIENT_REVIEWS,
  SERVICES,
} from './data/portfolioData';

function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function formatTimecode(progress) {
  const totalFrames = Math.floor(progress * 7200);
  const minutes = String(Math.floor(totalFrames / (24 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((totalFrames / 24) % 60)).padStart(2, '0');
  const frames = String(totalFrames % 24).padStart(2, '0');
  return '00:' + minutes + ':' + seconds + ':' + frames;
}

export default function App() {
  const scrollStateRef = useRef({ progress: 0 });
  const reviewTrackRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [reviewsDrawerOpen, setReviewsDrawerOpen] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);

  useEffect(() => {
    setWebGLSupported(checkWebGLSupport());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  // Bulletproof native scroll tracker that always syncs window scroll to 3D progress [0..1]
  useEffect(() => {
    const updateScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      scrollStateRef.current.progress = current;
      setScrollProgress(current);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const scrollToProgress = (targetProgress) => {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: maxScroll * targetProgress,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const scrollReviews = (dir) => {
    if (!reviewTrackRef.current) return;
    reviewTrackRef.current.scrollBy({
      left: dir === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  };

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contacts.discord);
      setDiscordCopied(true);
      setTimeout(() => setDiscordCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const activeChapter =
    [...STORY_CHAPTERS]
      .reverse()
      .find((ch) => scrollProgress >= ch.progress - 0.06) || STORY_CHAPTERS[0];

  const activePillar = PORTFOLIO_PILLARS.find(
    (p) => scrollProgress >= p.range[0] && scrollProgress < p.range[1]
  );

  return (
    <div className="relative bg-deepblack text-softwhite">
      {/* =====================================================================
          1. FIXED REAL-TIME 3D / WEBGL STAGE CANVAS
         ===================================================================== */}
      <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden">
        {webGLSupported ? (
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.25, 10.2], fov: 46, near: 0.1, far: 100 }}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            <CinemaWorld
              scrollStateRef={scrollStateRef}
              onSelectProject={(proj) => setSelectedProject(proj)}
              reducedMotion={reducedMotion}
            />
          </Canvas>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-deepblack p-8 text-center">
            <p className="font-mono text-xs text-mutedgray">
              WebGL hardware acceleration is unavailable — use the navigation controls to explore.
            </p>
          </div>
        )}

        <div className="hud-vignette pointer-events-none absolute inset-0" />
      </div>

      {/* =====================================================================
          2. TOP PERSISTENT SPATIAL HUD BAR
         ===================================================================== */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3.5 sm:px-8 sm:py-5 pointer-events-none">
        <button
          type="button"
          onClick={() => scrollToProgress(0)}
          className="pointer-events-auto group flex items-center gap-3 rounded-full border border-white/10 bg-deepblack/80 px-4 py-2 backdrop-blur-md transition hover:border-electricred"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-electricred/15 text-electricred">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M7 7v6a5 5 0 0 0 10 0V7"
                stroke="#F3F1EE"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="2.2" fill="#F04444" />
            </svg>
          </span>
          <div className="text-left">
            <span className="block font-editorial text-sm font-bold tracking-tight text-softwhite">
              UMAR MUSHTAQ
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-mutedgray">
              3D Spatial Portfolio
            </span>
          </div>
        </button>

        {/* Top Chapter / 3D Niche Icon Jump Buttons */}
        <nav
          aria-label="3D Niche Stages"
          className="pointer-events-auto hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-deepblack/80 p-1.5 backdrop-blur-md"
        >
          {STORY_CHAPTERS.map((ch) => {
            const isActive = activeChapter.id === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToProgress(ch.progress)}
                className={
                  'rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition ' +
                  (isActive
                    ? 'bg-electricred text-softwhite font-semibold'
                    : 'text-mutedgray hover:text-softwhite')
                }
              >
                {ch.index} {ch.label}
              </button>
            );
          })}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-deepblack/80 px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider text-mutedgray backdrop-blur-md hover:text-softwhite"
          >
            <Eye className="h-3.5 w-3.5 text-electricred" />
            <span>{reducedMotion ? 'Reduced' : '3D Motion'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedService('');
              setContactModalOpen(true);
            }}
            className="rounded-full border border-white/15 bg-deepblack/80 px-4 py-2 font-mono text-xs uppercase tracking-wider text-softwhite backdrop-blur-md hover:border-electricred"
          >
            Brief
          </button>

          <a
            href={PROFILE.contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-electricred px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-softwhite shadow-lg transition hover:bg-electricred/90"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* =====================================================================
          3. COMPACT BOTTOM-CENTER CAPTION FOR ACTIVE 3D NICHE ICON (STAGES 02-05)
             Never blocks the left or right 3D screens!
         ===================================================================== */}
      {activePillar && (
        <div className="fixed inset-x-0 bottom-16 z-20 flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-deepblack/85 px-5 py-3.5 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-electricred" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-electricred">
                    {activePillar.iconName} // PILLAR {activePillar.number}
                  </span>
                </div>
                <h2 className="mt-0.5 font-editorial text-lg font-bold text-softwhite sm:text-xl">
                  {activePillar.title}
                </h2>
                <p className="text-xs text-mutedgray line-clamp-1">
                  {activePillar.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {activePillar.projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-electricred/50 bg-electricred/15 px-3.5 py-1.5 font-mono text-[11px] font-medium text-softwhite transition hover:bg-electricred"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Open Screen 0{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. BOTTOM TIMECODE & STAGE SCRUBBER BAR
         ===================================================================== */}
      <div className="fixed inset-x-0 bottom-0 z-30 pointer-events-none px-4 pb-3 sm:px-8 sm:pb-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-deepblack/85 px-5 py-2.5 backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-electricred animate-pulse" />
            <span className="font-mono text-xs font-semibold text-softwhite">
              TC {formatTimecode(scrollProgress)}
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-mutedgray">
              • STAGE {activeChapter.index}: {activeChapter.label.toUpperCase()}
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center gap-3 max-w-md">
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-charcoal">
              <div
                className="h-full bg-electricred transition-all duration-75"
                style={{ width: String(Math.round(scrollProgress * 100)) + '%' }}
              />
            </div>
            <span className="font-mono text-[11px] text-mutedgray w-10 text-right">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => setReviewsDrawerOpen(!reviewsDrawerOpen)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-charcoal/80 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-softwhite hover:border-electricred"
          >
            <Layers className="h-3.5 w-3.5 text-electricred" />
            <span>{reviewsDrawerOpen ? 'Close Index' : 'Reviews & Services'}</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          5. SCROLLABLE STORYBOARD TRACK (680VH)
         ===================================================================== */}
      <main className="relative z-10 pointer-events-none">
        {/* STAGE 01: OPENING HERO (0% - 15%) */}
        <section className="flex min-h-screen items-center px-6 sm:px-12 lg:px-20">
          <div
            className={
              'pointer-events-auto max-w-xl rounded-3xl border border-white/10 bg-deepblack/70 p-7 sm:p-9 backdrop-blur-md transition-opacity duration-500 ' +
              (scrollProgress < 0.13 ? 'opacity-100' : 'opacity-0 pointer-events-none')
            }
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-electricred">
              <SparklesIcon className="h-3.5 w-3.5" />
              <span>{PROFILE.title}</span>
            </div>

            <h1 className="mt-4 font-editorial text-4xl font-extrabold leading-[1.03] tracking-tight text-softwhite sm:text-6xl">
              I Turn Ideas Into Videos{' '}
              <span className="text-electricred">People Want to Watch.</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-softwhite/85 sm:text-base">
              {PROFILE.heroSubcopy}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href={PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-electricred px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-softwhite transition hover:bg-electricred/90"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contact Me on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => scrollToProgress(0.25)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-charcoal/70 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-softwhite hover:border-electricred"
              >
                <span>Explore My Work</span>
                <ChevronRight className="h-4 w-4 text-electricred" />
              </button>
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-mutedgray">
              Scroll down to watch each 3D niche icon materialize &amp; burst open
            </p>
          </div>
        </section>

        {/* STAGES 02 - 05: OPEN 3D VIEWPORT SCROLL SPACE FOR THE 4 NICHE ICONS */}
        <section aria-label="3D Niche Stages" className="h-[440vh]" />

        {/* STAGE 06: FINAL PORTAL — VERIFIED METRICS, REVIEWS CAROUSEL & CONTACT */}
        <section className="flex min-h-screen items-center justify-center px-6 pb-28 pt-16 sm:px-12">
          <div className="pointer-events-auto w-full max-w-5xl rounded-3xl border border-white/15 bg-deepblack/85 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            {/* Verified Track Record */}
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6 sm:grid-cols-5">
              {CREDIBILITY_METRICS.map((m) => (
                <div key={m.id} className="border-l-2 border-electricred pl-3">
                  <p className="font-editorial text-xl font-extrabold text-softwhite sm:text-2xl">
                    {m.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-electricred">
                    {m.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-mutedgray">{m.context}</p>
                </div>
              ))}
            </div>

            {/* Horizontal Homepage Reviews Carousel */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-wider text-electricred">
                  Client Reviews &amp; Feedback (5.0★)
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollReviews('left')}
                    aria-label="Scroll reviews left"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-charcoal text-softwhite hover:border-electricred"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollReviews('right')}
                    aria-label="Scroll reviews right"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-charcoal text-softwhite hover:border-electricred"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                ref={reviewTrackRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
              >
                {CLIENT_REVIEWS.map((rev) => (
                  <article
                    key={rev.id}
                    className="w-[80vw] max-w-[360px] shrink-0 snap-start rounded-2xl border border-white/10 bg-charcoal/60 p-4"
                  >
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: rev.stars }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-electricred text-electricred" />
                      ))}
                      <span className="ml-2 font-mono text-[10px] text-mutedgray">
                        {rev.attributionNote}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-softwhite/95">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Final Conversion Callout */}
            <div className="mt-7 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 lg:flex-row">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-electricred">
                  {PROFILE.availability}
                </p>
                <h2 className="mt-1 font-editorial text-2xl font-extrabold text-softwhite sm:text-4xl">
                  Ready to Turn Your Ideas Into Videos Worth Watching?
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={PROFILE.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-electricred px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-softwhite transition hover:bg-electricred/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService('');
                    setContactModalOpen(true);
                  }}
                  className="rounded-full border border-white/20 bg-charcoal px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-softwhite hover:border-electricred"
                >
                  Open Project Brief
                </button>
              </div>
            </div>

            {/* Direct Verified Links */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-left sm:grid-cols-4">
              <div>
                <span className="block font-mono text-[10px] uppercase text-mutedgray">Email</span>
                <a
                  href={PROFILE.contacts.gmailCompose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block truncate text-xs font-medium text-softwhite hover:text-electricred"
                >
                  {PROFILE.contacts.email}
                </a>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-mutedgray">Upwork</span>
                <a
                  href={PROFILE.contacts.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-softwhite hover:text-electricred"
                >
                  <span>Upwork Profile</span>
                  <ArrowUpRight className="h-3 w-3 text-electricred" />
                </a>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-mutedgray">
                  LinkedIn
                </span>
                <a
                  href={PROFILE.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-softwhite hover:text-electricred"
                >
                  <span>in/iumarmushtaq</span>
                  <ArrowUpRight className="h-3 w-3 text-electricred" />
                </a>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-mutedgray">
                  Discord
                </span>
                <button
                  type="button"
                  onClick={copyDiscord}
                  className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-softwhite hover:text-electricred"
                >
                  <span>{PROFILE.contacts.discord}</span>
                  {discordCopied ? (
                    <Check className="h-3 w-3 text-electricred" />
                  ) : (
                    <Copy className="h-3 w-3 text-mutedgray" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          6. SLIDE-OVER ABOUT, REVIEWS & SERVICES DRAWER
         ===================================================================== */}
      {reviewsDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="About, Client Reviews and Services"
          className="fixed inset-0 z-40 flex justify-end bg-deepblack/80 backdrop-blur-sm"
        >
          <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/15 bg-obsidian p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-electricred">
                  Full Overview
                </p>
                <h2 className="font-editorial text-2xl font-bold text-softwhite">
                  About, Services &amp; Client Reviews
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReviewsDrawerOpen(false)}
                className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase text-mutedgray hover:text-softwhite"
              >
                Close
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-charcoal/40 p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-electricred">
                About Umar Mushtaq
              </p>
              <p className="mt-2 text-sm leading-relaxed text-softwhite/90">
                {PROFILE.aboutCopy}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-electricred">
                Services
              </h3>
              <div className="mt-4 space-y-4">
                {SERVICES.map((srv) => (
                  <div
                    key={srv.number}
                    className="rounded-2xl border border-white/10 bg-charcoal/40 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-lg font-bold text-softwhite">
                        {srv.number} — {srv.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setReviewsDrawerOpen(false);
                          setSelectedService(srv.title);
                          setContactModalOpen(true);
                        }}
                        className="font-mono text-xs text-electricred hover:underline"
                      >
                        Inquire &rarr;
                      </button>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-mutedgray">
                      {srv.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-electricred">
                Client Reviews (5.0★)
              </h3>
              <div className="mt-4 space-y-4">
                {CLIENT_REVIEWS.map((rev) => (
                  <article
                    key={rev.id}
                    className="rounded-2xl border border-white/10 bg-charcoal/50 p-5"
                  >
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: rev.stars }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-electricred text-electricred" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-softwhite">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-mutedgray">
                      {rev.attributionNote}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ProjectDrawerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
`,
};

// 1. Create all required directories
fs.mkdirSync(path.resolve(process.cwd(), 'public/assets/projects'), { recursive: true });
fs.mkdirSync(path.resolve(process.cwd(), 'src/three'), { recursive: true });
fs.mkdirSync(path.resolve(process.cwd(), 'src/components'), { recursive: true });
fs.mkdirSync(path.resolve(process.cwd(), 'src/data'), { recursive: true });

// 2. Write all 15 files to disk
for (const [relativePath, content] of Object.entries(FILES)) {
  const fullPath = path.resolve(process.cwd(), relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('[WRITTEN] ' + relativePath);
}

// 3. Update the downloadable ZIP archive automatically if tar is available
try {
  execSync(
    'tar -a -c -f umar-mushtaq-portfolio.zip package.json vite.config.js tailwind.config.js postcss.config.js index.html README.md public src',
    { stdio: 'ignore' }
  );
  console.log('[ZIP UPDATED] umar-mushtaq-portfolio.zip');
} catch {
  // Optional archive step skipped
}

console.log('\n============================================================');
console.log('ALL 15 FILES WRITTEN SUCCESSFULLY!');
console.log('1. Save your chest-up studio portrait to: public/assets/umar-portrait.jpg');
console.log('2. Run: npm run dev');
console.log('============================================================\n');