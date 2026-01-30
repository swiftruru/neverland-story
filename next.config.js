/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 解決開發模式下的模組載入問題
  transpilePackages: ['react-i18next', 'i18next'],
}

module.exports = nextConfig
