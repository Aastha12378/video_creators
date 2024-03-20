'use client'
import { apiClient } from "@/utils/apiClient";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page(props: any) {
  const router = useRouter();
  const apiCalled = useRef(false);

  React.useEffect(() => {
    console.log(props)
    if (props.searchParams?.code && !apiCalled.current) {
      apiCalled.current = true;
      apiClient("/api/auth/oauth2callback", { code: props.searchParams?.code })
        .then((res: any) => {
          router.push(res.redirectUrl || "/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.searchParams?.code])

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
}





