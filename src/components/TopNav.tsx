import { Link } from "react-router";
import Logo from "../assets/logo-light.svg";

import placeholderDP from "../assets/images/placeholderUser.png";
import messageIcon from "../assets/icons/message_icon.svg";
import bellIcon from "../assets/icons/bell_icon.svg";
import moonIcon from "../assets/icons/moon_icon.svg";
import userIcon from "../assets/icons/user_icon.svg";
import signoutIcon from "../assets/icons/logout_icon.svg";

import { UserInfo } from "./UserInfo";
import { useState } from "react";

//Arbitrary placeholder values till db is connected
const userName:string = "Alvi Binte Zamil";
const userBatch:string = "CSE-23";

export function TopNav()
{
  const [isOpen, setIsOpen]=useState(false);

  return (
    <nav className="bg-primary-lm border border-stroke-grey flex justify-between px-10 py-3">
      <Link to="/home">
        <img src={Logo} className="scale-90"></img>
      </Link>
      <div className="flex justify-center gap-4">
        <button>
          <img src={moonIcon} className="size-6 cursor-pointer"></img>
        </button>

        <button>
          <img src={bellIcon} className="size-8 cursor-pointer"></img>
        </button>

        <button>
          <img src={messageIcon} className="size-6 cursor-pointer"></img>
        </button>

        <button onClick={()=>setIsOpen((prev)=>!prev)} className="rounded-full border-[1.5px] border-accent-lm cursor-pointer">
          <img src={placeholderDP} className="rounded-full size-8" /> 
        </button>
        
        { isOpen && <UserClickModal isOpen={isOpen}></UserClickModal>}

      </div>
    </nav>
  );
}

function UserClickModal({isOpen}:{isOpen:boolean})
{
  return (
    <div className={`bg-primary-lm w-60 px-2 py-3.5 rounded-xl absolute top-12.5 right-8 border border-stroke-grey ${isOpen? "animate-slide-in" : "animate-slide-out"}`}>
      <UserInfo userImg={placeholderDP} userName={userName} userBatch={userBatch} disableClick={true}></UserInfo>
      <hr className="mt-2 border-stroke-grey"></hr>
      <ModalButtons icon={userIcon} label="Profile" linkto={"/profile"}></ModalButtons>
      <hr className="border-stroke-grey"></hr>
      <ModalButtons icon={signoutIcon} label="Sign Out" linkto={"/signup"}></ModalButtons>
    </div>
  );
}

function ModalButtons({icon, label, linkto}:
  {
    icon:string, 
    label:string
    linkto: string
  })
{
  return (
    <Link to={linkto}>
      <button className="flex items-center gap-2 w-full my-1 px-2 py-2 hover:bg-hover-lm hover:rounded-lg">
        <img src={icon}></img>
        <p className="text-accent-lm">{label}</p>
      </button>
    </Link>    
  );
}