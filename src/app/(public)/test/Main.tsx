import {
  AbsoluteFill,
  Video,
  useVideoConfig,
  Audio, staticFile,
  prefetch,
  Series
} from "remotion";
import React, { useMemo } from "react";
import { loadFont } from "@remotion/google-fonts/Kalam";
const { fontFamily } = loadFont();
import { IScene } from "@/types";

const container: React.CSSProperties = {
  backgroundColor: "white",
};

const logo: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex"
};

export const Main = ({ scenes }: { scenes: IScene[] }) => {
  const { fps } = useVideoConfig();
  // const transitionStart = 8 * fps;

  React.useEffect(() => {
    console.log({ scenes })
    const freeFunctions: Function[] = [];
    scenes.map((scene, index) => {
      if (index > 0) {
        // prefetch videos to avoid the flickering after the first one, as first one will be auto played 
        const { free } = prefetch(scene.videoURL, {
          method: "blob-url",
        });
        freeFunctions.push(free)
      }
    })
  }, [scenes])
  return (
    <div style={container}>
      <Series>
        {scenes.map((scene, index) => (
          <Series.Sequence key={index} durationInFrames={fps * (scene.audioDurationApprox || 2.5)}>
            <AbsoluteFill style={logo}>
              {scene.voiceURL && <Audio volume={1} src={staticFile(scene.voiceURL)} />}
              <Video loop volume={0} src={scene.videoURL} />
              <div style={{
                display: "flex",
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "end",
                marginBottom: 20,
                position: "absolute",
                fontSize: 25,
                letterSpacing: 1,
                textAlign: "center",
                padding: 10
              }}>
                <div style={{ color: "white", fontFamily }}>
                  {scene.textOverlay}
                </div>
              </div>
            </AbsoluteFill>
          </Series.Sequence>
        ))}
      </Series>
    </div>
  );
};
