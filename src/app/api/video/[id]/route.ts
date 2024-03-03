import { Video } from "@/models/video";
import connectDB from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { VideoDataType } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = context.params;
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectDB();
  const video: VideoDataType | null = await (Video.findById(id)
    .lean()
    .exec() as Promise<VideoDataType | null>);
  console.log("file: route.ts:31  video:", video);
  if (!video) {
    return NextResponse.json({ message: "Video not found" }, { status: 404 });
  }

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: video.script.split(".").join("\n\n"),
  });
  const speechFile = path.resolve(
    `voice/${video?._id || "speech"}.mp3`
  );
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  return NextResponse.json({ ...video, voice: speechFile }, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = context.params;
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectDB();
  const videoUpdateData = await req.json();
  const video = (await Video.findByIdAndUpdate(
    id,
    { $set: videoUpdateData },
    { new: true }
  )
    .lean()
    .exec()) as VideoDataType;

  if (!video) {
    return NextResponse.json({ message: "Video not found" }, { status: 404 });
  }

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: video.script.split(".").join("\n\n"),
  });
  const speechFile = path.resolve(
    `public/voice/${video?._id || "speech"}.mp3`
  );
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  const updatedVideo = (await Video.findByIdAndUpdate(
    id,
    { $set: { voiceURL: speechFile,absolutePath:`voice/${video?._id || "speech"}.mp3` } },
    { new: true }
  )
    .lean()
    .exec()) as VideoDataType;

  return NextResponse.json(updatedVideo, { status: 200 });
}
