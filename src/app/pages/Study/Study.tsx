import { NavLink, useLocation } from "react-router";
import { Sidebar } from "./components/Sidebar";
import img from "@/assets/images/placeholderPostImg.png";

export function Study()
{
  const location = useLocation();
  
  const batch="CSE-23" //must be later replaced with user data from db
  return (
    <main className="w-full h-screen flex">
      <Sidebar batch={batch}></Sidebar>
      <div className="w-full h-full flex flex-col items-center ml-[20vw]">
        <div className="flex w-full gap-5 justify-center mt-6">
          <TabLink linktxt="Notes" dest={`${location}/Notes`}></TabLink>
          <TabLink linktxt="Resources" dest={`${location}/Resources`}></TabLink>
        </div>
        {/*FILTER DROPDOWN BAKI*/}
        <div className="flex flex-row flex-wrap justify-center items-start gap-20 mt-10">
          <Notes previewImage={img} title={"SDP Lab-2"} uploadedBy={"Yeaser Ahmad"} courseCode={"CSE-364"} uploadDate={"12/12/25"} uploadTime={"12:12pm"} ></Notes>
          <Notes previewImage={img} title={"SDP Lab-2"} uploadedBy={"Yeaser Ahmad"} courseCode={"CSE-364"} uploadDate={"12/12/25"} uploadTime={"12:12pm"} ></Notes>
          <Notes previewImage={img} title={"SDP Lab-2"} uploadedBy={"Yeaser Ahmad"} courseCode={"CSE-364"} uploadDate={"12/12/25"} uploadTime={"12:12pm"} ></Notes>
          <Notes previewImage={img} title={"SDP Lab-2"} uploadedBy={"Yeaser Ahmad"} courseCode={"CSE-364"} uploadDate={"12/12/25"} uploadTime={"12:12pm"} ></Notes>
        </div>
      </div>
    </main>
  );
}

function TabLink({linktxt, dest}:{linktxt:string, dest:string})
{
  return(
    <NavLink
      to={dest}
      className={({ isActive }) => [
        "px-3 py-2 rounded-md font-medium text-center h-fit w-fit",
        isActive?
          "bg-accent-lm text-primary-lm hover:bg-hover-btn-lm" : "bg-primary-lm text-accent-lm hover:bg-hover-lm"
      ].join(" ")}>
      {linktxt}
    </NavLink>
  );
}

interface NotesProps
{
  previewImage: string,
  title:string, 
  uploadedBy:string, 
  courseCode:string,
  uploadDate:string,
  uploadTime:string
}

function Notes({previewImage, title, uploadedBy, courseCode, uploadDate, uploadTime}:NotesProps)
{
  return (
    <div className={`flex flex-col w-70 h-90 rounded-xl`}>
      <img src={previewImage} className="object-cover w-full h-2/3 rounded-t-xl rounded-tl-xl"></img>
      <div className="h-full w-full px-5 py-4 bg-linear-to-t from-[#DFE1E5] from-30% via-[#C3A99761] via-100% rounded-b-xl rounded-bl-xl">
        <p className="text-text-lm font-semibold text-md">{title}_{courseCode}</p>
        <p className="text-text-lm font-medium text-base">{uploadedBy}</p>
        <p className="text-text-lighter-lm text-base">Uploaded : {uploadDate} {uploadTime}</p>
      </div>
    </div>
  );
}


// background: linear-gradient(180deg, rgba(195, 169, 151, 0) -18.21%, rgba(212, 203, 198, 0.94) 43.17%, #DFE1E5 100%);
