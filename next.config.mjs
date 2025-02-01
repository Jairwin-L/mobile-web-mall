import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 从 import.meta.url 获取当前模块文件的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "src/styles/common.scss";@import "src/styles/mixins.scss";@import "src/styles/variable.scss";`,
  },
};

export default nextConfig;
