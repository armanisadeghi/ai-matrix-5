import { getAudio } from '@/utils/speech/deepgram/deepgramStream';
import useDeepgram from '@/utils/speech/deepgram/useDeepgram';
import useDeepgramTTS from '@/utils/speech/deepgram/useDeepgramTTS';
import React, { useRef } from 'react';
import AmeActionIcon from '@/ui/button/AmeActionIcon';
import { TbCopy, TbFileText, TbMicrophone2, TbSpeakerphone, TbRefresh, TbMessageCircle, TbStar } from 'react-icons/tb';
import { MdSaveAlt } from 'react-icons/md';

interface ActionButtonRowProps {
    textRef: React.RefObject<string | null>;
}

const ActionButtonRow: React.FC<ActionButtonRowProps> = ({textRef}) => {
    const { generateSpeech, isLoading, error, audioUrl } = useDeepgram();


    const handleCopyPlainText = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(textRef.current);
            alert('Plain text copied to clipboard!');
        }
    };

    const handleCopyFormatted = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(`<pre>${textRef.current}</pre>`);
            alert('Formatted text copied to clipboard!');
        }
    };

    const handleSave = () => {
        if (textRef.current) {
            // Implement save logic
            console.log('Save:', textRef.current);
        }
    };

    const handleSpeak = async () => {
        if (textRef.current) {
            console.log('Speak:', textRef.current);
            await generateSpeech(textRef.current);
        }
    };

    const handleRegenerate = () => {
        // Implement regenerate logic
        console.log('Regenerate requested');
    };

    const handleReply = () => {
        // Implement reply logic
        console.log('Reply requested');
    };

    const handleStarRating = () => {
        // Implement star rating logic
        console.log('Star rating given');
    };

    return (
        <div style={{display: 'flex', gap: '0.5rem'}}>
            <AmeActionIcon size="xs" title="Copy plain Text" onClick={handleCopyPlainText}>
                <TbCopy/>
            </AmeActionIcon>
            <AmeActionIcon size="xs" title="Copy Formatted" onClick={handleCopyFormatted}>
                <TbFileText/>
            </AmeActionIcon>
            <AmeActionIcon size="xs" title="Save" onClick={handleSave}>
                <MdSaveAlt/>
            </AmeActionIcon>
            <AmeActionIcon size="xs" title="Speak" onClick={handleSpeak}>
                <TbSpeakerphone/>
            </AmeActionIcon>
            <AmeActionIcon
                size="xs"
                title="Transcribe and Summarize"
            >
                <TbMicrophone2/>
            </AmeActionIcon>
            <AmeActionIcon size="xs" title="Regenerate" onClick={handleRegenerate}>
                <TbRefresh/>
            </AmeActionIcon>
            <AmeActionIcon size="xs" title="Reply" onClick={handleReply}>
                <TbMessageCircle/>
            </AmeActionIcon>
            <AmeActionIcon size="xs" title="Star Rating" onClick={handleStarRating}>
                <TbStar/>
            </AmeActionIcon>
        </div>
    );
};

export default ActionButtonRow;
