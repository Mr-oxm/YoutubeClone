/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function SidebarRow({avatarImg,avatar,sidebar,selected, Icon,closed, text, setSelectedName, hideOnSm}) {
    const handleClick = () => {
        if (sidebar) {
            setSelectedName(text);
            
        }
    };
    return (
        <Link to={`/${text}`} onClick={handleClick}
            className={
            `flex px-2 items-center  py-2 cursor-pointer 
            ${closed? "mb-0 md:mb-5 flex-col mx-0 rounded-none md:rounded-xl" : "lg:flex-row lg:mb-0 mx-5 rounded-xl"} 
            ${hideOnSm?'hidden lg:block': ''}  
            ${selected ? 'bg-base-content/10' : 'hover:bg-base-200'}`}>

            {avatar ? 
            <img src={avatarImg} className='avatar w-6 h-6 rounded-full' alt='avatar'/> 
            :
            <Icon className={`text-red ${closed ? "":"mb-0"} mb-1 `}/>}
            
            <span className={
                `${closed ? "text-xs":"ml-5 text-sm"} 
                ${selected ? ' font-medium' : ''} `}>
                {text}
            </span>
        </Link>
    )
}

export default SidebarRow