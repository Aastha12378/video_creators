"use client";

import React from "react";
import { Button } from "../../../../components/Button";
import Header from "../../../../components/Header";
import { Img } from "../../../../components/Img";
import { Text } from "../../../../components/Text";
import Sidebar from "@/components/Sidebar";
import { apiClient } from "@/utils/apiClient";
import { scriptType } from "@/constant";
import { IScene, VideoDataType } from "@/types";
import { createClient, Video } from 'pexels';
import RemotionRoot from "@/app/(public)/test/page";

async function getData(videoId: string) {
  const res = (await apiClient(
    "/api/script/" + videoId,
    {},
    "GET",
  )) as VideoDataType;
  return res;
}
interface IProps {
  params: {
    videoId: string
  }
}
export default async function DashboardPage(props: IProps) {
  if (!props?.params) return null
  const params = props?.params || {}
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<VideoDataType | null>(null);
  const [suggestedVideos, setSuggestedVideos] = React.useState<Video[]>([]);
  const [videoConfig, setVideoConfig] = React.useState<null | any>(null)
  const [scenes, setScenes] = React.useState<IScene[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const videoData = await getData(params.videoId) as any;
      console.log(videoData)
      setScenes(videoData?.scenes || []);
      setStep(5)
    };

    fetchData();
  }, [params.videoId]);

  const generateVideo = async () => {
    apiClient("/api/video/download", { id: params.videoId })
      .then((res: any) => {
        console.log(res);
        alert("Your video is set to download, visit Home page to see if it's done.")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-900 flex flex-row items-start w-full">
      <Sidebar />
      <div className="bg-gray-900 flex flex-col items-center justify-end pt-4 w-[82%]">
        <Header />
        <div className="bg-blue_gray-800 h-px mt-5 w-full" />
        <div className="flex flex-col gap-[50px] items-center justify-start mt-[19px] p-[50px] w-full">
          {step >= 5 && scenes.length > 0 && <div className="flex flex-row items-center justify-center pl-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end justify-end w-full">
              <div className="bg-teal-50 flex flex-col gap-2.5 items-start justify-start p-5 rounded-lg w-[400px]">
                <RemotionRoot videoProps={{ scenes }} />
                <div className="flex flex-row items-start justify-between w-full">
                  <div className="flex flex-row gap-5 items-center justify-between w-auto">
                    <Button
                      color="teal_100_01"
                      size="sm"
                      className="min-w-[96px]"
                      onClick={generateVideo}
                    >
                      Schedule Download
                    </Button>
                  </div>
                </div>
              </div>
              <Img
                src="/images/img_chatgpt_avatar_1.png"
                alt="chatgpt_avatar_One"
                className="h-[38px] mt-[393px] object-cover rounded-lg"
              />
            </div>
          </div>}
        </div>
      </div>
    </div >
  );
}
