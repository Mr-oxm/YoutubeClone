/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import SideFeed from './partials/SideFeed';
import ReactPlayer from "react-player";
import { useParams, useLoaderData, Link } from 'react-router-dom';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import {useThemeContext} from './contexts/themeContext';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function Watch() {
    const { videoId } = useParams();
    const {video,videos,  type }= useLoaderData();
    const themeContext=useThemeContext()
    themeContext.setHasSiderbar(false);


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

    function processDescriptionText(rawDescription) {
        // Split the rawDescription into paragraphs based on line breaks ("\n")
        const paragraphs = rawDescription.split('\n').filter((paragraph) => paragraph.trim() !== '');
        // Helper function to detect URLs and create anchor tags
        const createLinks = (text) => {
            const urlRegex = /(?:https?|ftp):\/\/[^\s]+/g;
            return text.replace(urlRegex, (url) => `<a style=" color: rgb(14 165 233);" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
        };
        // Create an array of <p> elements with processed text
        const processedText = paragraphs.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: createLinks(paragraph) }} />
        ));
        return processedText;
    }


    if(video===null){
        return(
            <div className="flex flex-col md:flex-row mx-0 md:mx-8 w-screen h-screen overflow-hidden">
            {/* left section of video details */}
            <div className='felx flex-col flex-1 mx-0 my-2 md:mt-3 md:mr-4 relative '>
                <div className='w-full h-[50vh]'>

                </div>             
                    {/* data */}
                <div className='flex flex-col mx-2'>
                    {/* video title */}
                    <span className='mt-4 font-semibold text-lg z-10'></span>

                    {/* channel data and buttons */}
                    <div className='flex flex-col md:flex-row my-4  justify-between z-10'>
                        {/* channel data */}
                        <div className="flex flex-row">
                            
                            <div className='btn-circle avatar mr-1'>
                                <div className="w-10 h-10 rounded-full ">
                                    
                                </div>
                            </div>
                        
                            <div className='flex flex-col flex-1'>
                                <div className='flex flex-col font-normal  '>
                                    <div   className='text-sm font-medium'></div>
                                    <span className='opacity-80 text-xs'></span>
                                </div>
                            </div>
                        
                        </div>

                        {/* like and dislike */}
                        <div className=' flex flex-row'>
                            <div className=' flex flex-row items-center px-3 py-2 bg-base-100 rounded-3xl text-base-content mx-2'>
                                <ThumbUpOutlinedIcon/>
                                <span className='text-sm font-medium mx-2'> </span>
                                <div className="divider divider-horizontal mx-2"></div>
                                <ThumbDownOffAltOutlinedIcon/>
                            </div>
                            <div className=' flex flex-row items-center px-3 py-2 bg-base-100 rounded-3xl text-base-content hover:bg-white/20'>
                                <button className='text-sm font-medium mx-2'>
                                    <ShareOutlinedIcon/>
                                    <span className='mx-2'></span>
                                </button>
                            </div>
                        </div>

                        
                    </div>
                    
                    {/* descrition */}
                    <div tabIndex={0} className="collapse collapse-arrow border border-base-100 bg-base-100 rounded-2xl text-base-content z-10">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-sm font-medium">
                            
                        </div>
                        <div className="collapse-content"> 
                            
                        </div>
                    </div>

                    
                    {/* comments */}
                    <span className='my-4 font-medium z-10'></span>
                </div>
            </div>

            {/* right section of recommended videos */}
            <div className='flex flex-col w-full md:w-1/3 z-10'>
                <SideFeed type={type} videos={videos}/>
            </div>
        </div>
        )
    }

    return (
        <div className="h-full flex flex-col md:flex-row mx-0 md:mx-8">
            {/* left section of video details */}
            <div className='felx flex-col flex-1 mx-0 my-2 md:mt-3 md:mr-4 relative '>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} className="react-player" controls  width="auto" height="auto" />              
    
                <img src={video.snippet.thumbnails.high.url} alt="ambient" className=' top-0 absolute z-0 w-screen h-screen blur-[200px] opacity-60'/>
                {/* data */}
                <div className='flex flex-col mx-2'>
                    {/* video title */}
                    <span className='mt-4 font-semibold text-lg z-10'> {video.snippet.title}</span>

                    {/* channel data and buttons */}
                    <div className='flex flex-col md:flex-row my-4  justify-between z-10'>
                        {/* channel data */}
                        <div className="flex flex-row">
                            
                            <Link to={`/channel/${video.snippet.channelId}`} className='btn-circle avatar mr-1'>
                                <div className="w-10 h-10 rounded-full ">
                                    <img src={video.profilePhotoUrl} alt={video.snippet.channelTitle}/>
                                </div>
                            </Link>
                        
                            <div className='flex flex-col flex-1'>
                                <div className='flex flex-col font-normal  '>
                                    <Link  to={`/channel/${video.snippet.channelId}`} className='text-sm font-medium'>{video.snippet.channelTitle}</Link>
                                    <span className='opacity-80 text-xs'> {getYoutubeViews(video.channelData.statistics.subscriberCount)} subscribers </span>
                                </div>
                            </div>
                        
                        </div>

                        {/* like and dislike */}
                        <div className=' flex flex-row'>
                            <div className=' flex flex-row items-center px-3 py-2 bg-base-100 rounded-3xl text-base-content mx-2'>
                                <ThumbUpOutlinedIcon/>
                                <span className='text-sm font-medium mx-2'>{getYoutubeViews(video.statistics.likeCount)} </span>
                                <div className="divider divider-horizontal mx-2"></div>
                                <ThumbDownOffAltOutlinedIcon/>
                            </div>
                            <div className=' flex flex-row items-center px-3 py-2 bg-base-100 rounded-3xl text-base-content hover:bg-white/20'>
                                <button className='text-sm font-medium mx-2 'onClick={()=>window.my_modal_2.showModal()}>
                                    <ShareOutlinedIcon/>
                                    <span className='mx-2'>Share</span>
                                </button>
                                <dialog id="my_modal_2" className="modal">
                                    <form method="dialog" className="modal-box rounded-lg">
                                        <h3 className="font-bold text-lg mb-1">Share the video</h3>
                                        <div className='bg-base-300 p-4 rounded-lg cursor-pointer mt-2 flex flex-row justify-between items-center' >
                                            <span>
                                                {`https://www.youtube.com/watch?v=${videoId}`}
                                            </span>
                                            <button className='btn btn-circle btn-ghost' onClick={()=>{navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`);}}>
                                                <ContentCopyOutlinedIcon />
                                            </button>
                                        </div>
                                        <div className="modal-action">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn rounded-lg">Close</button>
                                        </div>
                                    </form>
                                </dialog>
                            </div>
                        </div>

                        
                    </div>
                    
                    {/* descrition */}
                    <div tabIndex={0} className="collapse collapse-arrow border border-base-100 bg-base-100 rounded-2xl text-base-content z-10">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-sm font-medium">
                            {getYoutubeViews(video.statistics.viewCount)} views &nbsp; {getYoutubeRelativeTime(video.snippet.publishedAt)} ago
                        </div>
                        <div className="collapse-content"> 
                            {processDescriptionText(video.snippet.description)}
                        </div>
                    </div>

                    
                    {/* comments */}
                    <span className='my-4 font-medium z-10'>{getYoutubeViews(video.statistics.commentCount)}&nbsp; Comments</span>
                </div>
            </div>

            {/* right section of recommended videos */}
            <div className='flex flex-col w-full md:w-1/3 z-10'>
                <SideFeed type={type} videos={videos}/>
            </div>
        </div>
    )
}
export default Watch