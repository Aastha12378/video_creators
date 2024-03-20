import { IScene } from '@/types';
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

async function mp3Fetcher(script:string){
  console.log("script ==============> ",script)
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: script.split(".").join("\n\n"),
  });
  const fileName = `${+new Date}.mp3`
  const speechFile = path.resolve(
    `public/voice/${fileName}`
  );
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  return fileName
}

// Function to estimate duration
function estimateAudioDuration(wordCount:number) {
  // Average words per second ratio
  const averageRatio = 2.5;
  return wordCount / averageRatio;
}

export default async function voiceFetcher(scenes:IScene[]){
  const promises = scenes.map(scene => {
    return mp3Fetcher(scene.voiceover).then((voicePath: string) => ({sceneNumber:scene.sceneNumber,voicePath}));
  });
  return Promise.all(promises).then(result =>{
    const updatedScenes = scenes.map(scene =>  {
      const currentScene = result.find(res => res.sceneNumber === scene.sceneNumber)
      return {
        ...scene,
        voiceURL:`voice/${currentScene?.voicePath}`,
        absolutePath:`voice/${currentScene?.voicePath}`,
        audioDurationApprox:Math.ceil(estimateAudioDuration(scene.voiceover?.split(" ").length)+1.5)
      }
    })
    console.log(updatedScenes);
    return updatedScenes
  })
}