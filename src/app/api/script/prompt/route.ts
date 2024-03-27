import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Video } from "@/models/video";
import { scriptType } from "@/constant";
import withPrompt from "@/prompts/withPrompt";
import fetcher, { getThumbnail } from "@/utils/pexels";
import voiceFetcher from "@/utils/voiceover";
import withCategory from "@/prompts/withCategory";
import withScript from "@/prompts/withScript";

function getPromptFromUserRequest({
  prompt,
  title,
  type,
  category,
  script,
}: any) {
  if (type === scriptType.Prompt) {
    return withPrompt({ title, description: prompt });
  } else if (type === scriptType.Category) {
    return withCategory({ category });
} else if (type === scriptType.Script) {
    return withScript({ title, script });
  }
}

function parseOpenAiResponse(content: string) {
  let dataString = content;
  if (content.startsWith("```json")) {
    const regex = /```json([\s\S]*?)```/g;
    let match = regex.exec(content);
    dataString = match ? match[1] : "{}";
    dataString.replace("```json", "").replace("```", "");
  }
  return JSON.parse(dataString || "{}");
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let { prompt, title, type, category, script } = await req.json();
  if (!type) {
    type = scriptType.Category;
    category = "Friend is blessing";
  }

  if (!prompt && type === scriptType.Prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 }
    );
  }

  if (!script && type === scriptType.Script) {
    return NextResponse.json(
      { message: "Script is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const assistantMsg =
    "You are the AI programming Expert, specializing in generating script for youtube video according to given instructions.";

  const body = JSON.stringify({
    messages: [
      { role: "assistant", content: assistantMsg },
      {
        role: "user",
        content: getPromptFromUserRequest({
          prompt,
          title,
          type,
          category,
          script,
        }),
      },
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
    console.log(data?.choices?.[0]?.message?.content);
    const scriptData = parseOpenAiResponse(
      data?.choices?.[0]?.message?.content || ""
    );

    // Connect to the MongoDB client
    await connectDB();
    const scenesWithResources = await fetcher(scriptData?.scenes);
    const finalScenes = await voiceFetcher(scenesWithResources);
    const thumbnailURL = await getThumbnail(
      scriptData?.videoThumbnailSearchQuery || scriptData?.scenes[0].searchQuery
    );
    console.log(finalScenes);

    // Insert the script into the collection
    const scriptDoc = new Video({
      prompt,
      title: scriptData?.videoTitle || title,
      userId: user.id,
      scenes: finalScenes || [],
      thumbnailURL,
      renderId: "asdf",
      functionName: "functionName",
    });
    await scriptDoc.save();

    return NextResponse.json(scriptDoc, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
