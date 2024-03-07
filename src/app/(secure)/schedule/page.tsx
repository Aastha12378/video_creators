"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { Heading } from "@/components/Heading";
import Header from "@/components/Header";

export default function DashboardPage() {

  return (
    <div className="bg-gray-900 flex flex-row items-start w-full">
      <Sidebar />
      <div className="bg-gray-900 flex flex-col items-center justify-end pt-4 w-[82%]">
        <Header />
        <div className="bg-blue_gray-800 h-px mt-5 w-full" />
        <div className="flex flex-col gap-[50px] items-start justify-start mt-[19px] p-[50px] w-full">
          <Heading className="!text-white-A700" size="lg">Schedule</Heading>
        </div>
        <div className="w-full px-[50px] py-[20px] grid grid-cols-3 gap-4">
        </div>
      </div>
    </div>
  );
}
