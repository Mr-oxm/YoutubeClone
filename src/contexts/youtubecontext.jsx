import axios from "axios";


// eslint-disable-next-line react-refresh/only-export-components
let APILink= "";
let params= {};
let apiKey = import.meta.env.VITE_API_KEY;


export const youtubeAPIFetch = async (keyword,type ) => {
  switch (type) {
      case "mostPopular":
      APILink = "https://www.googleapis.com/youtube/v3/videos?";
      params = {
        key: apiKey,
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "EG",
      };
      break;
      case "search":
        APILink = "https://www.googleapis.com/youtube/v3/search?";
        params = {
          key: apiKey,
          part: "snippet",
          maxResults: 50,
          q: keyword,
          regionCode: "US",
        };
      break;
      case 'ID':
        APILink = "https://www.googleapis.com/youtube/v3/videos?";
        params = {
          key: apiKey,
          id: keyword,
          part: "snippet,statistics,contentDetails",
      };
      break;
      case 'Channel':
        APILink = "https://www.googleapis.com/youtube/v3/channels?";
        params = {
          key: apiKey,
          id: keyword,
          part: "snippet,contentDetails,statistics,brandingSettings",
      };
      break;
      default:
      break;
  }

  try {
    // Make a GET request to the YouTube API to get the videos
    const response = await axios.get(APILink, {
      params,
    });

    // Get the list of videos from the response
    const videos = response.data.items;
    
    if(type!== "Channel"){
      // Extract channel IDs from the videos
      const channelIds = videos.map((video) => video.snippet.channelId);

      // Batch API call to get profile photo URLs and video details
      const [channelData, videoData] = await Promise.all([
        getProfilePhotoUrls(channelIds),
        getVideoDetails(videos),
      ]);

      // Assign profile photo URLs and video details to videos
      videos.forEach(async(video) => {
          const channelId = video.snippet.channelId;
          video.profilePhotoUrl = channelData[channelId].profilePhotoUrl;
          video.channelData = channelData[channelId];
          if(video.id.channelId){
            video.statistics = channelData[channelId].statistics;
            video.contentDetails = channelData[channelId].contentDetails;
          }
          if (video.id.videoId && type === "search") {
            const videoId = video.id.videoId;
            video.statistics = videoData[videoId].statistics;
            video.contentDetails = videoData[videoId].contentDetails;
          }
        });
    }
      
    return videos;
  } catch (error) {
    console.log(error);
  }
};

// Batch API call to get profile photo URLs for multiple channels
async function getProfilePhotoUrls(channelIds) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels?",
      {
        params: {
          key: apiKey,
          id: channelIds.join(","),
          part: "snippet,contentDetails,statistics",
        },
      }
    );

    const channelData = {};

    response.data.items.forEach((item) => {
      const channelId = item.id;
      const channelSnippet = item.snippet;
      const contentDetails = item.contentDetails;
      const statistics = item.statistics;
      const profilePhotoUrl = channelSnippet.thumbnails.default.url;

      channelData[channelId] = {
        profilePhotoUrl,
        channelSnippet,
        contentDetails,
        statistics,
      };
    });

    return channelData;
  } catch (error) {
    console.log(error);
  }
}

// Batch API call to get video details for multiple videos
async function getVideoDetails(videos) {
  try {
    const videoIds = videos
      .filter((video) => video.id.videoId)
      .map((video) => video.id.videoId);

    if (videoIds.length === 0) {
      return {};
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos?",
      {
        params: {
          key: apiKey,
          id: videoIds.join(","),
          part: "statistics,contentDetails",
        },
      }
    );

    const videoData = {};

    response.data.items.forEach((item) => {
      const videoId = item.id;
      const statistics = item.statistics;
      const contentDetails = item.contentDetails;

      videoData[videoId] = {
        statistics,
        contentDetails,
      };
    });

    return videoData;
  } catch (error) {
    console.log(error);
  }
}


