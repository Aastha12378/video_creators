import {
  AbsoluteFill,
  Sequence,
  Video,
  useVideoConfig,
  Audio, staticFile
} from "remotion";
import React, { useMemo } from "react";
import { loadFont } from "@remotion/google-fonts/Inter";
const { fontFamily } = loadFont();
import { AnimatedText } from "remotion-animate-text";
const animation = {
  delimiter: " ",
  opacity: [0, 1],
  x: [1, 0],
  y: [1, 0],
  scale: [0, 1],
  rotate: [45, 0],
  hideLoading: false,
  refRange: [0, 100], // can be any length and all other properties should also be of same length
  durations: [40, 50] // using this you can control for how long each part should animate in frames
};

const container: React.CSSProperties = {
  backgroundColor: "white",
};

const logo: React.CSSProperties = {
  justifyContent: "end",
  alignItems: "center",
  display: "flex"
};

export const Main = ({ script, voiceURL, videoURL }: any) => {
  const { fps } = useVideoConfig();

  const transitionStart = 8 * fps;

  return (
    <AbsoluteFill style={container}>
      <Video volume={0} src={videoURL} />
      <Audio volume={1} src={staticFile(voiceURL)} />
      <Sequence durationInFrames={transitionStart}>
        <AbsoluteFill style={logo}>
          <div style={{
            display: "flex",
            "background": "linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(0, 0, 0, 0.52))",
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "end"
          }}>
            <div style={{ color: "white", fontFamily }}>
              <AnimatedText duration={60} animation={animation}>{script}</AnimatedText></div>
          </div>
        </AbsoluteFill>
      </Sequence>
      {/* <Sequence from={transitionStart + transitionDuration / 2}>
        <AbsoluteFill style={logo}>
          <h1 style={titleStyle}>{title}</h1>
        </AbsoluteFill>
      </Sequence> */}
    </AbsoluteFill >
  );
};