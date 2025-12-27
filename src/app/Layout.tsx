import { Outlet, useLocation } from "react-router-dom";
import {TopNav} from "../components/TopNav";
import {BotNav} from "../components/BotNav";

export function Layout() {
  const location = useLocation();

  // adjust the list of routes where navs should be hidden
  const hideNavPaths = ["/signup", "/login"]; // hide TopNav on profile; page uses its own Navbar
  const hideNav = hideNavPaths.includes(location.pathname);

  return (
    <>
      {!hideNav && <TopNav />}
      {!hideNav && <BotNav />}
      <main className={`${hideNav ? "min-h-screen flex items-center justify-center" : "flex-1"} container mx-auto px-4 py-6`}>
        <Outlet />
      </main>
    </>
  );
}
