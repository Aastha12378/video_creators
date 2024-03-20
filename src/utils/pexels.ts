import { IScene } from '@/types';
import { createClient, ErrorResponse, Photos, Videos } from 'pexels';
const client = createClient('hPds4JSGob2ANlkoFkky2tDoG77H1a8oCx6MOewnF5Evmldd1qsn8wP4');
    
export default async function fetcher(scenes:IScene[]){
  const promises = scenes.map(scene => {
    return client.videos.search({ query:scene.searchQuery, per_page: 3, orientation:"portrait" }).then((data: Videos | ErrorResponse) => {
      if ('videos' in data) {
        const sortedVideos = data.videos[0].video_files.sort((a,b)=>(a.width||1)-(b.width||0));
        return {sceneNumber:scene.sceneNumber,link:sortedVideos[1].link};
      } else {
        console.error(data.error);
        return {sceneNumber:scene.sceneNumber,link:""}
      }
    });
  });
  return Promise.all(promises).then(result =>{
    const updatedScenes = scenes.map(scene => ({
      ...scene,
      videoURL:result.find(res => res.sceneNumber === scene.sceneNumber)?.link || ""
    }))
    return updatedScenes
  })
}

export async function getThumbnail(searchQuery:string){
  return new Promise((resolve)=>{
    client.photos.search({ query:searchQuery, per_page: 3, orientation:"portrait" }).then((data: Photos | ErrorResponse) => {
      if ('photos' in data) {
        console.log("======= got the thumbnail =======", data.photos[0].src.landscape)
        resolve(data.photos[0].src.landscape)
      } else {
        resolve("")
      }
    });
  })
}