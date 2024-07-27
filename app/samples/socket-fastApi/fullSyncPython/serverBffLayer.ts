// BFF Layer (Node.js/Express)
const express = require('express');
const axios = require('axios');
const app = express();

let sharedState = {};

app.get('/api/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const sendState = () => res.write(`data: ${JSON.stringify(sharedState)}\n\n`);
    const intervalId = setInterval(sendState, 1000);

    req.on('close', () => clearInterval(intervalId));
});

// Periodically fetch data from Python backend
setInterval(async () => {
    const { data } = await axios.get('http://python-backend/api/data');
    sharedState = data;
}, 5000);

app.listen(3000);



/* Python FastAPI backend

# Python Backend
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/data")
async def get_data():
    # Generate or fetch your data here
    return {"value": "some data"}
*/
