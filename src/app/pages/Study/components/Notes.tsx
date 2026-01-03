import img from "@/assets/images/placeholderPostImg.png";
import { useParams } from "react-router";

import { getNotes, type Note } from "@/lib/studyMock";

export function Notes() {
  const { level, term } = useParams();
  const notes: Note[] = getNotes(level, term);

  if (!notes.length) {
    return <h5 className="mt-10 text-text-lighter-lm ">No notes for this term yet.</h5>;
  }

  return (
    <div className="grid grid-cols-3 gap-20 mt-10">
      {notes.map((n) => (
        <NoteItem key={n.id} {...n} />
      ))}
    </div>
  );
}

function NoteItem({ previewImage, title, uploadedBy, courseCode, uploadDate, uploadTime, fileLink }: Note) {
  return (
    <a href={fileLink} target="_blank" rel="noopener noreferrer">
      <div className={`flex flex-col w-70 h-90 rounded-xl`}>
        <img src={previewImage || img} className="object-cover w-full h-2/3 rounded-t-xl rounded-tl-xl" alt={title} />
        <div className="h-full w-full px-5 py-4 bg-linear-to-t from-[#DFE1E5] from-30% via-[#C3A99761] via-100% rounded-b-xl rounded-bl-xl">
          <p className="text-text-lm font-semibold text-md">{title}_{courseCode}</p>
          <p className="text-text-lm font-medium text-base">{uploadedBy}</p>
          <p className="text-text-lighter-lm text-base">Uploaded : {uploadDate} {uploadTime}</p>
        </div>
      </div>
    </a>
  );
}