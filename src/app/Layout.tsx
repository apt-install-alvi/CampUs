// src/app/Layout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "../components/TopNav";
import BotNav from "../components/BotNav";

export default function Layout() {
  const location = useLocation();

  // adjust the list of routes where navs should be hidden
  const authPaths = ["/signup", "/login"];
  const hideNav = authPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background-lm)] text-[var(--color-text-lm)]">
      {!hideNav && <TopNav />}
      <main className={`${hideNav ? "min-h-screen flex items-center justify-center" : "flex-1"} container mx-auto px-4 py-6`}>
        <Outlet />
      </main>
      {!hideNav && <BotNav />}
    </div>
  );
}
