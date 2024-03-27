"use client"
import { useRouter } from "next/navigation";
import { Text } from "../Text";
import { scriptType } from "@/constant";
import { Button } from "../Button";
import React from "react";
import { apiClient } from "@/utils/apiClient";

// Download url will be in below format,
// https://s3.us-east-1.amazonaws.com/remotionlambda-useast1-4dgs67xvqf/renders/l977j7lwxu/out.mp4
// us-east-1 : region Name (can be static value)
// remotionlambda-useast1-4dgs67xvqf : bucket name (from .env, process.env.S3_BUCKET_NAME)
// l977j7lwxu : render Id (will be stored in video model in database)

export default function VideoCard({ data: d, openScheduleModal }: any) {
  const router = useRouter();

  const [progress, setProgress] = React.useState(0);
  const [isDownloaded, setIsDownloaded] = React.useState(true);
  const intervalRef = React.useRef<any>(null);

  React.useEffect(() => {
    console.log(d.renderId, d.functionName)
    intervalRef.current = setInterval(async () => {
      if (d.renderId && d.renderId !== "asdf" && d.functionName) {
        console.log("asdf", d.renderId, process.env.S3_BUCKET_NAME, d.functionName);
        apiClient("/api/video/getRenderStatus", { renderId: d.renderId, functionName: d.functionName }, "POST")
          .then((res: any) => {
            if (res.overallProgress >= 1) {
              clearInterval(intervalRef.current)
              setProgress(res.overallProgress * 100)
              setIsDownloaded(true)
            } else {
              setProgress(res.overallProgress * 100)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 2000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [d.renderId, d.functionName]);

  return (
    <div className="w-full cursor-pointer" onClick={() => router.push(`/video/${d?._id}`)}>
      {d?.thumbnailURL ? <img style={{ height: 200 }} src={d?.thumbnailURL} /> : <div className="h-[200px] radius-[15px] bg-gray-800"></div>}
      {d.scriptType === scriptType.Category && <Text className="!text-white-A700 mt-2"><b>Category:</b> {d.category}</Text>}
      <Text className="!text-white-A700 mt-2" > <b>Title:</b> {d.title}</Text>
      <div className="flex gap-5 items-center">
        <Button color="teal_100_01"
          size="sm"
          className="min-w-[130px]"
          onClick={(event: any) => openScheduleModal(event, d)}
          disabled={!isDownloaded}
        >Schedule posting</Button>
        {
          !isDownloaded &&
          <div className="relative w-full h-2 bg-gray-200 rounded">
            <div className="absolute left-0 top-0 h-2 bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
          </div>
        }
      </div>
    </div>
  )
}