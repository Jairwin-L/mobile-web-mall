// use less: https://github.com/SolidZORO/next-plugin-antd-less
const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
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
