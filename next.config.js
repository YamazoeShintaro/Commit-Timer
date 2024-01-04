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
    //       use: [
    //         {
    //           loader: 'file-loader',
    //           options: {
    //             name: 'timer.mp3',
    //             outputPath: 'audio/', // adjust the output path as needed
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
};

module.exports = nextConfig
