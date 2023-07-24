
import IconLabel from './IconLabel';
import {
    AccountBoxOutlinedIcon,
    PlayCircleOutlineOutlinedIcon,
    SwitchAccountOutlinedIcon,
    LogoutOutlinedIcon,
    PaidOutlinedIcon,
    AdminPanelSettingsOutlinedIcon,
    Brightness2OutlinedIcon,
    TranslateOutlinedIcon,
    LanguageOutlinedIcon,
    PrivacyTipOutlinedIcon,
    KeyboardAltOutlinedIcon,
    SettingsOutlinedIcon,
    HelpOutlineOutlinedIcon,
    FeedbackOutlinedIcon,
} from "../utils/Imports";

import {useSignINContext} from "../contexts/authContext";

function MenuBar() {
    const signINContext = useSignINContext();
    const { logOut } = useSignINContext();

    const handleSignOut = async () => {
        try {
        await logOut();
        window.location.reload(false);
        } catch (error) {
        console.log(error);
        }
    };
    // const changeSignInState = useChange;
    return (
        <div>
            {!signINContext.isSignedIn ?
            ""
            : 
            <div >
                <div className="flex flex-row my-4 px-3 items-start pb-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                        <img src={signINContext.userData.photoURL} alt='avatar'/>
                    </div>

                    <div className='flex flex-col flex-1'>
                        <span className='font-bold mb-1'>{signINContext.userData.displayName}</span>
                        <a href="" className=' text-secondary text-sm'>Manage your Google Account</a>
                    </div>
                </div>
                <hr className=' h-1 my-1 border-base-content/20'/>
                <IconLabel Icon={AccountBoxOutlinedIcon} text="Your channel"/>
                <IconLabel Icon={PlayCircleOutlineOutlinedIcon} text="Youtube studio"/>
                <div onClick={()=>{signINContext.signIn();}}>
                    <IconLabel Icon={SwitchAccountOutlinedIcon} text="Switch accounts"/>
                </div>
                <div onClick={()=>{handleSignOut();}}>
                    <IconLabel Icon={LogoutOutlinedIcon} text="Sign out" />
                </div>
    
                <hr className=' h-1 my-1 border-base-content/20'/>
    
                <IconLabel Icon={PaidOutlinedIcon} text="Purchases and memberships"/>
            </div>
            }
            <IconLabel Icon={PrivacyTipOutlinedIcon} text="Your data in YouTube"/>

            <hr className=' h-1 my-1 border-base-content/20'/>
            <IconLabel Icon={Brightness2OutlinedIcon} text="Appearance"/>
            <IconLabel Icon={TranslateOutlinedIcon} text="Language"/>
            <IconLabel Icon={AdminPanelSettingsOutlinedIcon} text="Restricted Mode"/>
            <IconLabel Icon={LanguageOutlinedIcon} text="Location"/>
            <IconLabel Icon={KeyboardAltOutlinedIcon} text="Keyboard shortcuts"/>

            <hr className=' h-1 my-1 border-base-content/20'/>
            <IconLabel Icon={SettingsOutlinedIcon} text="Settings"/>
            <hr className=' h-1 my-1 border-base-content/20'/>
            <IconLabel Icon={HelpOutlineOutlinedIcon} text="Help"/>
            <IconLabel Icon={FeedbackOutlinedIcon} text="Send feedback"/>

        </div>
    )
}

export default MenuBar