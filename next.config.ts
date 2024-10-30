import path from 'path';
// use less: https://github.com/SolidZORO/next-plugin-antd-less

const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gw.alicdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yanxuan.nosdn.127.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yanxuan-item.nosdn.127.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "src/styles/common.scss";@import "src/styles/mixins.scss";;@import "src/styles/variable.scss";`,
  },
};

module.exports = nextConfig;
