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

/**
 *
 * @param octo
 * @param org
 * @param name
 */
const createRepoForOrg = async (octo: Octokit, org: string, name: string) => {
    await octo.repos.createInOrg({ org, name, auto_init: true });
};

/**
 *
 * @param octo
 * @param name
 * @param description
 */
const createRepoForAuthUser = async (octo: Octokit, name: string, description: string) => {
    await octo.repos.createForAuthenticatedUser({ name: name, description: description });
};

/**
 * create a commit
 */
const createCommit = async (octo: Octokit, owner: string, repo: string, branch: string = "main") => {
    const { data: refData } = await octo.git.getRef({
        owner,
        repo,
        ref: `heads/${branch}`,
    });
    const commitSha = refData.object.sha;
    const { data: commitData } = await octo.git.getCommit({
        owner,
        repo,
        commit_sha: commitSha,
    });
    return {
        commitSha,
        treeSha: commitData.tree.sha,
    };
};

/**
 * get latest commit
 */
const getCurrentCommit = async (octo: Octokit, owner: string, repo: string, branch: string = "master") => {
    const { data: refData } = await octo.git.getRef({
        owner,
        repo,
        ref: `heads/${branch}`,
    });
    const commitSha = refData.object.sha;
    const { data: commitData } = await octo.git.getCommit({
        owner,
        repo,
        commit_sha: commitSha,
    });
    return {
        commitSha,
        treeSha: commitData.tree.sha,
    };
};