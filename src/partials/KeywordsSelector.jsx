/* eslint-disable react/prop-types */

import {useEffect} from 'react';
import Keywords from './Keywords';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import '../App.css';
import {youtubeCategories} from '../utils/constants'

function KeywordsSelector() {
    useEffect(()=>{
        const container = document.getElementById("horizontal");
        // where "container" is the id of the container
        container.addEventListener("wheel", function (e) {
            if (e.deltaY > 0) {
            container.scrollLeft += container.scrollWidth;
            e.preventDefault();
        // prevenDefault will help avoid worrisome 
        // inclusion of vertical scroll 
            }
            else {
            container.scrollLeft -= container.scrollWidth;
            e.preventDefault();
            }
        });
    })
    return (
            <div className='sticky top-[63px] z-50 bg-base-300/[0.98] '>
                <div id='horizontal' className=' flex flex-row overflow-hidden content-center cursor-grab hover:overflow-x-scroll scrollbar-hide horizontalScroll scroll-smooth'>
                <div className='block md:hidden'>
                    <Keywords explore  keyword="Explore" Icon={ExploreOutlinedIcon}  />
                </div>
                {youtubeCategories.map(category=>(
                    <Keywords key={category} keyword={category} />
                ))}
                </div>
            </div>
    );
}

export default KeywordsSelector;