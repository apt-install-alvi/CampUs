import { NavLink, Outlet, useParams, useLocation } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { getNotes, getResources } from "@/lib/studyMock";
import { useMemo } from "react";
import { placeholderUser } from "@/lib/placeholderUser";

export function StudyLayout() {
  const { level, term } = useParams();
  const batch = placeholderUser.batch;

  const notesPath = `/study/${level}/${term}/notes`;
  const resourcesPath = `/study/${level}/${term}/resources`;
  
  const notes = getNotes(level, term);
  const resources = getResources(level, term);
  const location = useLocation();
  const viewingResources = location.pathname.includes("/resources");

  const courses = useMemo(() => {
    return viewingResources
      ? Array.from(new Set(resources.map((r) => r.course)))
      : Array.from(new Set(notes.map((n) => n.courseCode)));
  }, [viewingResources, resources, notes]);

  const uploaders = useMemo(() => {
    return viewingResources
      ? Array.from(new Set(resources.map((r) => r.user.name)))
      : Array.from(new Set(notes.map((n) => n.uploadedBy)));
  }, [viewingResources, resources, notes]);
  
  return(
    <main className="w-full h-screen flex">
      <Sidebar batch={batch} />
      <div className="w-full h-full flex flex-col ml-[20vw] px-10">
        <div className="flex w-full gap-5 justify-center mt-6">
          <TabLink linktxt="Notes" dest={notesPath} />
          <TabLink linktxt="Resources" dest={resourcesPath} />
        </div>
        <div className="mt-6 flex flex-row gap-x-4">
          <p className="text-accent-lm font-medium">Filter by</p>
          {(() => {
            return (
              <>
                <select
                  name="course"
                  id="course"
                  defaultValue={"Course"}
                  className="bg-primary-lm border border-stroke-grey rounded-sm px-2 py-0.5 text-stroke-peach focus:border focus:border-stroke-peach"
                >
                  <option value={"Course"} disabled>
                    Course
                  </option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  name="uploadedby"
                  id="uploadedby"
                  defaultValue={"Uploaded by"}
                  className="bg-primary-lm border border-stroke-grey rounded-sm px-2 py-0.5 text-stroke-peach"
                >
                  <option value={"Uploaded by"} disabled>
                    Uploaded by
                  </option>
                  {uploaders.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </>
            );
          })()}
        </div>
        <div className="flex flex-col items-center">
          <Outlet />
        </div>
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
          ? "bg-accent-lm text-primary-lm hover:bg-hover-btn-lm transition"
          : "bg-primary-lm text-accent-lm border border-stroke-grey hover:bg-hover-lm transition",
      ].join(" ")}
    >
      {linktxt}
    </NavLink>
  );
}
