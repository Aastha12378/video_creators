"use client";
import React from "react";

import { Img } from "../../components/Img";
import { MenuItem } from "react-pro-sidebar";

interface Props {
  className?: string;
}

export default function DashboardButtons({ ...props }: Props) {
  return (
    <MenuItem
      {...props}
      icon={
        <div className="h-6 w-6">
          <Img
            src="images/img_vector.svg"
            alt="vector"
            className="h-[19px] mx-auto my-0.5 w-5"
          />
        </div>
      }
    >
      <div className="font-semibold mr-[65px] text-base text-center text-white-A700 w-[36%]">
        Create
      </div>
    </MenuItem>
  );
}
