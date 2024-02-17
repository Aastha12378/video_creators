"use client";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-end pr-[30px] w-full">
      <div className="flex flex-row items-center justify-center pr-1 pt-1">
        <div className="flex flex-row items-center justify-evenly">
          <div className="flex flex-row gap-2 items-center justify-between w-full text-white-A700">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    </div>
  );
}
