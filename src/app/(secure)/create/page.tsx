"use client";
import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CategoryForm } from "./Category";
import { PromptForm } from "./Prompt";
import { ScriptForm } from "./Script";

export default function CategoryPage() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className="bg-gray-900 flex flex-row items-start w-full">
      <Sidebar />
      <div className="bg-gray-900 flex flex-col items-center justify-end pt-4 w-[82%]">
        <Header />
        <div className="bg-blue_gray-800 h-px mt-5 w-full" />
        <div className="flex flex-row items-center justify-center mt-[19px] p-[50px] w-full">
          <div className="flex flex-col gap-5 items-center justify-start p-2.5 w-[37%]">
            <Tabs
              className="w-full"
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
              selectedTabClassName="!rounded-md bg-blue-A700 text-white-A700"
            >
              <TabList className="bg-gray-800 flex flex-row items-center justify-start rounded-lg w-full">
                <Tab className="p-[10px] text-center font-semibold leading-[17px] text-sm font-inter w-full text-white-A700">
                  From prompt
                </Tab>
                <Tab className="p-[10px] text-center font-semibold leading-[17px] text-sm font-inter w-full text-white-A700">
                  From script
                </Tab>
                <Tab className="p-[10px] text-center font-semibold leading-[17px] text-sm font-inter w-full text-white-A700">
                  From category
                </Tab>
              </TabList>
              <TabPanel>
                <PromptForm />
              </TabPanel>
              <TabPanel>
                <ScriptForm />
              </TabPanel>
              <TabPanel>
                <CategoryForm />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
