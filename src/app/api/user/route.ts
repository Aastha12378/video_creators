import { ScheduleDataType, VideoDataType } from "@/types";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { Video } from "@/models/video";
import { currentUser } from "@clerk/nextjs";
import { Schedule } from "@/models/schedule";
import { User } from "@/models/user";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const userData = await User.find({ userId: user.id }).lean().exec();
  console.log("userData:", userData);

  if (!userData || userData?.length <= 0) {
    return NextResponse.json(
      { message: "No user authenticate" },
      { status: 200 }
    );
  }

  return NextResponse.json(userData?.[0] || {}, { status: 200 });
}
