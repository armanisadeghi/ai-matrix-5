import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { repoName, description, files } = req.body;

        try {
            // Step 1: Create a new repository
            const response = await octokit.repos.createForAuthenticatedUser({
                name: repoName,
                description: description || "",
                private: false,
            });

            // Step 2: Push files to the newly created repository
            const owner = response.data.owner.login;
            const repo = repoName;

            for (const file of files) {
                await octokit.repos.createOrUpdateFileContents({
                    owner,
                    repo,
                    path: file.path,
                    message: `Add ${file.path}`,
                    content: Buffer.from(file.content).toString("base64"), // Encode content in Base64
                });
            }

            res.status(200).json({ message: "Repository created and files uploaded successfully!" });
        } catch (error) {
            console.error("Error creating repository or pushing files:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
