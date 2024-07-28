import VideoConverter from "@/components/Video/VideoConverter";
import VideoEffects from "@/components/Video/VideoEffects";
import VideoPlayer from "@/components/Video/VideoPlayer";
import VideoStreamPlayer from "@/components/Video/VideoStreamPlayer";
import VideoThumbnailGenerator from "@/components/Video/VideoThumbnailGenerator";
import VideoUploader from "@/components/Video/VideoUploader";

function VideoTrimmer(props: { src: string; onTrim: (start, end) => void }) {
    return null;
}

function VideoApp() {
    return (
        <div>
            <VideoPlayer src="path/to/video.mp4" />
            <VideoThumbnailGenerator videoSrc="path/to/video.mp4" />
            <VideoUploader onUpload={(file) => console.log(file)} />
            <VideoConverter onConvert={(convertedFile) => console.log(convertedFile)} />
            <VideoTrimmer src="path/to/video.mp4" onTrim={(start, end) => console.log(start, end)} />
            <VideoStreamPlayer streamUrl="http://example.com/video-stream" />
            <VideoEffects src="path/to/video.mp4" onProcessed={(processedVideo) => console.log(processedVideo)} />
        </div>
    );
}

export default VideoApp;
