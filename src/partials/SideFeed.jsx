/* eslint-disable react/prop-types */

import VideoCardRowSide from './VideoCardRowSide';
import VideoCardDump from './VideoCardDump';
import { useLoaderData } from 'react-router-dom';


function SideFeed() {
    const {videos,  type }= useLoaderData();
    return (
        <div className=' grid grid-cols-1 gap-4 py-0 sm:py-4 mx-2 w-full h-full'>
            {videos? 
                videos.map(video =>(
                    <>
                        {(video.id.videoId || (video.id && type !== "search")) &&
                        <VideoCardRowSide
                        id= {video.id.videoId}
                        imgLink= {video.snippet.thumbnails.high.url}
                        channelID = {video.snippet.channelId}
                        duration={video.contentDetails.duration}
                        videoTitle= {video.snippet.title} 
                        channelName= {video.snippet.channelTitle} 
                        viewsNum= {video.statistics.viewCount} 
                        period= {video.snippet.publishedAt}
                        /> }

                        {(video.id.channelId) &&
                        <></> }
                    </>
                )) 

                : 
                <>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                    <VideoCardDump row= {true}/>
                </>
            }
        </div>
        
    )
}

export default SideFeed