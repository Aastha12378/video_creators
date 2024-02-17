"use client";
import React from "react";

import { Heading } from "../../components/Heading";
import { Img } from "../../components/Img";

interface Props {
  className?: string;
  logouttext?: string;
}

export default function DashboardMenu1({
  logouttext = "Logout",
  ...props
}: Props) {
  return (
    <div {...props}>
      <div className="bg-blue_gray-900_01 flex flex-row items-center justify-start p-2 rounded-[12px] w-full">
        <div className="flex flex-row gap-4 items-start justify-start ml-2 w-[43%]">
          <Img
            src="images/img_icon_outline_logout.svg"
            alt="icon_outline"
            className="h-6 w-6"
          />
          <Heading size="s" as="h6" className="!text-blue_gray-200 mt-[3px]">
            {logouttext}
          </Heading>
        </div>
      </div>
    </div>
  );
}
