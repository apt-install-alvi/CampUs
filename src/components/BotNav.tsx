<<<<<<< HEAD
import { NavLink, useLocation } from "react-router";
import searchIcon from "../assets/icons/search_icon.svg";
=======
import { NavLink } from "react-router";
import { SearchAnything } from "./SearchAnything";
>>>>>>> qnaUIandprofile

export function BotNav() {
  return (
    <nav className="bg-primary-lm border-t-0 border-b border-stroke-grey flex items-center justify-center gap-2 h-14">
      <NavbarLinks linktxt="Home" dest="/home" />
      <NavbarLinks linktxt="CollabHub" dest="/collab" />
      <NavbarLinks linktxt="Events" dest="/events" />
      <NavbarLinks linktxt="QnA" dest="/qna" />
      <NavbarLinks linktxt="Study" dest="/study/1/1" activeMatch="/study" />
      <NavbarLinks linktxt="Lost & Found" dest="/lost-and-found" />
      <SearchAnything />
    </nav>
  );
}

<<<<<<< HEAD
function NavbarLinks({linktxt, dest, activeMatch}: {linktxt: string, dest: string, activeMatch?: string})
{
  const location = useLocation();
  return (
    <NavLink
      to={dest}
      className={({ isActive }) => {
        const active = activeMatch ? location.pathname.startsWith(activeMatch) : isActive;
        return [
          "relative text-accent-lm text-md font-medium h-full flex items-center justify-center px-3 hover:after:w-full hover:after:h-0.5 hover:after:bg-accent-lm hover:after:absolute hover:after:bottom-0 hover:after:animate-fade-in",
          active && "bg-hover-lm"
        ].join(" ");
      }}>
=======
function NavbarLinks({ linktxt, dest }: { linktxt: string; dest: string }) {
  return (
    <NavLink
      to={dest}
      className={({ isActive }) =>
        [
          "relative text-accent-lm text-md font-medium h-full flex items-center justify-center px-3 hover:after:w-full hover:after:h-0.5 hover:after:bg-accent-lm hover:after:absolute hover:after:bottom-0 hover:after:animate-fade-in",
          isActive && "bg-hover-lm",
        ].join(" ")
      }
    >
>>>>>>> qnaUIandprofile
      {linktxt}
    </NavLink>
  );
}

<<<<<<< HEAD
function SearchBar()
{
  return (
    <div className="flex px-3 py-1 border border-accent-lm rounded-full">
      <input type="text" placeholder="Search Anything" className="text-accent-lm outline-none" />
      <img src={searchIcon} alt="search" />
    </div>
    
  );
}
=======
// Search handled by SearchAnything component
>>>>>>> qnaUIandprofile
