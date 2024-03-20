import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import { apiClient } from "@/utils/apiClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { scriptType } from "@/constant";

export const ScriptForm = () => {
  const [script, setScript] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    apiClient("/api/script/prompt", { script, title, type: scriptType.Script })
      .then((res: any) => {
        router.push(`/video/${res?._id}`);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-start p-2.5 mt-[20px]">
      <div className="flex flex-row items-center justify-start w-full">
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          <Text size="s" as="p" className="!text-white-A700">
            Enter your video title
          </Text>
          <TextArea
            size="xs"
            name="text_block"
            placeholder="title..."
            className="mt-[3px] text-blue_gray-200_01 w-full"
            value={title}
            onChange={(e: string) => setTitle(e)}
          />

          <Text size="s" as="p" className="!text-white-A700">
            Enter your script
          </Text>
          <TextArea
            name="text_block"
            placeholder="script..."
            className="mt-[3px] text-blue_gray-200_01 w-full"
            value={script}
            onChange={(e: string) => setScript(e)}
          />
        </div>
      </div>
      <Button onClick={handleClick} className="!rounded-md font-semibold min-w-[146px]">
        {loading ? 'Loading...' : 'Generate video'}
      </Button>
    </div>
  );
};
