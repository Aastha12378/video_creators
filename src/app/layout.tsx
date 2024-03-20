"use client";
import React, { ReactNode, Suspense } from "react";
import "@/styles/tailwind.css";
import "@/styles/index.css";
import "@/styles/font.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Suspense fallback={<p>Loading...</p>}>
            {children}
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
export default RootLayout;
