'use client';

import { useCopy } from '@/lib/use-copy';

// An install command with a copy button. The "$" prompt is drawn by CSS, so
// selecting the command by hand never copies it.
export function CopyCommand({
  command,
  labels,
}: {
  command: string;
  labels: { copy: string; copied: string; copyLabel: string };
}) {
  const { copied, copy } = useCopy(command);
  return (
    <div className="command">
      <code className="command-text">{command}</code>
      <button
        type="button"
        className="command-copy"
        onClick={copy}
        aria-label={labels.copyLabel}
      >
        {/* Both labels share one grid cell, so the button never resizes. */}
        <span aria-hidden="true">
          <span className={copied ? 'both-hidden' : undefined}>
            {labels.copy}
          </span>
          <span className={copied ? undefined : 'both-hidden'}>
            {labels.copied}
          </span>
        </span>
      </button>
      <span className="sr-only" role="status">
        {copied ? labels.copied : ''}
      </span>
    </div>
  );
}
