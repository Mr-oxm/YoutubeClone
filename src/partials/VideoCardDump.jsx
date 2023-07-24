/* eslint-disable react/prop-types */


function VideoCardDump(props) {  
    return (
        // h-[18.75rem] w-[18.75em]
        <div className=  {`animate-pulse card ${props.row? 'flex flex-row ': ''}rounded-none w-full h-full m-auto`}>
            <figure className='flex-1 relative aspect-[16/9] rounded-xl text-xs bg-base-content object-contain opacity-10' >

            </figure>
            <div className={`flex ${props.row? ' flex-col mx-4': 'flex-row mx-2'} my-4  opacity-10 w-4/6 `}>
                
                <div className="btn-circle rounded-full mr-1 w-10 h-10 bg-base-content"></div>

                <div className='flex flex-col flex-1 justify-around'>
                    <div  className='w-full bg-base-content rounded-md h-1/4 text-bg-base-content'></div>
                    <div  className='w-full bg-base-content rounded-md h-1/4 text-bg-base-content'></div>
                </div>
            </div>
        </div>
    )
}

export default VideoCardDump