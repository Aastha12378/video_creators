"use client";

import React from "react";
import { Button } from "../../../../components/Button";
import Header from "../../../../components/Header";
import { Img } from "../../../../components/Img";
import { Text } from "../../../../components/Text";
import Sidebar from "@/components/Sidebar";
import { apiClient } from "@/utils/apiClient";
import { scriptType } from "@/constant";
import { VideoDataType } from "@/types";
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

export default async function DashboardPage({
  params,
}: {
  params: { videoId: string };
}) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<VideoDataType | null>(null);
  const [suggestedVideos, setSuggestedVideos] = React.useState<Video[]>([]);
  const [videoConfig, setVideoConfig] = React.useState<null | any>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const videoData: VideoDataType = await getData(params.videoId);
      setData(videoData);


      if (videoData.videoURL) {
        setStep(5);
        setSuggestedVideos(videoData.suggestedVideos)
      } else if (videoData.suggestedVideos?.length > 0) {
        setSuggestedVideos(videoData.suggestedVideos)
        setStep(3);
      } else if (videoData.script) {
        setStep(1);
      }
    };

    fetchData();
  }, [params.videoId]);

  const generateVideo = async () => {
    setStep(2)
    const client = createClient('hPds4JSGob2ANlkoFkky2tDoG77H1a8oCx6MOewnF5Evmldd1qsn8wP4');
    const query = data?.keywords?.join(',') || ""
    const orientation = "portrait"
    client.videos.search({ query, per_page: 10, orientation }).then(async (video) => {
      if ('videos' in video) {
        apiClient("/api/suggestedVideos", { videoId: params.videoId, suggestedVideos: video.videos }, "POST")
          .then((res: any) => { })
          .catch((err) => {
            console.log(err);
          });

        setSuggestedVideos(video.videos)
        setStep(3)
      }
    }).catch(err => {
      console.log(err)
    })
  };

  const onSelectVideo = (videoUrl: string) => {
    setStep(4)
    apiClient("/api/video/" + params.videoId, { videoURL: videoUrl }, "PATCH")
      .then((res: any) => {
        console.log(res)
        setData(res);
        setVideoConfig(res)
        if (res.videoURL) {
          setStep(5);
        }
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
          <div className="flex flex-row items-center justify-start pr-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end w-full">
              <Img
                src="/images/img_user_avatar_1.png"
                alt="user_avatar_One"
                className="h-[38px] object-cover rounded-lg"
              />
              <div className="bg-white-A700 flex flex-row items-center justify-start p-5 rounded-lg">
                <div className="flex flex-row items-center justify-start w-full">
                  {data?.scriptType === scriptType.Category && (
                    <Text as="p">
                      Create a content for this category: {data?.category}
                      <br />
                      My Video title is: {data.title}
                    </Text>
                  )}
                   {data?.scriptType === scriptType.Script && (
                    <Text as="p">
                      My Video title is: {data.title}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
          {step >= 1 && <div className="flex flex-row items-center justify-center pl-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end justify-between w-full">
              <div className="bg-teal-50 flex flex-col gap-2.5 items-center justify-start p-5 rounded-lg">
                <Text as="p">
                  Your script is:
                  <br />
                  {data?.script}
                </Text>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="bg-teal-100 flex flex-row items-center justify-evenly p-0.5 rounded-[12px] w-[10%]">
                    <Img
                      src="/images/img_smiley.svg"
                      alt="smiley"
                      className="h-5 w-5"
                    />
                    <Img
                      src="/images/img_smiley_sad.svg"
                      alt="smiley_sad"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex flex-row gap-5 items-center justify-between w-auto">
                    <Button
                      color="teal_100_01"
                      size="sm"
                      onClick={generateVideo}
                    >
                      Generate video
                    </Button>
                    {/* <Button
                      color="teal_100_01"
                      size="sm"
                      className="min-w-[153px]"
                    >
                      Generate Response
                    </Button>
                    <Button
                      color="teal_100_01"
                      size="sm"
                      className="min-w-[74px]"
                    >
                      Copy
                    </Button> */}
                  </div>
                </div>
              </div>
              <Img
                src="/images/img_chatgpt_avatar_1.png"
                alt="chatgpt_avatar"
                className="h-[38px] mt-[131px] object-cover rounded-lg"
              />
            </div>
          </div>}
          {step >= 2 && <div className="flex flex-row items-center justify-start pr-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end w-full">
              <Img
                src="/images/img_user_avatar_1.png"
                alt="user_avatar_One_One"
                className="h-[38px] object-cover rounded-lg"
              />
              <div className="bg-white-A700 flex flex-row items-center justify-start p-5 rounded-lg">
                <div className="flex flex-row items-center justify-start w-full">
                  <Text as="p">
                    Generate video for this script.
                  </Text>
                </div>
              </div>
            </div>
          </div>}
          {step >= 3 && <div className="flex flex-row items-center justify-center pl-[100px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end justify-between w-full">
              <div className="bg-teal-50 flex flex-col gap-2.5 items-start justify-start p-5 rounded-lg">
                {/* <Img
                  src="/images/img_frame_47688.png"
                  alt="frame_47688"
                  className="object-cover rounded-[15px] w-[89%]"
                /> */}
                <Text as="p">
                  Please select video of your choice
                </Text>
                <div className="grid grid-cols-3">
                  {
                    suggestedVideos?.map(video => {
                      return <div className="relative">
                        <video width="400" controls className="radius-[15px]">
                          <source src={`${video?.video_files?.[0]?.link}.mp4`} />
                          Your browser does not support HTML video.
                        </video>
                        <input onClick={() => onSelectVideo(`${video?.video_files?.[0]?.link}.mp4`)} type="checkbox" className="absolute top-[5px] right-[5px] w-[15px]" />
                      </div>
                    })
                  }
                </div>
              </div>
              <Img
                src="/images/img_chatgpt_avatar_1.png"
                alt="chatgpt_avatar_One"
                className="h-[38px] mt-[393px] object-cover rounded-lg"
              />
            </div>
          </div>}
          {step >= 4 && <div className="flex flex-row items-center justify-start pr-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end w-full">
              <Img
                src="/images/img_user_avatar_1.png"
                alt="user_avatar_One_One"
                className="h-[38px] object-cover rounded-lg"
              />
              <div className="bg-white-A700 flex flex-row items-center justify-start p-5 rounded-lg">
                <div className="flex flex-row items-center justify-start w-full">
                  <Text as="p">
                    I choose this video
                  </Text>
                </div>
              </div>
            </div>
          </div>}
          {step >= 5 && videoConfig && <div className="flex flex-row items-center justify-center pl-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end justify-between w-full">
              <div className="bg-teal-50 flex flex-col gap-2.5 items-start justify-start p-5 rounded-lg">
                <RemotionRoot videoProps={{
                  script: videoConfig.script,
                  voiceURL: videoConfig.absolutePath,
                  videoURL: videoConfig.videoURL
                }} />
                <div className="flex flex-row items-start justify-between w-full">
                  <div className="flex flex-row gap-5 items-center justify-between w-auto">
                    <Button
                      color="teal_100_01"
                      size="sm"
                      className="min-w-[96px]"
                    >
                      Download
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
