import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { path } = req.query;
    const fullPath = Array.isArray(path) ? path.join("/") : path;

    try {
        const response = await axios.get(`${GITHUB_API_URL}/${fullPath}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
