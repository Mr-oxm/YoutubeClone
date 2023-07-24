
import KeywordsSelector from './partials/KeywordsSelector';
import SidebarClosed from './partials/SidebarClosed';
import Sidebar from './partials/Sidebar';
import {useThemeContext} from './contexts/themeContext';
import { Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function HomeScreen() {
    const themeContext=useThemeContext()
    themeContext.setHasSiderbar(true);

    return (
        <>
            <div className='flex flex-row w-full'>

                {/* --------- start sidebarClosed section ---------*/}
                {themeContext.closeSidebar?
                    <SidebarClosed hidelg/>
                    :
                    <Sidebar hidelg/>
                }
                <div className='grid lg:hidden'>
                    <SidebarClosed/>
                </div>
                {/* --------- end sidebarClosed section ---------*/}


                {/* --------- start recommended section ---------*/}
                <div className='flex flex-col  font-normal relative w-full sm:flex-1 md:w-5/6 '>
                    <KeywordsSelector/>
                    <Outlet/>
                </div>
                {/* --------- start recommended section ---------*/}

            </div>
        </>
    )
}
export default HomeScreen