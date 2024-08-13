// app/dashboard/intelligence/ai-chat/[id]/page.tsx
import ChatClientLogic from "./ChatClientLogic";

interface PageProps {
    params: { id: string };
}

export default function Page({ params }: PageProps) {
    const chatId = decodeURIComponent(params.id);

    return (
        <>
            <ChatClientLogic chatId={chatId} />
        </>
    );
}
