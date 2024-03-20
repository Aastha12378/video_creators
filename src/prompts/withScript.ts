export default function withScript({
  title,
  script,
}: {
  title: string;
  script: string;
}) {
  return `
  Your task is to generate a JSON structure for a video titled """${title}""" and its script is """${script}""". 
  The video should be divided into multiple possible scenes, each with a unique focus related to current video. Each scene should include a title, a text overlay from given script, a voiceover script, a specific search query for sourcing visuals from platforms like Pexels, Unsplash, or Pixabay, the type of resource needed (video/image), and an approximate duration for the voiceover audio in number. Ensure that all scenes are designed to maintain a cohesive visual and thematic style centered around """${title}-${script}""". Provide detailed descriptions for each scene as follows:

  1. Introduction: Set the stage with a {{introSceneBackground}}, introducing the topic. really small.
  2. [Each Subsequent Scene]: Develop the theme further 
  
  Ensure the search queries are carefully chosen to reflect each scene's theme and contribute to a consistent and cohesive visual narrative throughout the video.

  All scenes and its content should be really engaging with Video script.
  JSON structure should always be in below format.
  """{
    "videoTitle": "Engaging video title",
    "videoThumbnailSearchQuery" :"Search query to search in website to find the related thumbnail",
    "scenes": [
      {
        "sceneNumber": 1,
        "sceneTitle": "title of the scene",
        "textOverlay": "text that needs to be displayed",
        "voiceover": "Let's quiet the noise. Discover 5 steps to silence overthinking.",
        "searchQuery": "calm nature",
        "audioDurationApprox": 10
      },
      {...}
    ]
  }"""

  **NOTE:-**
- always return json without any extra text

Output json is:
  `;
}
