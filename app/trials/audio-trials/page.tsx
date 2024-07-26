import AudioConverter from '@/components/Audio/AudioConverter';
import AudioEffects from '@/components/Audio/AudioEffects';
import AudioPlayer from '@/components/Audio/AudioPlayer';
import AudioRecorder from '@/components/Audio/AudioRecorder';
import AudioStreamPlayer from '@/components/Audio/AudioStreamPlayer';
import AudioUploader from '@/components/Audio/AudioUploader';
import AudioWaveform from '@/components/Audio/AudioWaveform';
import { Space } from '@mantine/core';



function AudioApp() {
    return (
        <div>
            <AudioPlayer src="path/to/audio.mp3" />
            <AudioWaveform src="path/to/audio.mp3" />
            <AudioConverter file={fileObject} onConvert={handleConvertedFile} />
            <AudioStreamPlayer streamUrl="http://example.com/audio-stream" />
            <AudioEffects src="path/to/audio.mp3" onProcessed={handleProcessedAudio} />
            <AudioRecorder />
            <AudioUploader />
        </div>
    );
}

export default AudioApp;
