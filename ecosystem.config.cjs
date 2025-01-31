module.exports = {
  apps: [
    {
      name: 'mobile-web-mall',
      script: 'pnpm',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      // watch: true,
      watch: ['.next'], // 监控 Next.js 的构建目录
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'production',
        HOST: '122.152.204.72',
        PORT: 6083,
      },
    },
  ],
};
