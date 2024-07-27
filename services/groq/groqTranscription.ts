import fs from 'fs';
import { groq } from '@/services/groq/client';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

async function preprocessAudio(inputFile: string): Promise<string> {
    const outputFile = path.join(path.dirname(inputFile), `preprocessed_${path.basename(inputFile)}`);
    const command = `ffmpeg -i "${inputFile}" -ar 16000 -ac 1 -map 0:a: "${outputFile}" -y`;

    try {
        await execAsync(command);
        return outputFile;
    } catch (error) {
        console.error(`Error preprocessing ${inputFile}:`, error);
        throw error;
    }
}

async function groqTranscription(inputFile: string): Promise<string> {
    const preprocessedFile = await preprocessAudio(inputFile);

    try {
        const { text } = await groq.audio.transcriptions.create({
            file: fs.createReadStream(preprocessedFile),
            model: 'whisper-large-v3',
            response_format: 'json',
            temperature: 0.0,
        });
        return text;
    } finally {
        fs.unlink(preprocessedFile, (err) => {
            if (err) console.error(`Error deleting ${preprocessedFile}:`, err);
        });
    }
}

async function groqTranslation(inputFile: string): Promise<string> {
    const preprocessedFile = await preprocessAudio(inputFile);

    try {
        const { text } = await groq.audio.translations.create({
            file: fs.createReadStream(preprocessedFile),
            model: 'whisper-large-v3',
            response_format: 'json',
            temperature: 0.0,
        });
        return text;
    } finally {
        fs.unlink(preprocessedFile, (err) => {
            if (err) console.error(`Error deleting ${preprocessedFile}:`, err);
        });
    }
}

async function GroqWithPrompt() {
    const transcription = await groq.audio.transcriptions.create({
        file: fs.createReadStream("audio.m4a"),
        model: "whisper-large-v3",
        prompt: "Arman Sadeghi\nAI Matrix Engine",
        language: "en",
        response_format: "verbose_json",
    });
    console.log(transcription.text);
}



export { groqTranscription, groqTranslation };

