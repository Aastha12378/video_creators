import { NextRequest, NextResponse } from "next/server";
import { getRenderProgress } from "@remotion/lambda/client";

export async function POST(req: NextRequest) {
  const { renderId, functionName } = await req.json();
  console.log({ renderId, functionName });
  try {
    const progressData = await getRenderProgress({
      renderId: renderId,
      bucketName: process.env.S3_BUCKET_NAME as string,
      functionName: functionName,
      region: "us-east-1",
    });
    console.log(progressData.overallProgress);
    return NextResponse.json(progressData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
