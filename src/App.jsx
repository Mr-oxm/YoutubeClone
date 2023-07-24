/* eslint-disable react/prop-types */


import MainScreen from './MainScreen';

import {AuthContextProvider} from "./contexts/authContext";
import {youtubeAPIFetch} from './contexts/youtubecontext'
import {ThemeContextProvider} from "./contexts/themeContext";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, redirect } from "react-router-dom";


import Watch from './Watch';
import Layout from './Layout';
import Channel from './Channel';
import Feed from './partials/Feed';
import SearchFeed from './partials/SearchFeed';
import ErrorComponent from './partials/ErrorComponent';
import NotFound from './NotFound';



function App() {

  const loaderFucntion= async (k, t)=>{
    try {
      return {videos:await youtubeAPIFetch(k,t), type: t};
    } catch (error) {
      console.log(error)
      return {videos:null, type: null};
    }

  }
  const loaderFucntionForWatch= async (k, t)=>{
    try {
      
      const videoData= await youtubeAPIFetch(k,"ID");
      const channelTitle= await videoData[0].snippet.channelTitle
      const videosData= await youtubeAPIFetch(channelTitle,t);
      return {video:videoData[0] ,videos:videosData, type: t};
    } catch (error) {
      console.log(error)
      return {video: null,videos:null, type: null};
    }
  }

  const loaderFucntionForChannel= async (k, t)=>{
    try {
      
      const channelData= await youtubeAPIFetch(k,"Channel");
      const channelTitle= await channelData[0].snippet.title;
      const videosData= await youtubeAPIFetch(channelTitle,t);
      return {channel:channelData[0] ,videos:videosData, type: t};
    } catch (error) {
      console.log(error)
      return {channel: null,videos:null, type: null};
    }

  }
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorComponent/>}>
        <Route element={<MainScreen/>} >

          <Route index element={<Feed/>} loader={()=> {return loaderFucntion("Egypt", "search")}} errorElement={<ErrorComponent/>}/>
          <Route path='/Home' loader={()=>{return redirect("/");}}/>

          <Route path='/search/:searchTerm' element={<SearchFeed/>} 
            loader={async ({ params }) => {
              return await loaderFucntion(params.searchTerm, "search");
            }}
            errorElement={<ErrorComponent/>}
          />
          
          <Route path='/keyword/:keyword' element={<Feed/>} 
            loader={async ({ params }) => {
              return await loaderFucntion(params.keyword, "search");
            }}
            errorElement={<ErrorComponent/>}
          />

          <Route path='/channel/:channelID' element={<Channel/>} 
            loader={async ({ params }) => {
              return loaderFucntionForChannel(params.channelID, "search");
            }}
            errorElement={<ErrorComponent/>}
          />


          <Route path='/Explore' element={<SearchFeed/>} loader={()=> {return loaderFucntion("", "mostPopular")}} errorElement={<ErrorComponent/>}/>
        </Route>

        <Route path='/watch/:videoId' element={<Watch />} 
          loader={async ({ params }) => {
            return loaderFucntionForWatch(params.videoId, "search");
          }}
          
        />
        <Route path='/*' element={<NotFound/>}/>
    </Route>
  ))


  return (
    // <Router>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router}/>
        </ThemeContextProvider>
      </AuthContextProvider>
    // </Router>
  );
}


export default App;
