"use client";
import React from "react";

import { Img } from "../../components/Img";
import { MenuItem } from "react-pro-sidebar";

interface Props {
  className?: string;
}

export default function DashboardMenu({ ...props }: Props) {
  return (
    <MenuItem
      {...props}
      icon={
        <div className="h-6 w-6">
          <Img
            src="images/img_vector_white_a700.svg"
            alt="vector_One"
            className="h-[19px] mx-auto my-0.5 w-5"
          />
        </div>
      }
    >
      <div className="font-semibold text-base text-left text-white-A700 w-[22%]">
        Home
      </div>
    </MenuItem>
  );
}
