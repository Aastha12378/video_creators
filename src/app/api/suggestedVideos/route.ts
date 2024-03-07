import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Video } from "@/models/video";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { suggestedVideos, videoId } = await req.json();
  if (!suggestedVideos) {
    return NextResponse.json(
      { message: "videos is required" },
      { status: 400 }
    );
  }

  try {
    // Connect to the MongoDB client
    await connectDB();

    // Find the video by videoId and update its suggestedVideos
    await Video.findByIdAndUpdate(videoId, {
      $set: { suggestedVideos: suggestedVideos },
    });

    const data = { message: "Suggested videos updated successfully" };
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
