import { getStore } from '@netlify/blobs';

export function imageStore() {
  return getStore({ name: 'product-images', consistency: 'strong' });
}
