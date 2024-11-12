/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
         },
         {
            protocol: 'https',
            hostname: 't4.ftcdn.net',
         },
      ],
   },
}

export default nextConfig
