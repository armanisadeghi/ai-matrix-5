import withBundleAnalyzer from '@next/bundle-analyzer';
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';

// Create a __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withBundleAnalyzerConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    webpack(config, { isServer }) {
        config.resolve.alias['@'] = path.resolve(__dirname);

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

export default withBundleAnalyzerConfig(nextConfig);
