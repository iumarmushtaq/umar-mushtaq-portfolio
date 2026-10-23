import React, { useEffect, useRef, useState } from 'react';
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
