/* eslint-disable react/prop-types */
import  { useState } from 'react'
import SidebarRow from './SidebarRow';
import {
    AccountCircleOutlinedIcon,
} from "../utils/Imports";
import {
    sidebarItems
} from "../utils/constants";
import {useSignINContext} from '../contexts/authContext';



function Sidebar(props) {
    
    const [selectedName, setSelectedName]= useState("Home");
    const signINContext = useSignINContext();
    const getSignInDiv= ()=>{
        return(
            <>
                <hr className='h-1 hidden md:block my-3 border-base-content/30' />
                <div className='px-7 pb-2 hidden md:block'>
                    <p className='mb-2'>
                        Sign in to like videos, comment, and subscribe.
                    </p>
                    <button onClick={()=>{  signINContext.signIn();}} className="btn no-animation btn-outline text-secondary border-base-content/25 border-2 hover:border-base-content/25 hover:bg-secondary/20 hover:text-secondary mr-2 center rounded-full w-[50px] md:w-32">
                        <AccountCircleOutlinedIcon className='m-0 md:mr-2'/>
                        <span className='hidden md:block'>
                            Sign in
                        </span>
                    </button>
                </div>
            </>
        )
    }
    const getSidebarContent= ()=>{
        return (
            <>
                {sidebarItems.map((category) => {
                    if (category.signedIn == true &&  signINContext.isSignedIn== false) {
                        if(category.text==="Sign In"){
                            return getSignInDiv();
                        }
                        else{
                            return null; // Return null when signed in
                        }
                            
                    }
                    if (!category.icon) {
                        if(category.text==="break")
                            return <hr key={category.text} className='h-1 hidden md:block my-3 border-base-content/30' />;
                        if(category.text!=="Sign In")
                            return <h1 className='px-7 pb-2 text-sm hidden md:block font-bold text-base-content'>{category.text}</h1>
                    } else {
                        return (
                            <SidebarRow
                                key={category.text}
                                sidebar
                                selected={category.text === selectedName}
                                Icon={category.icon}
                                text={category.text}
                                setSelectedName={setSelectedName}
                            />
                        );
                    }
                })}
            </>
        );
    }
    return (
        
        <div className={`${props.hidelg? "hidden lg:block lg:w-1/6": "block"} z-50  md:h-[calc(100vh-66.6px)] md:sticky md:top-[66px] overflow-y-auto `}>
            {getSidebarContent()}
            
            
        </div>
    )
}

export default Sidebar