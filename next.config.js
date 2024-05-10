const path = require('path');
// use less: https://github.com/SolidZORO/next-plugin-antd-less
const withAntdLess = require('next-plugin-antd-less');

const REMOTE_PATTERNS = [
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
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  // TODO:Experimental features are not covered by semver, and may cause unexpected or broken application behavior. Use at your own risk.
  experimental: {
    forceSwcTransforms: true,
  },
  transpilePackages: ['antd-mobile'],
  images: {
    remotePatterns: REMOTE_PATTERNS,
  },
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "src/styles/common.scss";@import "src/styles/mixins.scss";`,
  },
  ...withAntdLess({
    modifyVars: {
      '@primary': '#1677ff',
      '@detail': '#2db7f5',
      '@edit': '#8354ee',
      '@danger': '#ff3141',
      '@white': '#fff',
      '@default-black': '#333',
      '@pink': '#ffc0cb',
      '@divide': '#f1f5ff',
      '@text': '#999',
      '@theme': '#1677ff',
      '@warn': '#ff3141',
      '@gray': '#7a7a7a',
      '@default-font-size': '16px',
      '@common-font-size': '14px',
      '@small-font-size': '12px',
    },
  }),
};

module.exports = nextConfig;
