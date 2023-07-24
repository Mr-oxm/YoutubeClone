import axios from "axios";


let APILink= "";
let params= {};
let apiKey = "AIzaSyCEkGhwZ74UmebEE8Fa6Ctkb3ti3xM-DPc";


export const youtubeAPIFetch =async (type, keyword)=>{

  switch(type){
    case "mostPopular":
      APILink = "https://www.googleapis.com/youtube/v3/videos?";
      params= {
        key: apiKey,
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "US",
      }
      break;
    case "search":
      APILink = "https://www.googleapis.com/youtube/v3/search?";
      params= {
        key: apiKey,
        part: "snippet",
        maxResults: 50,
        q: keyword,
        regionCode: "US"
      };
      break;
    default:
      break;
  }

  try {
    // Make a GET request to the YouTube API to get the most popular videos
    const response = await axios.get(APILink, {
      params,
    });

    // Get the list of videos from the response
    const videos = response.data.items;

    // Loop through the videos and get the profile photo URL for each channel
    const promises = videos.map(async (video) => {
      const channelId = video.snippet.channelId;
      const channelData = await getProfilePhotoUrl(channelId);
      video.profilePhotoUrl = channelData.profilePhotoUrl;
      if(video.id.videoId && type==="search"){
        const videoData= await getVideoDetails(video.id.videoId);
        video.statistics= videoData.statistics;
        video.contentDetails= videoData.contentDetails;
      }
      if(video.id.channelId){
        video.statistics= channelData.statistics;
        video.contentDetails= channelData.contentDetails;
      }
      
      return video;
    });

    // Wait for all the promises to resolve
    const updatedVideos = await Promise.all(promises);

    // Set the updated list of videos as the state
    return  updatedVideos;
  } catch (error) {
    console.log(error);
  }
};

// Async function to get the profile photo URL for a YouTube channel
async function getProfilePhotoUrl(channelId) {
  try {
    // Make a GET request to the YouTube API
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels?",
      {
        params: {
          key: apiKey,
          id: channelId,
          part: "snippet,contentDetails,statistics",
        },
      }
    );

    // Get the channel snippet from the response
    const channelSnippet = response.data.items[0].snippet;
    const contentDetails = response.data.items[0].contentDetails;
    const statistics = response.data.items[0].statistics;

    // Get the profile photo URL from the snippet
    const profilePhotoUrl = channelSnippet.thumbnails.default.url;

    return {profilePhotoUrl, contentDetails, statistics};
  } catch (error) {
    console.log(error);
  }
}

// Async function to get the statisics and details of a video
async function getVideoDetails(videoID) {
  try {
    // Make a GET request to the YouTube API
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos?",
      {
        params: {
          key: apiKey,
          id: videoID,
          part: "statistics,contentDetails",
        },
      }
    );

    // Get the channel snippet from the response
    const statistics = response.data.items[0].statistics;
    const contentDetails = response.data.items[0].contentDetails;
    


    return {statistics, contentDetails};
  } catch (error) {
    console.log(error);
  }
}

