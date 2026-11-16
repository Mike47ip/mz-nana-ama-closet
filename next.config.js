/** Remote photo hosts allowed by next/image. Vercel Blob is where uploaded photos live on Vercel. */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};