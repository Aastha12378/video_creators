import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CategoryForm = () => {
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    apiClient("/api/script", { category })
      .then((res: any) => {
        router.push(`/video/${res?._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-start p-2.5 mt-[20px]">
      <div className="flex flex-row items-center justify-start w-full">
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          <Text size="s" as="p" className="!text-white-A700">
            Enter your category
          </Text>
          <TextArea
            size="xs"
            name="text_block"
            placeholder="category..."
            className="mt-[3px] text-blue_gray-200_01 w-full"
            value={category}
            onChange={(e: string) => setCategory(e)}
          />
        </div>
      </div>
      <Button
        className="!rounded-md font-semibold min-w-[146px]"
        onClick={handleClick}
      >
        Generate script
      </Button>
    </div>
  );
};
