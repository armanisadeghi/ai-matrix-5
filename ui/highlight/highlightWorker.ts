// highlightWorker.ts
import { CodeHighlight } from '@mantine/code-highlight';

self.onmessage = async (event) => {
    const { code, language } = event.data;
    //@ts-ignore
    const highlightedCode = await CodeHighlight.highlight(code, { language });
    self.postMessage(highlightedCode);
};
