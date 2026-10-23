import React from 'react';
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
