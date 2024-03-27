import { Composition } from 'remotion';
import { Main } from "../components/test/Main"
export const VIDEO_WIDTH = 360;
export const VIDEO_HEIGHT = Math.round(VIDEO_WIDTH * 16 / 9);

export const RemotionRoot: any = () => {
  return (
    <Composition
      component={Main}
      durationInFrames={25 * 30}
      fps={25}
      height={VIDEO_HEIGHT}
      width={VIDEO_WIDTH}
      id="mainComposition"
      defaultProps={{ scenes: [] }}
    />
  );
};
