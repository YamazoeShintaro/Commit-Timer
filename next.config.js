/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
      },
      // module: {
      //   rules: [
      //     {
      //       test: /\.mp3$/,
      //       use: ['audio-loader'],
      //     },
      //   ],
      // },
}

module.exports = nextConfig
