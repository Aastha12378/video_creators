import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { google } from "googleapis";
import connectDB from "@/utils/db";
import { User } from "@/models/user";

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export async function GET(req: any, res: any) {
  console.log("-----------");
  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const code = urlParams.get("code");
  // let { code } = await req.json();
  const user = await currentUser();

  const userData = await User.find({ userId: user?.id })
    .lean()
    .exec();

  if (code  && (!userData || userData?.length <= 0)) {
    const { tokens } = await oauth2Client.getToken(code);

    // Connect to the MongoDB client
    await connectDB();

    // Insert the script into the collection
    const scriptDoc = new User({
      tokens: tokens,
      userId: user?.id,
    });
    await scriptDoc.save();

    // return NextResponse.json({ redirectUrl: "/" }, { status: 200 });

    return NextResponse.redirect("http://localhost:3000/schedule", 307);
  }
}
