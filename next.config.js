/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXTAUTH_JWT_SECRET: "NEXTAUTH_JWT_SECRET",
    NEXTAUTH_SECRET: 'StcSxyHp6vBFQEfZTgTkCjkVPGpK89ha4/pncLMTblQ=',
    NEXTAUTH_URL: "http://localhost:3000",
  },
}

module.exports = nextConfig
