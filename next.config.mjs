import withBundleAnalyzer from "@next/bundle-analyzer";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

// Create a __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withBundleAnalyzerConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

// Control React Strict Mode with an environment variable
const reactStrictMode = process.env.NEXT_PUBLIC_DISABLE_STRICT_MODE !== "true";

const nextConfig = {
    reactStrictMode: reactStrictMode,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ["@mantine/core", "@mantine/hooks43"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    webpack(config, { isServer }) {
        config.resolve.alias["@"] = path.resolve(__dirname);
        config.plugins.push(new MonacoWebpackPlugin());

        if (isServer) {
            config.plugins.push(
                new webpack.IgnorePlugin({
                    checkResource: (resource) => {
                        const ignoredPaths = ["app/samples", "app/trials", "armaniLocal"];
                        return ignoredPaths.some((ignorePath) => resource.includes(path.normalize(ignorePath)));
                    },
                }),
            );
        }
        return config;
    },
    cssLoaderOptions: { url: false },
};

export default withBundleAnalyzerConfig(nextConfig);
