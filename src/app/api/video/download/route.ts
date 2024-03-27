import { Video } from "@/models/video";
import connectDB from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { VideoDataType } from "@/types";
import {
  getFunctions,
  renderMediaOnLambda,
  getRenderProgress,
} from "@remotion/lambda/client";
export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
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

  const functions = await getFunctions({
    region: "us-east-1",
    compatibleOnly: true,
  });

  const functionName = functions[0].functionName;

  try {
    const { renderId, bucketName } = await renderMediaOnLambda({
      region: "us-east-1",
      functionName,
      serveUrl: process.env.LAMBDA_SERVE_URL as string,
      composition: "mainComposition",
      inputProps: { scenes: video.scenes },
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 20,
      privacy: "no-acl",
    });
    await Video.findByIdAndUpdate(video._id, {
      $set: { renderId, functionName },
    });
    console.log(renderId, bucketName);
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ ...video }, { status: 200 });
}
