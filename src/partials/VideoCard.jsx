/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

function VideoCard(props) {

    function getYoutubeRelativeTime(date3) {
        const date2 = new Date(date3);
        const date1 = new Date();
        // Calculate the difference between the two dates in milliseconds
        const diff = Math.abs(date1 - date2);
      
        // Calculate the number of seconds in the difference
        const seconds = Math.floor(diff / 1000);
      
        // Calculate the number of minutes in the difference
        const minutes = Math.floor(seconds / 60);
      
        // Calculate the number of hours in the difference
        const hours = Math.floor(minutes / 60);
      
        // Calculate the number of days in the difference
        const days = Math.floor(hours / 24);
      
        // Calculate the number of weeks in the difference
        const weeks = Math.floor(days / 7);
      
        // Calculate the number of months in the difference
        const months = Math.floor(weeks / 4);
      
        // Calculate the number of years in the difference
        const years = Math.floor(months / 12);
      
        // Check if the difference is less than a minute
        if (seconds < 60) {
          return `${seconds} seconds`;
        }
      
        // Check if the difference is less than an hour
        if (minutes < 60) {
          return `${minutes} minutes`;
        }
      
        // Check if the difference is less than a day
        if (hours < 24) {
          return `${hours} hours`;
        }
      
        // Check if the difference is less than a week
        if (days < 7) {
          return `${days} days`;
        }
      
        // Check if the difference is less than a month
        if (weeks < 4) {
          return `${weeks} weeks`;
        }
      
        // Check if the difference is less than a year
        if (months < 12) {
          return `${months} months`;
        }
      
        // If none of the previous conditions are met, return the number of years
        return `${years} years`;
    }

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

    function getYoutubeDuration(duration) {
        // Split the duration string into an array of substrings

        const durationParts = duration.split(/(\d+)/);
      
        // Initialize variables to store the number of hours, minutes, and seconds
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
      
        // Iterate over the substrings in the duration array
        for (const part of durationParts) {
          // Check if the current substring is "H"
          if (part === "H") {
            // If the current substring is "H", set the number of hours to the preceding number
            hours = parseInt(durationParts[durationParts.indexOf(part) - 1], 10);
          }
      
          // Check if the current substring is "M"
          if (part === "M") {
            // If the current substring is "M", set the number of minutes to the preceding number
            minutes = parseInt(durationParts[durationParts.indexOf(part) - 1], 10);
          }
      
          // Check if the current substring is "S"
          if (part === "S") {
            // If the current substring is "S", set the number of seconds to the preceding number
            seconds = parseInt(durationParts[durationParts.indexOf(part) - 1], 10);
          }
        }
      
        // Check if the duration is less than an hour
        if (hours === 0) {
          // If the duration is less than an hour, return the number of minutes and seconds
          return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }
      
        // If the duration is greater than or equal to an hour, return the number of hours, minutes, and seconds
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        
      } 

      
      
      
    return (
        // h-[18.75rem] w-[18.75em]
        <div className=  {`  card rounded-none w-full h-full cursor-pointer m-auto`}>
            <Link to={`/watch/${props.id}`} className='group relative aspect-[16/9] text-xs bg-base-100 object-contain rounded-none sm:rounded-xl overflow-hidden'>
            {/* https://placeimg.com/400/225/arch */}
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${props.id}`} className="react-player-hidden group-hover:opacity-100 group-hover:visible" controls  width="100%" height="100%" />              

                    <img src={props.imgLink} alt="Shoes"  className='object-cover aspect-[16/9] w-full h-full '/>
                    <div className='absolute bottom-0 right-0 bg-black/60 text-white px-1 m-1 rounded-sm'>
                        <span>{getYoutubeDuration(props.duration)}</span>
                    </div>
            </Link>
            <div className="flex flex-row my-4 mx-2 sm:mx-0 ">
                
                <Link to={`/channel/${props.channelID}`} className='btn-circle avatar mr-1'>
                    <div className="w-10 h-10 rounded-full ">
                        <img src={props.channelImg} alt={props.channelName}/>
                    </div>
                </Link>

                <div className='flex flex-col flex-1'>
                    <Link to={`/watch/${props.id}`} className='tilteTruncate text-sm sm:text-sm xl:text-base font-medium'>
                      {props.videoTitle}
                    </Link>
                    <div className='flex flex-row sm:flex-col font-normal text-xs sm:text-[10px] xl:text-xs'>
                        <Link  to={`/channel/${props.channelID}`} className='opacity-80 hover:opacity-100 transition duration-100'>{props.channelName}</Link>
                        <span className='opacity-80'> <span className='inline sm:hidden ml-1'> • </span> {getYoutubeViews(props.viewsNum)} views • {getYoutubeRelativeTime(props.period)} ago</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard