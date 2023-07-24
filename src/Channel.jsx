import { useParams, useLoaderData} from 'react-router-dom';
import VideoCard from './partials/VideoCard';

function Channel() {
    const { channelID } = useParams();
    const {channel,videos }= useLoaderData();
    console.log(channel)
    function getYoutubeViews(viewCount) {
        // Check if the view count is less than 1000
        if (viewCount < 1000) {
            return viewCount;
        }
    
        // Calculate the number of thousands in the view count
        const thousands = Math.floor(viewCount / 1000);
    
        // Calculate the number of millions in the view count
        const millions = Math.floor(thousands / 1000);
    
        // Check if the view count is less than 1 million
        if (thousands < 1000) {
            return `${thousands}K`;
        }
    
        // If the view count is greater than or equal to 1 million, return the number of millions
        return `${millions}M`;
    }
    const FirstLineOfYouTubeDescription = (description ) => {
        // Split the description into lines based on newline characters
        const lines = description.split('\n');
        // Extract the first line (trimming any leading/trailing spaces)
        const firstLine = lines.length > 0 ? lines[0].trim() : '';

        return (<>{firstLine}</>)
    };
    return (
        <div className="flex flex-col ">
            <div className='flex flex-col border-b-2 border-base-content/30 m-0 md:mb-2'>
                <img src={channel.brandingSettings.image.bannerExternalUrl} alt="cover" className='w-full h-52 object-cover' />
                
                <div className=  'flex-row card rounded-none w-full h-full m-auto md:mx-9'>
                    <div className=' flex flex-1 relative py-10 md:py-14 text-xs bg-base-300 rounded-xl overflow-hidden'>
                    {/* https://placeimg.com/400/225/arch */}
                            <img src={channel.snippet.thumbnails.high.url} alt="Shoes"  className=' w-32 h-32 rounded-full m-auto '/>
                    </div>
                    <div className='flex flex-col w-7/12 md:w-3/4 justify-center '>
                        <span className='tilteTruncate text-base md:text-xl font-medium'>
                            {channel.snippet.title}
                        </span>
                        <div className='flex flex-col font-normal text-sm md:text-base '>

                            
                            <span className='my-2 sm:mx-0 opacity-80'>{channel.snippet.customUrl} &nbsp; {getYoutubeViews(channel.statistics.subscriberCount)} subscribers &nbsp; {getYoutubeViews(channel.statistics.videoCount)} videos</span>

                            <span className='opacity-80'> {FirstLineOfYouTubeDescription(channel.snippet.description)} </span>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex flex-col w-full md:w-5/6 m-auto'>
                <button className='font-medium text-base md:text-lg my-3 md:my-3 mx-4 p-2 rounded-xl bg-base-100 w-56'>Popular videos</button>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 beyond:grid-cols-5 ultra:grid-cols-7 gap-4 p-0 sm:p-4 bg-base-300  h-full '>
                    {videos.map(video =>(
                        <>
                            {(video.id.videoId)&&(video.snippet.channelId === channelID) &&
                            <VideoCard
                            id= {(video.id.videoId)? video.id.videoId: video.id}
                            imgLink= {video.snippet.thumbnails.high.url}
                            channelImg={video.profilePhotoUrl}
                            channelID = {video.snippet.channelId}
                            duration={video.contentDetails.duration}
                            videoTitle= {video.snippet.title} 
                            channelName= {video.snippet.channelTitle} 
                            viewsNum= {video.statistics.viewCount} 
                            period= {video.snippet.publishedAt}/> }
                
                        </>
                    )) }
                    {/* <Feed videos={videos} type={type}/> */}
                </div>
            </div>
        </div>
    )
}
export default Channel