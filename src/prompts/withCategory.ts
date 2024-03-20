export default function withCategory({category}:{category:string}){
  return `
  You are content creator for youtube, instagram and tiktok reels.
  Your task is to generate a JSON structure for a video category """${category}""". 
  The video should be divided into multiple possible scenes, each with a unique focus related to current video. Each scene should include a title, a text overlay, a voiceover script, a specific search query for sourcing visuals from platforms like Pexels, Unsplash, or Pixabay, the type of resource needed (video/image), and an approximate duration for the voiceover audio in number to speak that text. Ensure that all scenes are designed to maintain a cohesive visual and thematic style centered around """${category}""". 
  
  Since you only have very minimal input from the user which is only video "category", you need to make it really engaging content and articulated sentences.
  
  Provide detailed descriptions for each scene as follows:

  1. Introduction: Set the stage with a {{introSceneBackground}}, introducing the topic. really small.
  2. [Each Subsequent Scene]: Develop the theme further 
  
  Ensure the search queries are carefully chosen to reflect each scene's theme and contribute to a consistent and cohesive visual narrative throughout the video.

  Video script and all scenes and its content should be really engaging.
  JSON structure should always be in below format.
  """{
    "videoTitle": "Engaging video title",
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
  `
}