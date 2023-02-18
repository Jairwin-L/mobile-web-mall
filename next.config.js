// use less: https://github.com/SolidZORO/next-plugin-antd-less
const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['antd-mobile'],
  },
  ...withAntdLess({
    modifyVars: {
      '@primary-color': '#2598ff',
      '@detail-color': '#2db7f5',
      '@edit-color': '#8354ee',
      '@danger-color': '#ff3141',
      '@white': '#fff',
      '@default-black': '#333',
      '@pink': '#ffc0cb',
      '@divide-color': '#f1f5ff',
      '@text-color': '#999',
      '@theme-color': '#1677ff',
      '@warn-color': '#ff3141',
      '@gray': '#7a7a7a',
      '@default-font-size': '16px',
      '@common-font-size': '14px',
      '@small-font-size': '12px',
    },
  }),
};

module.exports = nextConfig;
