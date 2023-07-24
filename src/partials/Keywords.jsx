/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function Keywords({ keyword, Icon}) {
    const urlDetector= ()=>{
    if(keyword=== "All")
        return "/";
    else if (keyword=== "Explore")
        return "/Explore"
    else
        return "/keyword/"+ keyword;
    }
    return (
        <NavLink to={urlDetector()} 
        className={({ isActive})=>
            `flex h-10 whitespace-nowrap items-center rounded-lg 
            ${isActive? 'text-base-300 bg-base-content ':'bg-base-content/10 hover:bg-base-content/25 active:bg-base-content active:text-base-100 text-base-content'}
            transition-all  px-3 mx-2 my-3 text-sm`
            }>
            {Icon ? <Icon className="mr-1"/> : "" }
            {keyword}
        </NavLink>
    )
}

export default Keywords