"use client";
import React from "react";
import Header from "../../components/Header";
import Sidebar from "@/components/Sidebar";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { VideoDataType } from "@/types";
import { apiClient } from "@/utils/apiClient";
import { PlatFormType, scriptType } from "@/constant";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from "@/components/Button";
import Modal from 'react-modal';
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const [data, setData] = React.useState<VideoDataType[]>([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [scheduleTime, setScheduleTime] = React.useState<Date | null>(null);
  const [selectedVideo, setSelectedVideo] = React.useState<VideoDataType | {}>({});
  const [loading, setLoading] = React.useState(true)
  const router = useRouter();
  const [authenticationModalOpen, setAuthenticationModal] = React.useState(false);
  const { user } = useUser();
  const [isAuthenticating, setAuthenticating] = React.useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const videoData = (await apiClient(
        "/api/video",
        {},
        "GET",
      )) as VideoDataType[];
      setLoading(false)
      setData(videoData);
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const openScheduleModal = (event: React.MouseEvent<HTMLButtonElement>, video: VideoDataType) => {
    //check for authentication
    event.stopPropagation();
    apiClient("/api/user", {}, 'GET')
      .then((res: any) => {
        if (res.userId) {
          if (video.scheduleTime) {
            const date = new Date(video.scheduleTime);
            setScheduleTime(date);
          }
          setSelectedVideo(video);
          setModalIsOpen(true);
        } else {
          console.log("--------")
          setAuthenticationModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onScheduleTime = () => {
    apiClient("/api/schedule", { selectedVideo, scheduleTime, platformType: PlatFormType.Youtube })
      .then((res: any) => {
        setModalIsOpen(false)
        fetchData()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onAuthenticate = () => {
    setAuthenticating(true)
    apiClient("/api/auth/youtube", {}, 'GET', { userId: user?.id })
      .then((res: any) => {
        console.log('.then  res:', res)
        // if (res.redirect) {
        //   window.open(res.redirect, '_blank');
        // }
        window.location.href = res.authorizeUrl;
      })
      .catch((err) => {
        console.log('err=>', err);
      }).finally(() => {
        setAuthenticating(false)
      });
  }

  return (
    <div className="bg-gray-900 flex flex-row items-start w-full">
      <Sidebar />
      <div className="bg-gray-900 flex flex-col items-center justify-end pt-4 w-[82%]">
        <Header />
        <div className="bg-blue_gray-800 h-px mt-5 w-full" />
        <div className="flex flex-col gap-[50px] items-start justify-start mt-[19px] p-[50px] w-full">
          <Heading className="!text-white-A700" size="lg">Video List</Heading>
        </div>
        {loading && <div><Text className="!text-white-A700 mt-2">Loading...</Text></div>}
        {!loading && data?.length <= 0 && <div><Text className="!text-white-A700 mt-2">No videos found</Text></div>}
        <div className="w-full px-[50px] py-[20px] grid grid-cols-3 gap-4">
          {
            data?.map((d, index) => {
              return <div key={index} className="w-full cursor-pointer" onClick={() => router.push(`/video/${d?._id}`)}>
                {d?.thumbnailURL ? <img style={{ height: 200 }} src={d?.thumbnailURL} /> : <div className="h-[200px] radius-[15px] bg-gray-800"></div>}
                {d.scriptType === scriptType.Category && <Text className="!text-white-A700 mt-2"><b>Category:</b> {d.category}</Text>}
                <Text className="!text-white-A700 mt-2" > <b>Title:</b> {d.title}</Text>
                <Button color="teal_100_01"
                  size="sm"
                  onClick={(event) => openScheduleModal(event, d)}
                >Schedule posting</Button>
              </div>
            })
          }
        </div>
      </div >
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Schedule Posting Date"
      >
        <div className="bg-gray-900 w-full h-full p-[40px]">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Heading size="lg" className="!text-white-A700">
              Schedule Posting Date
            </Heading>
            <button onClick={() => setModalIsOpen(false)}>
              <span className="text-2xl font-semibold text-white-A700">&times;</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-[20px]">
            <Text size="s" as="p" className="!text-white-A700">
              Please select posting time
            </Text>
            <DatePicker
              className="mt-[3px] bg-gray-50 p-3 text-sm text-blue_gray-200_01 w-[30%]"
              placeholderText="select time"
              selected={scheduleTime}
              onChange={(date: Date | null) => {
                if (date instanceof Date || date === null) {
                  setScheduleTime(date);
                }
              }}
              showTimeSelect
              dateFormat="Pp"
            />
            <Button className="!rounded-md font-semibold w-[100px]" onClick={() => onScheduleTime()}>Submit</Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={authenticationModalOpen}
        onRequestClose={() => setAuthenticationModal(false)}
        contentLabel="Authentication"
      >
        <div className="bg-gray-900 w-full h-full p-[40px]">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Heading size="lg" className="!text-white-A700">
              Authentication
            </Heading>
            <button onClick={() => setAuthenticationModal(false)}>
              <span className="text-2xl font-semibold text-white-A700">&times;</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-[20px]">
            <Text size="s" as="p" className="!text-white-A700">
              For Scheduling video upload needs to access your Google Account
            </Text>
            <Button className="!rounded-md font-semibold w-[200px]" onClick={() => onAuthenticate()}>{isAuthenticating ? 'Loading...' : `Authentication`}</Button>
          </div>
        </div>
      </Modal>
    </div >
  );
}
