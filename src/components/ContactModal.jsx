import React, { useState, useEffect } from 'react';
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
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
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
    ].join('\n');
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
