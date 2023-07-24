/* eslint-disable react/prop-types */

function IconLabel({avatarImg,avatar, Icon, text}) {
    return (
        <div className='flex lg:flex-row lg:mb-0 tems-center  py-2 cursor-pointer hover:bg-base-100 mb-0 flex-row px-4'>

            {avatar ? 
            <img src={avatarImg} className='avatar w-6 h-6 rounded-full' alt='avatar'/> 
            :
            <Icon className='text-red mb-0 '/>}
            
            <span className='ml-5 text-sm '>
                {text}
            </span>
        </div>
    )
}

export default IconLabel