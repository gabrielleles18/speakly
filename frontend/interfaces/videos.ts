export interface Transcription {
    id: number;
    start: string;
    end: string;
    text: string;
}

export interface CategoryVideo {
    id: number;
    name: string;
    color: string;
}

export default interface VideosResource {
    id: number;
    youtube_url: string;
    title: string;
    channel: string;
    thumbnail: string;
    duration: string;
    transcription: Transcription[];
    category: CategoryVideo;
    created_at: string;
}