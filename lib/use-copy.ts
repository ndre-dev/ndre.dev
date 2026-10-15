'use client';

import { useEffect, useState } from 'react';

// Copies text to the clipboard. `copied` stays true for a moment afterwards,
// so the button can say so.
export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // No async clipboard (an old browser or a blocked permission).
      const field = document.createElement('textarea');
      field.value = text;
      document.body.append(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
  }

  return { copied, copy };
}
