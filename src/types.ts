import { Video } from "pexels";

export type VideoDataType = {
  scriptType: number;
  script: string;
  keywords: string[];
  category: string;
  videoURL: string;
  voiceURL: string;
  title: string;
  suggestedVideos: Video[];
  scheduleTime?: Date;
  _id: string;
};

export type ScheduleDataType = {
  videoId: string;
  userId: string;
  scheduleTime: string;
  platform: Number;
  _id: string;
};
