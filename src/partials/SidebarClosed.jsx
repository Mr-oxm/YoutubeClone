/* eslint-disable react/prop-types */
import  { useState } from 'react'
import SidebarRow from './SidebarRow';
import {
    sidebarItems
} from "../utils/constants";

// import {
//     HomeIcon,
//     ExploreOutlinedIcon,
//     ElectricBoltIcon,
//     SubscriptionsOutlinedIcon,
//     VideoLibraryOutlinedIcon,
//     HistoryOutlinedIcon,
//     SlideshowOutlinedIcon,
//     AccessTimeOutlinedIcon,
//     ThumbUpOutlinedIcon,
//     ExpandMoreOutlinedIcon,
// } from "../utils/Imports";

function Sidebar(props) {
    
    const [selectedName, setSelectedName]= useState("Home");
    return (
        
        <div className={`${props.hidelg? "hidden lg:block": "grid md:block"} justify-between bg-base-300/[0.98] grid-cols-4 z-50 fixed w-full md:w-20 h-16 md:h-[calc(100vh-66.6px)] md:sticky bottom-0 md:top-[66px] overflow-y-auto `}>
            {sidebarItems.map(category=>(
                (category.text=== "break" || category.hideOnSm)?
                    <></>
                :
                    <SidebarRow key={category.text} closed sidebar hideOnSm={category.hideOnSm} selected={category.text=== selectedName? true:false} Icon={category.icon} text={category.text} setSelectedName={setSelectedName} />
            ))}
            
            {/* <SidebarRow sidebar selected={"Home"=== selectedName? true:false} Icon={HomeIcon} text="Home"  setSelectedName={setSelectedName} setKeyword= {setKeyword} setType={setType}/>
            <div className=' hidden md:block'>
                <SidebarRow sidebar selected={"Explore"=== selectedName? true:false} Icon={ExploreOutlinedIcon} text="Explore" setSelectedName={setSelectedName} setKeyword= {setKeyword} setType={setType}/>
            </div>
            <SidebarRow sidebar Icon={ElectricBoltIcon} text="Shorts"/>
            <SidebarRow sidebar Icon={SubscriptionsOutlinedIcon} text="Subscriptions"/>

            <hr className='hidden lg:block h-1 my-3 border-base-content/30'/>

            <SidebarRow sidebar Icon={VideoLibraryOutlinedIcon} text="Library"/>
            <div className='hidden lg:block'>
                <SidebarRow sidebar Icon={HistoryOutlinedIcon} text="History"/>
                <SidebarRow sidebar Icon={SlideshowOutlinedIcon} text="Your videos"/>
                <SidebarRow sidebar Icon={AccessTimeOutlinedIcon} text="Watch later"/>
                <SidebarRow sidebar Icon={ThumbUpOutlinedIcon} text="Liked videos"/>
                <SidebarRow sidebar Icon={ExpandMoreOutlinedIcon} text="Show more"/>
            </div>

            <hr className='hidden lg:block h-1 my-3 border-base-content/30'/> */}
            
        </div>
    )
}

export default Sidebar