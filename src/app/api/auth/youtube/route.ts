import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"],
  });
  console.log("authorizeUrl:", authorizeUrl);

  // const proxyResponse = await fetch(authorizeUrl);
  // const proxyResponseBody = await proxyResponse.text();

  // return new Response(proxyResponseBody, {
  //   status: proxyResponse.status,
  //   statusText: proxyResponse.statusText,
  //   headers: {
  //     "Content-Type": "text/html",
  //     // Add any additional headers if needed
  //   },
  // });
  return NextResponse.json({ authorizeUrl });
}
