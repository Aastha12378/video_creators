import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import { scriptType } from "@/constant";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const PromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    apiClient("/api/script/prompt", { prompt, title, type: scriptType.Prompt })
      .then((res: any) => {
        router.push(`/video/${res?._id}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
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
            Enter your prompt
          </Text>
          <TextArea
            name="text_block"
            placeholder="prompt..."
            className="mt-[3px] text-blue_gray-200_01 w-full"
            value={prompt}
            onChange={(e: string) => setPrompt(e)}
          />
        </div>
      </div>
      <Button onClick={handleClick} className="!rounded-md font-semibold min-w-[146px]">
        {loading ? 'Loading...' : 'Generate script'}
      </Button>
    </div>
  );
};
