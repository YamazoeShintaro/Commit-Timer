/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      });
      return config;
    },
};

module.exports = nextConfig
