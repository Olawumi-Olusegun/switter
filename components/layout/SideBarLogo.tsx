import React from 'react'
import { useRouter } from 'next/router'

import { BsTwitter } from 'react-icons/bs';


const SideBarLogo = () => {

    const router = useRouter();

    const gotoHome = () => router.push("/");

  return (
    <div 
        onClick={gotoHome}
        className="
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        hover:bg-blue-300
        hover:bg-opacity-10
        cursor-pointer
        transition
    "> 
        <BsTwitter size={28} color="white" />
    </div>
  )
}

export default SideBarLogo