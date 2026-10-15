import type { NextConfig } from 'next';

// The site is fully static. Cloudflare serves the exported files in out/.
const nextConfig: NextConfig = {
  output: 'export',
  // Each language has its own root layout, so the 404 page needs its own.
  experimental: {
    globalNotFound: true,
    // The stylesheet is small, so ship it inside the HTML. The page can then
    // draw without waiting for a separate CSS request.
    inlineCss: true,
  },
};

export default nextConfig;
