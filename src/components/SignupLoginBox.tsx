import type { ReactNode } from "react";
// import illustrationContainer from "../assets/images/signup_img_container.svg";
// import signupIllustration2 from "../assets/images/Signup_img.svg";
import signupIllustration from "../assets/images/SignupImg.svg";

export function SignupLoginBox({children, title} : {children:ReactNode, title:string}) 
{
  return (
    <div className="flex flex-row mx-10 my-8 bg-secondary-lm rounded-3xl h-210 shadow-lg shadow-stroke-grey">
      <div className="px-12 py-8 flex flex-col gap-3 w-1/2 h-full">
        <p className="text-text-lm text-xl font-[Poppins] font-medium">{title}</p>
        {children}
      </div>
      <div className="overflow-hidden w-1/2 rounded-3xl">
        <img src={signupIllustration} className="object-cover w-full h-full"></img> 
      </div>
    </div>
  );
}