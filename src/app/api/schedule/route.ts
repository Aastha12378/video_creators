import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Video } from "@/models/video";
import { PlatFormType, scriptType } from "@/constant";
import { Schedule } from "@/models/schedule";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { selectedVideo, scheduleTime, platformType } = await req.json();
  if (!scheduleTime) {
    return NextResponse.json(
      { message: "scheduleTime is required" },
      { status: 400 }
    );
  }
  if (!selectedVideo) {
    return NextResponse.json(
      { message: "selectedVideo is required" },
      { status: 400 }
    );
  }

  try {
    // Connect to the MongoDB client
    await connectDB();

    // Check if the schedule already exists for the given videoId and userId
    let scriptDoc = await Schedule.findOne({
      videoId: selectedVideo._id,
      userId: user.id,
    });

    if (scriptDoc) {
      // If it exists, update the scheduleTime
      scriptDoc.scheduleTime = scheduleTime;
      scriptDoc.isUploaded = false;
    } else {
      // If it does not exist, create a new document
      scriptDoc = new Schedule({
        videoId: selectedVideo._id,
        userId: user.id,
        scheduleTime: scheduleTime,
        platform: platformType || PlatFormType.Youtube,
        isUploaded: false,
      });
    }

    await scriptDoc.save();

    return NextResponse.json(scriptDoc, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
