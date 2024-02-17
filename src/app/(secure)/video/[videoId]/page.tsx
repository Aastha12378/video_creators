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
  const data: VideoDataType = await getData(params.videoId);

  const generateVideo = async () => {
    apiClient("/api/video/" + params.videoId)
      .then((res: any) => {
        console.log("file: page.tsx:44  .then  res:", res);
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
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center pl-[330px] w-[91%]">
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
          </div>
          <div className="flex flex-row items-center justify-start pr-[330px] w-[91%]">
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
          </div>
          <div className="flex flex-row items-center justify-center pl-[330px] w-[91%]">
            <div className="flex flex-row gap-2.5 items-end justify-between w-full">
              <div className="bg-teal-50 flex flex-col gap-2.5 items-start justify-start p-5 rounded-lg">
                <Img
                  src="/images/img_frame_47688.png"
                  alt="frame_47688"
                  className="object-cover rounded-[15px] w-[89%]"
                />
                <Text as="p">
                  Based on your given inputs, the video has been automatically
                  generated with a male voice. However, you have the option to
                  customize your video by selecting from the available options
                  below.
                </Text>
                <div className="flex flex-row items-start justify-between w-full">
                  <div className="bg-teal-100 flex flex-row items-center justify-evenly p-0.5 rounded-[12px] w-[10%]">
                    <Img
                      src="/images/img_smiley.svg"
                      alt="smiley_One"
                      className="h-5 w-5"
                    />
                    <Img
                      src="/images/img_smiley_sad.svg"
                      alt="smiley_sad_One"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex flex-row gap-5 items-center justify-between w-auto">
                    <Button
                      color="teal_100_01"
                      size="sm"
                      className="min-w-[96px]"
                    >
                      Download
                    </Button>
                    {/* <SelectBox
                      name="language"
                      placeholder="English"
                      options={dropDownOptions}
                      className="w-[35%]"
                    /> */}
                    {/* <Button color="teal_100_01" size="xs" className="w-[22px]">
                      <Img src="/images/img_save.svg" />
                    </Button> */}
                  </div>
                </div>
              </div>
              <Img
                src="/images/img_chatgpt_avatar_1.png"
                alt="chatgpt_avatar_One"
                className="h-[38px] mt-[393px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
