import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { TextArea } from "@/components/TextArea";

export const PromptForm = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-start p-2.5 mt-[20px]">
      <div className="flex flex-row items-center justify-start w-full">
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          <Text size="s" as="p" className="!text-white-A700">
            Enter your prompt
          </Text>
          <TextArea
            name="text_block"
            placeholder="prompt..."
            className="mt-[3px] text-blue_gray-200_01 w-full"
          />
        </div>
      </div>
      <Button className="!rounded-md font-semibold min-w-[146px]">
        Generate script
      </Button>
    </div>
  );
};
