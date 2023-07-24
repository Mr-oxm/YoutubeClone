/* eslint-disable react/prop-types */
import VideoCard from './VideoCard';
// import ChannelCard from './ChannelCard';
import VideoCardDump from './VideoCardDump';
import { useLoaderData } from 'react-router-dom';
import {useThemeContext} from '../contexts/themeContext';
function Feed() {
    const {videos,  type }= useLoaderData();
    const themeContext=useThemeContext()
    
    const renderVideoCards = () => {

        if (!videos || videos.length === 0) {
        // Render VideoCardDump components when there are no videos
            return Array.from({ length: 12 }, (_, index) => (
                <VideoCardDump key={index} />
            ));
        }

        return videos.map((video) => (
            <>
            {(video.id.videoId || (video.id && type !== "search")) && (
                <VideoCard
                    id={video.id.videoId}
                    imgLink={video.snippet.thumbnails.high.url}
                    channelImg={video.profilePhotoUrl}
                    channelID={video.snippet.channelId}
                    duration={video.contentDetails.duration}
                    videoTitle={video.snippet.title}
                    channelName={video.snippet.channelTitle}
                    viewsNum={video.statistics.viewCount}
                    period={video.snippet.publishedAt}
                />
            )}

            {video.id.channelId && (
                // <ChannelCard
                //     id={video.id.channelId}
                //     imgLink={video.snippet.thumbnails.high.url}
                //     channelName={video.snippet.channelTitle}
                //     subNum={video.statistics.subscriberCount}
                //     descrition={video.snippet.description}
                //     channelTag={video.snippet.channelTitle}
                // />
                <></>
                )}
            </>
            ));
    };

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${themeContext.closeSidebar? "lg:grid-cols-4":"lg:grid-cols-3"} beyond:grid-cols-5 ultra:grid-cols-7 gap-4 p-0 sm:p-4 bg-base-300 w-full h-full`}>
        {renderVideoCards()}
        </div>
    );
}

export default Feed;
