import mongoose from "mongoose";

export const Scene = new mongoose.Schema({
  "sceneNumber": Number,
  "sceneTitle":String,
  "textOverlay": String,
  "voiceover": String,
  "searchQuery": String,
  "resourceType": {
    type:String,
    enum:["video",'image'],
    default:"video"
  },
  "audioDurationApprox": Number,
  videoURL: String,
  voiceURL: String,
  absolutePath: String,
  voiceDuration:Number,
});

const schema = new mongoose.Schema({
  prompt: String,
  title: String,
  userId: String,
  scenes:[Scene],
  thumbnailURL:String
});
export const Video = mongoose.models.Video || mongoose.model("Video", schema);
