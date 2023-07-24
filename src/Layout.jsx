import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./partials/Navbar"
import {useThemeContext} from './contexts/themeContext';
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Layout() {
    let location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location]);

    return (
        <div data-theme={useThemeContext().theme}   className="App bg-base-300 font-[roboto]" >

            <Navbar />
            <Outlet />

        </div>
    )
}
export default Layout