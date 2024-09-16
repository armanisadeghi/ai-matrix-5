import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    baseUrl: "https://api.github.com",
    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error,
    },
    request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0,
    },
});
