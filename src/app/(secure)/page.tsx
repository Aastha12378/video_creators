"use client";
import React from "react";
import Header from "../../components/Header";
import { Text } from "../../components/Text";
import Sidebar from "@/components/Sidebar";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function DashboardPage() {
  return (
    <div className="bg-gray-900 flex flex-row items-start w-full">
      <Sidebar />
      <div className="bg-gray-900 flex flex-col items-center justify-end pt-4 w-[82%]">
        <Header />
        <div className="bg-blue_gray-800 h-px mt-5 w-full" />
        <div className="flex flex-col gap-[50px] items-center justify-start mt-[19px] p-[50px] w-full">
          <Text className="text-white-A700">Video List</Text>
        </div>
      </div>
    </div>
  );
}
