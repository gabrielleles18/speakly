import VideosResource from './videos';

export interface User {
    id: number;
    name: string;
    email: string;
}

export default interface SentencesResource {
    id: number;
    sentence: string;
    translation: string;
    time_video_start: string;
    next_review_date: string;
    last_review_date: string;
    quality: number;
    ease_factor: number;
    interval: number;
    repetitions: number;
    enabled: boolean;
    video: VideosResource;
    user: User;
}