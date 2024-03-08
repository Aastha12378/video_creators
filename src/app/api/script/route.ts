import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Video } from "@/models/video";
import { scriptType } from "@/constant";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { script, title } = await req.json();
  if (!script) {
    return NextResponse.json(
      { message: "Scipt is required" },
      { status: 400 }
    );
  }
  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }


  const assistantMsg =
    "You are the AI programming Expert";

  const userMsg = `You are tasked with generating some keywords for given script. So that i find related videos which are related to given scripts by using that keywords. This script is used for generating youtube video.
  
This video title is ${title}
This video script is ${script}

return output in given json format :{
  keywords:[], //it should be array of strings
}
**NOTE:-**
- always return json without any extra text

Output json is:
  `;

  const body = JSON.stringify({
    messages: [
      { role: "assistant", content: assistantMsg },
      { role: "user", content: userMsg },
    ],
    model: "gpt-3.5-turbo",
    stream: false,
  });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    const scriptData = JSON.parse(data?.choices?.[0]?.message?.content);

    // Connect to the MongoDB client
    await connectDB();

    // Insert the script into the collection
    const scriptDoc = new Video({
      script: script,
      keywords: scriptData.keywords,
      scriptType: scriptType.Script,
      title,
      userId: user.id,
    });
    console.log("file: route.ts:70  POST  scriptDoc:", scriptDoc);
    await scriptDoc.save();

    return NextResponse.json(scriptDoc, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
