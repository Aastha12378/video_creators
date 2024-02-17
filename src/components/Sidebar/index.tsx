"use client";
import React from "react";
import { Img } from "../Img";
import {
  MenuItem,
  Menu,
  Sidebar as ProSidebar,
  useProSidebar,
} from "react-pro-sidebar";
import { Button } from "../Button";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ProSidebar className="!sticky !w-[266px] h-screen overflow-auto bg-blue-800 top-[0]">
      <Img
        onClick={() => {
          collapseSidebar(!collapsed);
        }}
        src="/images/img_logo.svg"
        alt="logo"
        className="h-10 mt-8 mx-auto"
      />
      <Menu
        menuItemStyles={{
          button: {
            padding: "12px",
            gap: "10px",
            fontWeight: 600,
            fontSize: "16px",
            color: "#9ca3af",
            borderRadius: "10px",
            [`&:hover, &.ps-active`]: {
              color: "#ffffff",
              backgroundColor: "#252A41 !important",
            },
          },
        }}
        className="w-full h-full px-[20px]"
      >
        <div className="flex flex-col items-center justify-between mx-auto my-8 w-full h-full">
          <div className="flex flex-col gap-6 items-center justify-start w-full">
            {collapsed ? (
              <Button
                size="xl"
                className="flex flex-row gap-4 items-start justify-start w-full"
                onClick={() => router.push("/create")}
              >
                <Img
                  src="/images/img_vector.svg"
                  alt="vector"
                  className="h-[19px]"
                />
              </Button>
            ) : (
              <Button
                size="xl"
                className="flex flex-row gap-4 items-start justify-start w-full"
                leftIcon={
                  <Img
                    src="/images/img_vector.svg"
                    alt="vector"
                    className="h-[19px]"
                  />
                }
                onClick={() => router.push("/create")}
              >
                Create
              </Button>
            )}

            <div className="flex flex-col gap-[10px] justify-start pb-3 w-full">
              <MenuItem
                icon={
                  <div className="h-6 w-6">
                    <Img
                      src="/images/img_vector_white_a700.svg"
                      alt="vector_One"
                      className="h-[19px] mx-auto my-0.5 w-5"
                    />
                  </div>
                }
                active={pathname === "/"}
                href="/"
              >
                Home
              </MenuItem>
              <MenuItem
                icon={
                  <div className="h-6 w-6">
                    <Img
                      src="/images/img_vector_blue_gray_300.svg"
                      alt="vector_Two"
                      className="h-5 mx-auto my-0.5 w-5"
                    />
                  </div>
                }
              >
                Schedule
              </MenuItem>
            </div>
          </div>
          <div className="flex flex-row items-center justify-evenly w-full">
            <div className="flex flex-row items-center justify-evenly rounded-[12px] w-full">
              <SignOutButton>
                <MenuItem
                  icon={
                    <div className="h-6 w-6">
                      <Img
                        src="/images/img_icon_outline_logout.svg"
                        alt="icon_outline"
                        className="h-6 w-6"
                      />
                    </div>
                  }
                >
                  Logout
                </MenuItem>
              </SignOutButton>
            </div>
          </div>
        </div>
      </Menu>
    </ProSidebar>
  );
}
