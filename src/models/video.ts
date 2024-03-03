import mongoose from "mongoose";

const schema = new mongoose.Schema({
  scriptType: Number,
  script: String,
  keywords: [String],
  category: String,
  videoURL: String,
  voiceURL: String,
  absolutePath:String
});
export const Video = mongoose.models.Video || mongoose.model("Video", schema);
