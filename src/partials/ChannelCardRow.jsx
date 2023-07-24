/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function ChannelCardRow(props) {

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
         // h-[18.75rem] w-[18.75em]
        <div className=  {`flex-row card rounded-none w-full h-full m-auto`}>
            <Link to={`/channel/${props.id}`} className=' flex flex-1 relative aspect-[16/9] text-xs bg-base-300 object-contain rounded-xl overflow-hidden'>
            {/* https://placeimg.com/400/225/arch */}
                    <img src={props.imgLink} alt="Shoes"  className='object-cover aspect-[16/9] w-32 h-32 rounded-full m-auto '/>
            </Link>
            <div className='flex flex-col w-5/12 md:w-4/6 md:w-4/6s m-0 md:mx-5 justify-center'>
                <Link to={`/channel/${props.id}`} className='tilteTruncate text-sm sm:text-base xl:text-xl font-medium'>
                    {props.channelName}
                </Link>

                <div className='flex flex-col font-normal text-xs sm:text-xs xl:text-xs '>

                    
                    <span className='my-2 mx-2 sm:mx-0 opacity-80'>{props.channelTag} • {getYoutubeViews(props.subNum)} subscribers </span>

                    <span className='opacity-80'> {props.description} </span>
                </div>


            </div>
        </div>
    )
}
export default ChannelCardRow