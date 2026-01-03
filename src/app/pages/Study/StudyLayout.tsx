import { NavLink, Outlet, useParams } from "react-router";
import { Sidebar } from "./components/Sidebar";

export function StudyLayout() {
  const { level, term } = useParams();
  const batch = "CSE-23";  //must replace with data from db later

  const notesPath = `/study/${level}/${term}/notes`;
  const resourcesPath = `/study/${level}/${term}/resources`;
  
  return(
    <main className="w-full h-screen flex">
      <Sidebar batch={batch} />
      <div className="w-full h-full flex flex-col items-center ml-[20vw]">
        <div className="flex w-full gap-5 justify-center mt-6">
          <TabLink linktxt="Notes" dest={notesPath} />
          <TabLink linktxt="Resources" dest={resourcesPath} />
        </div>
        <Outlet />
      </div>
    </main>
  );
}

function TabLink({ linktxt, dest }: { linktxt: string; dest: string }) 
{
  return (
    <NavLink
      to={dest}
      className={({ isActive }) => [
        "px-3 py-2 rounded-md font-medium text-center h-fit w-fit",
        isActive
          ? "bg-accent-lm text-primary-lm hover:bg-hover-btn-lm"
          : "bg-primary-lm text-accent-lm hover:bg-hover-lm",
      ].join(" ")}
    >
      {linktxt}
    </NavLink>
  );
}
