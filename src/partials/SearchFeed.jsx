/* eslint-disable react/prop-types */

import VideoCardRow from './VideoCardRow';
import ChannelCardRow from './ChannelCardRow';
import VideoCardDump from './VideoCardDump';
import { useLoaderData } from 'react-router-dom';


function SearchFeed() {
    const {videos,  type }= useLoaderData();
    console.log(videos);
    return (
        <div className=' grid grid-cols-1 gap-4 p-0 sm:p-4 bg-base-300 w-full h-full'>
            {videos? 
                videos.map(video =>(
                    <>
                        {(video.id.videoId || (video.id && type !== "search")) &&
                        <VideoCardRow
                        id= {(video.id.videoId)? video.id.videoId: video.id}
                        imgLink= {video.snippet.thumbnails.high.url}
                        channelImg={video.profilePhotoUrl}
                        channelID = {video.snippet.channelId}
                        duration={video.contentDetails.duration}
                        videoTitle= {video.snippet.title} 
                        channelName= {video.snippet.channelTitle} 
                        viewsNum= {video.statistics.viewCount} 
                        period= {video.snippet.publishedAt}
                        description= {video.snippet.description}/> }

                        {(video.id.channelId) &&
                        <ChannelCardRow
                        id= {video.id.channelId}
                        imgLink= {video.snippet.thumbnails.high.url}
                        channelName= {video.snippet.channelTitle} 
                        subNum= {video.statistics.subscriberCount} 
                        description= {video.snippet.description}
                        channelTag={video.channelData.channelSnippet.customUrl}/> }
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

export default SearchFeed