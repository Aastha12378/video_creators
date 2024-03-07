import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: any) {
  if (req.method === "POST") {
    // Your scheduled task logic here
    console.log("Scheduled task triggered");
    res.status(200).json({ message: "Task executed successfully" });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
