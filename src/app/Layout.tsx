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
      <div className="fixed w-full h-screen">
        {!hideNav && <TopNav />}
        {!hideNav && <BotNav />}
      </div>

      <main className={`${hideNav ? "min-h-screen h-screen flex items-center justify-center" : "flex items-center justify-center"} py-30`}>
        <Outlet />
      </main>
    </>
  );
}
