export const PROFILE = {
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
