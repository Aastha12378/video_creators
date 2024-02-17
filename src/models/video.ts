import mongoose from "mongoose";

const schema = new mongoose.Schema({
  scriptType: Number,
  script: String,
  category: String,
});
export const Video = mongoose.models.Video || mongoose.model("Video", schema);
