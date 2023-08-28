/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['s3.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                port: '',
                pathname: '/lvb-frames-storage/**',
            },
        ],
    },
};

module.exports = nextConfig;
