import { PostBody } from "../../features/feed/components/PostBody";

//placeholder data
import {placeholderUser} from "../../features/feed/api/placeholderUser.ts";
import placeholderPostImg from "../../features/feed/assets/placeholderPostImg.png"
import { useState } from "react";
import { ButtonCTA } from "../../components/ButtonCTA.tsx";
const title="Announcing CyberVoid 2025 by MCSC. Don’t miss it!";
const content={
  text: "For the first time, MIST Cyber Security Club is hosting a 3-in-1 event exclusively for MIST students! CyberVoid'25 kicks off on Dec 10, 2025, and wraps up on Dec 12. Don't miss out on this incredible 3-day experience! Register now and secure your spot! Featu...",
  img: placeholderPostImg
}
const user=placeholderUser;



export function Home()
{
  return (
    <div className="flex gap-10 h-full w-full p-10">
      <div className="flex flex-col gap-10 h-full bg-primary-lm p-10 rounded-2xl border-2 border-stroke-grey">
        <PostBody title={title} content={content} user={user}/>
        <PostBody title={title} content={content} user={user}/>
      </div>
      <UpcomingEvents></UpcomingEvents>
    </div>
  );
}

export function UpcomingEvents()
{

  const [eventCount, setEventCount]=useState(1);//temp val for presentation purposes only, will be set to 0 initially and connected with db
  return (
    <div className="flex flex-col justify-start w-170 h-fit bg-primary-lm border-2 border-stroke-grey rounded-2xl">
      <div className="p-3 border border-t-0 border-l-0 border-r-0 border-b-stroke-grey">
        <h6 className="font-[Poppins] font-semibold text-text-lm">Upcoming Events</h6>
      </div>
      <div className="p-4 flex flex-col justify-start">
        {(eventCount===0)? 
        <p className="text-text-lighter-lm text-md">No events added</p>
        :
        // events will be mapped to number of events that are interested by the user ONLY WITHIN 1 week of the current date
        //will be wrapped in a <Link> where to=/(link of post)
        <div className="flex flex-col py-2 px-3 hover:bg-secondary-lm hover:w-full hover:rounded-lg">
          <p className="font-medium text-md text-text-lm">MCSC CyberVoid'25</p>
          <p className="text-text-lighter-lm">Saturday, 27 Dec 2025</p>
        </div>
        }
      </div>
      <div className="flex justify-end p-3">
        <ButtonCTA label={"Add More"}></ButtonCTA>
        {/* add a click event that navigates to Event page */}
      </div>
    </div>
  );
}