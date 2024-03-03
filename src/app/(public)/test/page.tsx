'use client';
import { AbsoluteFill, Composition, registerRoot, } from "remotion";
import { Player } from "@remotion/player";
import { Main } from "./Main";
const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};
export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 226;
export const VIDEO_HEIGHT = 426;
export const VIDEO_FPS = 25;
const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
  width: VIDEO_WIDTH
};
const player: React.CSSProperties = {
  width: "100%",
};

export const RemotionRoot = ({ videoProps }: any) => {
  return (
    <div style={container}>
      <div className="cinematics" style={outer}>
        <Player
          component={Main}
          inputProps={videoProps}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={player}
          // controls
          autoPlay
          loop
        />
      </div>
    </div>
  );
};
registerRoot(RemotionRoot)
export default RemotionRoot