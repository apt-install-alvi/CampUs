import fallbackImg from "@/assets/images/fallbackImage.png";
import { useParams } from "react-router";

import { getNotes, type Note } from "@/lib/studyMock";
import { ButtonCTA } from "@/components/ButtonCTA";
import { useState } from "react";
import { NotesAddModal } from "./NotesAddModal";

export function Notes() {
  const [openAddModal, setOpenAddModal]=useState(false);

  const { level, term } = useParams();
  const notes: Note[] = getNotes(level, term);

  if (!notes.length) {
    return <h5 className="mt-10 text-text-lighter-lm ">No notes for this term yet.</h5>;
  }

  return (
    <>
      <div className="flex flex-col gap-y-1 mt-10">
        <ButtonCTA label={"Add File"} clickEvent={()=>setOpenAddModal(true)}></ButtonCTA>
        <div className="grid grid-cols-3 gap-20 mt-8">
          {notes.map((n) => (
            <NoteItem key={n.id} {...n} />
          ))}
        </div>
      </div>

      {openAddModal && <NotesAddModal onClose={() => setOpenAddModal(false)}></NotesAddModal>}
    </>
  );
}

function NoteItem({ previewImage, title, uploadedBy, courseCode, uploadDate, uploadTime, fileLink }: Note) {
  return (
    <a href={fileLink} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col w-70 h-90 rounded-xl bg-primary-lm hover:scale-102 transition duration-300 hover:drop-shadow-lg">
        <img src={previewImage || fallbackImg} className="object-cover w-full h-2/3 rounded-t-xl rounded-tl-xl" alt={title} />
        <div className="h-full w-full px-5 py-4 bg-linear-to-t from-[#DFE1E5] from-30% via-[#C3A99761] via-100% rounded-b-xl rounded-bl-xl">
          <p className="text-text-lm font-semibold text-md">{title}_{courseCode}</p>
          <p className="text-text-lm font-medium text-base">{uploadedBy}</p>
          <p className="text-text-lighter-lm text-base">Uploaded : {uploadDate} {uploadTime}</p>
        </div>
      </div>
    </a>
  );
}