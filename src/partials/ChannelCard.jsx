/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function ChannelCard(props) {
    let channelLink= "";

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
    return (
        <div className=  {` card rounded-none w-full h-full cursor-pointer m-auto `}>
            <Link to={`/channel/${props.id}`} className='relative aspect-[16/9] text-xs bg-base-300 object-contain rounded-xl overflow-hidden'>
            {/* https://placeimg.com/400/225/arch */}
                    <img src={props.imgLink} alt="Shoes"  className='object-cover rounded-full aspect-[1/1] h-full m-auto'/>
            </Link>
            <div className="flex flex-row my-4 mx-2 sm:mx-0 ">
                <div className='flex flex-col flex-1'>
                    <Link to={`/channel/${props.id}`} className='tilteTruncate text-sm sm:text-sm xl:text-base font-medium'>
                        {props.channelName}
                    </Link>
                    <div className='flex flex-col font-normal text-xs sm:text-[10px] xl:text-xs'>
                        <span className='opacity-80'>{props.channelTag} • {getYoutubeViews(props.subNum)} subscribers </span>
                        <p  href={channelLink} className='opacity-80 tilteTruncate'>{props.descrition}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChannelCard