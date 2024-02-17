import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Video } from "@/models/video";
import { scriptType } from "@/constant";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { category } = await req.json();
  if (!category) {
    return NextResponse.json(
      { message: "Category is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const assistantMsg =
    "You are the AI programming Expert, specializing in generating script for youtube video on given user's category.";

  const userMsg =
    "You are tasked with generating 15 sec script for my you tube video on " +
    category +
    " category.\n\nScript is:";

  const body = JSON.stringify({
    messages: [
      { role: "assistant", content: assistantMsg },
      { role: "user", content: userMsg },
    ],
    model: "gpt-3.5-turbo",
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    const script = data?.choices?.[0]?.message?.content;

    // Connect to the MongoDB client
    await connectDB();

    // Insert the script into the collection
    const scriptDoc = new Video({
      script,
      scriptType: scriptType.Category,
      category,
    });
    console.log("file: route.ts:70  POST  scriptDoc:", scriptDoc);
    await scriptDoc.save();

    return NextResponse.json(scriptDoc, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
