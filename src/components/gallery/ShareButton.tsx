import React, { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

// Uses the phone's native share sheet where available, otherwise copies the link.
export const ShareButton: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href.split('?')[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Dismissed by the user.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <button type="button" onClick={share} className={`inline-flex items-center gap-2 ${className}`}>
      {copied ? <Check size={14} strokeWidth={1.5} /> : <Share2 size={14} strokeWidth={1.5} />}
      <span aria-live="polite">{copied ? 'Link copied' : 'Share'}</span>
    </button>
  );
};
