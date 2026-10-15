'use client';

import { useEffect } from 'react';
import { prefersStill } from '@/lib/motion';
import { themeColour, themeKey } from '@/lib/theme';

function isLight() {
  return document.documentElement.dataset.theme === 'light';
}

function syncThemeColour() {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isLight() ? themeColour.light : themeColour.dark);
}

// Timing curve for the circle that reveals the new theme. It maps time to
// radius so the share of the screen covered follows a gentle ease-in-out
// curve. Easing the radius directly makes most of the screen fill in a sudden
// burst halfway through. Returns a CSS linear() easing.
function revealEasing(x: number, y: number, radius: number) {
  // Share of the screen inside a circle of radius r, sampled on a coarse grid.
  const cell = 40;
  const covered = (r: number) => {
    let inside = 0;
    let total = 0;
    for (let px = cell / 2; px < innerWidth; px += cell) {
      for (let py = cell / 2; py < innerHeight; py += cell) {
        total++;
        if (Math.hypot(px - x, py - y) <= r) inside++;
      }
    }
    return inside / total;
  };
  // Smallest radius that covers at least `share` of the screen.
  const radiusFor = (share: number) => {
    let lo = 0;
    let hi = radius;
    for (let n = 0; n < 10; n++) {
      const mid = (lo + hi) / 2;
      if (covered(mid) < share) lo = mid;
      else hi = mid;
    }
    return hi;
  };

  const steps = 24;
  const points = Array.from({ length: steps + 1 }, (_, i) => {
    if (i === steps) return 1;
    const share = (1 - Math.cos((Math.PI * i) / steps)) / 2;
    return radiusFor(share) / radius;
  });
  return `linear(${points.map((p) => p.toFixed(4)).join(', ')})`;
}

export function ThemeToggle({
  labels,
}: {
  labels: { toLight: string; toDark: string };
}) {
  useEffect(syncThemeColour, []);

  function apply() {
    const root = document.documentElement;
    if (isLight()) delete root.dataset.theme;
    else root.dataset.theme = 'light';
    try {
      localStorage.setItem(themeKey, isLight() ? 'light' : 'dark');
    } catch {}
    syncThemeColour();
  }

  // The new theme spreads out in a circle from the button.
  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (!document.startViewTransition || prefersStill()) return apply();
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    // The circle itself is a CSS animation (see app/globals.css). Every browser
    // waits for CSS animations before it ends the transition.
    const root = document.documentElement;
    const reveal = {
      '--reveal-x': `${x}px`,
      '--reveal-y': `${y}px`,
      '--reveal-r': `${radius}px`,
      '--reveal-ease': revealEasing(x, y, radius),
    };
    for (const [name, value] of Object.entries(reveal)) {
      root.style.setProperty(name, value);
    }
    root.classList.add('theme-switching');
    const transition = document.startViewTransition(apply);
    // `ready` rejects when the browser skips the transition, for example on
    // a fast second click. The theme still changes, so there is nothing to do.
    transition.ready.catch(() => {});
    transition.finished.finally(() => {
      root.classList.remove('theme-switching');
      for (const name of Object.keys(reveal)) root.style.removeProperty(name);
    });
  }

  // Both labels render. CSS shows the one for the theme the button switches
  // to, so the server HTML is right before this script loads.
  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      <span className="to-light">{labels.toLight}</span>
      <span className="to-dark">{labels.toDark}</span>
    </button>
  );
}
