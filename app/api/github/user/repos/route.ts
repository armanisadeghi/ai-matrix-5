import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        const repos = response.data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
        }));

        res.status(200).json(repos);
    } catch (error) {
        console.error("Error fetching repos:", error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
