import img from "@/assets/images/placeholderPostImg.png";
import { Link } from "react-router";

export function Notes() {
  return (
    <div className="grid grid-cols-3 gap-20 mt-10"> 
    {/* must replace with mapping of real notes in the db inside this batch's table */}
      <NoteItem 
        previewImage={img} 
        title={"SDP Lab-2"} 
        uploadedBy={"Yeaser Ahmad"} 
        courseCode={"CSE-364"} 
        uploadDate={"12/12/25"} 
        uploadTime={"12:12pm"} 
        fileLink="https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=sharing"/>
      <NoteItem 
        previewImage={img} 
        title={"SDP Lab-2"} 
        uploadedBy={"Yeaser Ahmad"} 
        courseCode={"CSE-364"} 
        uploadDate={"12/12/25"} 
        uploadTime={"12:12pm"} 
        fileLink="https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=sharing"/>
      <NoteItem 
        previewImage={img} 
        title={"SDP Lab-2"} 
        uploadedBy={"Yeaser Ahmad"} 
        courseCode={"CSE-364"} 
        uploadDate={"12/12/25"} 
        uploadTime={"12:12pm"} 
        fileLink="https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=sharing"/>
      <NoteItem 
        previewImage={img} 
        title={"SDP Lab-2"} 
        uploadedBy={"Yeaser Ahmad"} 
        courseCode={"CSE-364"} 
        uploadDate={"12/12/25"} 
        uploadTime={"12:12pm"} 
        fileLink="https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=sharing"/>
    </div>
  );
}

interface NotesProps
{
  previewImage: string,
  title:string, 
  uploadedBy:string, 
  courseCode:string,
  uploadDate:string,
  uploadTime:string,
  fileLink:string
}

function NoteItem({previewImage, title, uploadedBy, courseCode, uploadDate, uploadTime, fileLink}:NotesProps)
{
  return (
    <Link to={fileLink} target="_blank">
      <div className={`flex flex-col w-70 h-90 rounded-xl`}>
        <img src={previewImage} className="object-cover w-full h-2/3 rounded-t-xl rounded-tl-xl"></img>
        <div className="h-full w-full px-5 py-4 bg-linear-to-t from-[#DFE1E5] from-30% via-[#C3A99761] via-100% rounded-b-xl rounded-bl-xl">
          <p className="text-text-lm font-semibold text-md">{title}_{courseCode}</p>
          <p className="text-text-lm font-medium text-base">{uploadedBy}</p>
          <p className="text-text-lighter-lm text-base">Uploaded : {uploadDate} {uploadTime}</p>
        </div>
      </div>
    </Link>
  );
}