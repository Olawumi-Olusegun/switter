import React from 'react'
import { BsHouseFill, BsBellFill,  } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react'

import SideBarLogo from './SideBarLogo';
import SideBarItem from './SideBarItem';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';



const Sidebar = () => {

    const { data: currentUser } = useCurrentUser();

    const handleSignOut = async () => {
         signOut();
    }

    const iconsLists = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill,
            auth: true,
            alert: currentUser?.hasNotification,
        },
        {
            label: "Profile",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        },
    ]




  return (
    <div className="cols-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
                <SideBarLogo />
                {
                    iconsLists?.map((icon) => (
                        <SideBarItem  
                         key={icon.href}
                         href={icon.href}
                         label={icon.label}
                         icon={icon.icon}
                         auth={icon.auth}
                         alert={icon.alert}
                        //  onClick={() => {}}
                        />
                    ))
                }
                {
                    currentUser && (
                        <SideBarItem
                            href="/logout"
                            label="Logout"
                            icon={BiLogOut}
                            onClick={handleSignOut}
                        />
                        
                    )
                }
                <SidebarTweetButton />
            </div>
        </div>
    </div>
  )
}

export default Sidebar