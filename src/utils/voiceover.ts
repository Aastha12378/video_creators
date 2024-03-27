import { IScene } from "@/types";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AwsRegion, getAwsClient } from "@remotion/lambda/client";
import { v4 } from "uuid";
import axios from "axios";
import AWS from "aws-sdk";
var s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const generatePresignedUrl = async (
  contentType: string,
  contentLength: number,
  expiresIn: number,
  bucketName: string,
  region: AwsRegion
): Promise<{ presignedUrl: string; readUrl: string }> => {
  if (contentLength > 1024 * 1024 * 200) {
    throw new Error(
      `File may not be over 200MB. Yours is ${contentLength} bytes.`
    );
  }

  const { client, sdk } = getAwsClient({
    region: "us-east-1" as AwsRegion,
    service: "s3",
  });

  const key = v4();

  const command = new sdk.PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentLength: contentLength,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(client, command, {
    expiresIn,
  });

  // The location of the assset after the upload
  const readUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

  return { presignedUrl, readUrl };
};

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

async function mp3Fetcher(script: string) {
  console.log("script ==============> ", script);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: script.split(".").join("\n\n"),
  });
  console.log("mp3 type =====>", mp3.type);
  const contentType = "audio/mp3" || "application/octet-stream";
  const arrayBuffer = await mp3.arrayBuffer();
  const contentLength = arrayBuffer.byteLength;
  const fileName = `${v4()}.mp3`;
  const data = await s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: fileName,
      Body: Buffer.from(arrayBuffer),
    })
    .promise();
  console.log(data.Key, data.Location);
  // const speechFile = path.resolve(`public/voice/${fileName}`);
  // const buffer = Buffer.from(await mp3.arrayBuffer());
  // await fs.promises.writeFile(speechFile, buffer);
  return data.Location;
}

// Function to estimate duration
function estimateAudioDuration(wordCount: number) {
  // Average words per second ratio
  const averageRatio = 2.5;
  return wordCount / averageRatio;
}

export default async function voiceFetcher(scenes: IScene[]) {
  const promises = scenes.map((scene) => {
    return mp3Fetcher(scene.voiceover).then((voicePath: string) => ({
      sceneNumber: scene.sceneNumber,
      voicePath,
    }));
  });
  return Promise.all(promises).then((result) => {
    const updatedScenes = scenes.map((scene) => {
      const currentScene = result.find(
        (res) => res.sceneNumber === scene.sceneNumber
      );
      return {
        ...scene,
        voiceURL: currentScene?.voicePath,
        absolutePath: `voice/${currentScene?.voicePath}`,
        audioDurationApprox: Math.ceil(
          estimateAudioDuration(scene.voiceover?.split(" ").length) + 1.5
        ),
      };
    });
    console.log(updatedScenes);
    return updatedScenes;
  });
}
