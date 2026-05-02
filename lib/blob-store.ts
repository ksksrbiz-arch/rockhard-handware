import { getStore, getDeployStore } from '@netlify/blobs';

/**
 * Returns the products image store.
 *
 * Production deploys use the global store so images persist across deploys.
 * Preview / branch deploys use a deploy-scoped store so they don't pollute
 * production data.
 *
 * The bucket name is fixed to 'product-images'; keys inside are
 * `<timestamp>-<random>-<originalname>` and lookups happen via /api/img/[key].
 */
export function getImageStore() {
  // Netlify.context is injected at runtime in functions
  const ctx = (globalThis as any).Netlify?.context;
  const isProd = ctx?.deploy?.context === 'production';
  return isProd
    ? getStore('product-images')
    : getDeployStore('product-images');
}
