import AudioConverter from '@/components/Audio/AudioConverter';
import AudioEffects from '@/components/Audio/AudioEffects';
import AudioPlayer from '@/components/Audio/AudioPlayer';
import AudioRecorder from '@/components/Audio/AudioRecorder';
import AudioStreamPlayer from '@/components/Audio/AudioStreamPlayer';
import AudioUploader from '@/components/Audio/AudioUploader';
import AudioWaveform from '@/components/Audio/AudioWaveform';


function AudioApp() {
    return (
        <div>
            <AudioPlayer src="path/to/audio.mp3" />
            <AudioWaveform src="path/to/audio.mp3" />
            <AudioConverter />
            <AudioStreamPlayer streamUrl="http://example.com/audio-stream" />
            <AudioEffects src="path/to/audio.mp3" />
            <AudioRecorder />
            <AudioUploader />
        </div>
    );
}

export default AudioApp;
