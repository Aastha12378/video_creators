import { ScheduleDataType, VideoDataType } from "@/types";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { Video } from "@/models/video";
import { currentUser } from "@clerk/nextjs";
import { Schedule } from "@/models/schedule";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const videos: VideoDataType[] = (await Video.find({ userId: user.id })
    .lean()
    .exec()) as VideoDataType[];

  if (!videos || videos.length === 0) {
    return NextResponse.json({ message: "No videos found" }, { status: 404 });
  }

  // Retrieve scheduleTime for each video and add it to the video data
  const videosWithSchedule = await Promise.all(
    videos.map(async (video) => {
      const schedule = (await Schedule.findOne({ videoId: video._id })
        .lean()
        .exec()) as ScheduleDataType;
      return {
        ...video,
        scheduleTime: schedule ? schedule.scheduleTime : null,
      };
    })
  );

  return NextResponse.json(videosWithSchedule, { status: 200 });
}
