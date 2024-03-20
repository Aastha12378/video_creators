import mongoose from "mongoose";

const schema = new mongoose.Schema({
  videoId: String,
  userId: String,
  scheduleTime: String,
  platform: Number,
  isUploaded: Boolean,
});
export const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", schema);
