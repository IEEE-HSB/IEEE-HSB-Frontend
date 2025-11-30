import { ReactNode } from "react";

export interface Podcast{
    id: number,
    title: string,
    description?: string,
    episodeNum?: number,
    by?: string,
    episode: ReactNode,
    chapterId: string,
}