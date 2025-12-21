import type { ReactNode } from "react";
import illustrationContainer from "../assets/images/signup_img_container.svg";
import signupIllustration2 from "../assets/images/Signup_img.svg";

export function SignupLoginBox({children, title} : {children:ReactNode, title:string}) 
{
  return (
    <div className="flex flex-row mx-10 my-8 bg-secondary-lm rounded-3xl bg-clip-border">
      <div className="px-10 py-8 flex flex-col gap-3 w-1/2 h-full">
        <p className="text-text-lm text-xl font-[Poppins] font-medium">{title}</p>
        {children}
      </div>
      <div className="overflow-hidden w-1/2 rounded-3xl">
        <img src={illustrationContainer} className="relative top-10 left-2 scale-125 "></img>
        <img src={signupIllustration2} className="absolute w-11/12 h-11/12 scale-100 top-1/6 left-[28.5%]"></img>
      </div>
    </div>
  );
}