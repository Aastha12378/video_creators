'use client';
import { AbsoluteFill, Composition, registerRoot, } from "remotion";
import { Player } from "@remotion/player";
import { Main } from "./Main";
import React from "react";
import { IScene } from "@/types";
const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};
export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 360;
export const VIDEO_HEIGHT = Math.round(VIDEO_WIDTH * 16 / 9);
export const VIDEO_FPS = 25;
const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  width: VIDEO_WIDTH
};
const player: React.CSSProperties = {
  width: "100%",
};

export const RemotionRoot = ({ videoProps }: any) => {

  const durationInFrames = React.useMemo(() => {
    let totalSeconds = 0;
    (videoProps.scenes as IScene[]).map(scene => totalSeconds += scene.audioDurationApprox);
    return totalSeconds || 10
  }, [videoProps])

  return (
    <div style={container}>
      <div className="cinematics" style={outer}>
        <Player
          component={Main}
          inputProps={videoProps}
          durationInFrames={VIDEO_FPS * durationInFrames}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={player}
          controls
        // autoPlay
        // loop
        />
      </div>
    </div>
  );
};
registerRoot(RemotionRoot)
export default RemotionRoot