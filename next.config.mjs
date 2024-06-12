import bundleAnalyzer from '@next/bundle-analyzer';
import webpack from 'webpack';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    webpack(config, { isServer }) {
        if (isServer) {
            config.plugins.push(
                new webpack.IgnorePlugin({
                    resourceRegExp: /app\/samples/,
                }),
                new webpack.IgnorePlugin({
                    resourceRegExp: /armaniLocal/,
                })
            );
        }
        return config;
    }
};

export default withBundleAnalyzer(nextConfig);
