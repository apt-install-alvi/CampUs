import type { ReactNode } from "react";
import signupIllustration from "@/assets/images/SignupImg.svg";

export function SignupLoginBox({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    /* Full viewport wrapper → consistent centering everywhere */
    <div className="min-h-screen flex items-center justify-center">
      
      {/* Your original box — width preserved */}
      <div className="flex flex-row mx-10 my-8 bg-secondary-lm rounded-3xl shadow-lg shadow-stroke-grey w-[85vw] max-w-350">
        
        {/* Left section */}
        <div className="px-12 py-8 flex flex-col justify-center gap-3 w-1/2">
          <p className="text-text-lm text-xl font-[Poppins] font-medium">
            {title}
          </p>
          {children}
        </div>

        {/* Right section */}
        <div className="overflow-hidden w-1/2 rounded-3xl">
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>

      </div>
    </div>
  );
}
