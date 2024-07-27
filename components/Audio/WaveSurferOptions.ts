// WaveSurferOptions.ts
export type WaveSurferOptions = {
    container: HTMLElement | string;
    height?: number | 'auto';
    width?: number | string;
    waveColor?: string | string[] | CanvasGradient;
    progressColor?: string | string[] | CanvasGradient;
    cursorColor?: string;
    cursorWidth?: number;
    barWidth?: number;
    barGap?: number;
    barRadius?: number;
    barHeight?: number;
    barAlign?: 'top' | 'bottom';
    minPxPerSec?: number;
    fillParent?: boolean;
    url?: string;
    peaks?: Array<Float32Array | number[]>;
    duration?: number;
    media?: HTMLMediaElement;
    mediaControls?: boolean;
    autoplay?: boolean;
    interact?: boolean;
    dragToSeek?: boolean | { debounceTime: number };
    hideScrollbar?: boolean;
    audioRate?: number;
    autoScroll?: boolean;
    autoCenter?: boolean;
    sampleRate?: number;
    splitChannels?: Array<Partial<WaveSurferOptions> & { overlay?: boolean }>;
    normalize?: boolean;
    plugins?: any[];
    renderFunction?: (peaks: Array<Float32Array | number[]>, ctx: CanvasRenderingContext2D) => void;
    fetchParams?: RequestInit;
    backend?: 'WebAudio' | 'MediaElement';
};

export type WaveSurferEvents = {
    init: [];
    load: [url: string];
    loading: [percent: number];
    decode: [duration: number];
    ready: [duration: number];
    redraw: [];
    redrawcomplete: [];
    play: [];
    pause: [];
    finish: [];
    timeupdate: [currentTime: number];
    audioprocess: [currentTime: number];
    seeking: [currentTime: number];
    interaction: [newTime: number];
    click: [relativeX: number, relativeY: number];
    dblclick: [relativeX: number, relativeY: number];
    drag: [relativeX: number];
    dragstart: [relativeX: number];
    dragend: [relativeX: number];
    scroll: [visibleStartTime: number, visibleEndTime: number, scrollLeft: number, scrollRight: number];
    zoom: [minPxPerSec: number];
    destroy: [];
    error: [error: Error];
};
