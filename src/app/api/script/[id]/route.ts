import { Video } from "@/models/video";
import connectDB from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
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
  const video = await Video.findById(id).lean().exec();

  if (!video) {
    return NextResponse.json({ message: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(video, { status: 200 });
}
