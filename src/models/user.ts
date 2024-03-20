import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: String,
  tokens: Object,
});
export const User = mongoose.models.User || mongoose.model("User", schema);
