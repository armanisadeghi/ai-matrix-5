import path from "path";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import { Configuration } from "webpack";

export default function override(config: Configuration, _env: any): Configuration {
    config.plugins?.push(new MonacoWebpackPlugin());
    return config;
}
