// import {registerRoot,Composition as Compose} from 'remotion';
// import {Main} from "./components/test/Main"
// export const VIDEO_WIDTH = 360;
// export const VIDEO_HEIGHT = Math.round(VIDEO_WIDTH * 16 / 9);

// const Test:any = () => {
// 	return (
//     <Compose
//     component={Main}
//     // durationInFrames={VIDEO_FPS * durationInFrames}
//     fps={25}
//     height={VIDEO_HEIGHT}
//     width={VIDEO_WIDTH}
//     id="mainComposition"
//     defaultProps={{ scenes: [] }}
//   />
// 	);
// };

// registerRoot();

// This is your entry file! Refer to it when you render:
// npx remotion render <entry-file> HelloWorld out/video.mp4

import {registerRoot} from 'remotion';
import {RemotionRoot} from './render';

registerRoot(RemotionRoot);