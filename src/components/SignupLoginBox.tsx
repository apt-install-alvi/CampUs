import React from "react";
import type { ReactNode } from "react";

interface SignupLoginBoxProps {
  children: ReactNode;
  illustrationSrc?: string;
  illustrationTitle?: string;
  title?: string;
}

export default function SignupLoginBox({
  children,
  illustrationSrc,
  illustrationTitle = "Illustration",
  title,
}: SignupLoginBoxProps) {
  return (
    <div className="min-h-[88vh] flex items-center justify-center p-4 md:p-6 bg-[var(--color-background-lm)]">
      <div
        className="relative w-full max-w-[1400px] rounded-2xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.98)" }}
      >
        {/* Increased from 1200px to 1400px */}
        
        {/* Background spans under curve */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#F3F4F6]">
          {/* Changed from md to lg for larger breakpoint */}
          
          {/* LEFT: content - increased from 6 to 7 columns on large screens */}
          <div className="relative z-10 lg:col-span-7 p-8 md:p-10 lg:p-12">
            {/* Changed from md:col-span-6 to lg:col-span-7 */}
            {/* Added more padding for larger screens */}
            
            {title && (
              <h1
                className="text-3xl md:text-4xl font-semibold mb-6 md:mb-8"
                style={{ color: "var(--color-text-lm)" }}
              >
                {title}
              </h1>
            )}

            {children}
          </div>

          {/* RIGHT: overlapping curved SVG - decreased from 6 to 5 columns */}
          <div className="relative hidden lg:block lg:col-span-5 -ml-[100px] 2xl:-ml-[120px]">
            {/* Changed from md:col-span-6 to lg:col-span-5 */}
            {/* Adjusted negative margin for the curve overlap */}
            
            <svg
              viewBox="0 0 700 900"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Curve clip - adjusted for wider left side */}
                <clipPath id="auth-clip">
                  <path d="M180 0 C 80 140, 40 260, 140 420 C 280 640, 40 740, 180 900 L 700 900 L 700 0 Z" />
                  {/* Adjusted curve to start earlier (from 220 to 180) */}
                </clipPath>

                {/* Shadow */}
                <filter id="curve-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="-10"  
                    dy="0"
                    stdDeviation="14"  
                    floodColor="rgba(0,0,0,0.15)"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              {/* White curve body (creates cut effect) */}
              <g filter="url(#curve-shadow)">
                <path
                  d="M180 0 C 80 140, 40 260, 140 420 C 280 640, 40 740, 180 900 L 700 900 L 700 0 Z"
                  fill="#FFFFFF"
                />
              </g>

              {/* Illustration inside curve */}
              {illustrationSrc && (
                <g clipPath="url(#auth-clip)">
                  <image
                    href={illustrationSrc}
                    x="0"
                    y="0"
                    width="700"
                    height="900"
                    preserveAspectRatio="xMidYMid slice"
                    aria-labelledby="auth-illustration-title"
                  />
                  <title id="auth-illustration-title">
                    {illustrationTitle}
                  </title>
                </g>
              )}
              
              {/* Fallback if no illustration */}
              {!illustrationSrc && (
                <g clipPath="url(#auth-clip)">
                  <rect x="0" y="0" width="700" height="900" fill="#F8FAFC" />
                  {/* Light gray fallback */}
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}