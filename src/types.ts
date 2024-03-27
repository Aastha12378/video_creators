import { Video } from "pexels";

export type VideoDataType = {
  scriptType: number;
  thumbnailURL:string;
  script: string;
  keywords: string[];
  category: string;
  videoURL: string;
  voiceURL: string;
  title: string;
  suggestedVideos: Video[];
  scheduleTime?: Date;
  prompt:string;
  scenes:IScene[];
  _id: string;
};

export type ScheduleDataType = {
  videoId: string;
  userId: string;
  scheduleTime: string;
  platform: Number;
  _id: string;
};

export interface IScene {
  sceneNumber: number;
  sceneTitle: string;
  textOverlay: string;
  voiceover: string;
  searchQuery: string;
  resourceType: "video" | "image";
  audioDurationApprox: number;
  videoURL: string;
  voiceURL: string;
  absolutePath: string;
  voiceDuration:number;
  thumbnailURL:string
}