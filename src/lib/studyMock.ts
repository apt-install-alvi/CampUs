import user1 from "@/assets/images/cycle.png";
import user2 from "@/assets/images/placeholderUser.png";
import user3 from "@/assets/images/SignupImg.svg";

export interface Note {
  id: string;
  previewImage: string;
  title: string;
  uploadedBy: string;
  courseCode: string;
  uploadDate: string;
  uploadTime: string;
  fileLink: string;
}

const notesDB: Record<string, Note[]> = {
  "1-1": [
    {
      id: "n1",
      previewImage: "/src/assets/images/NotesImg.png",
      title: "Discrete Math",
      uploadedBy: "Yeaser Ahmad",
      courseCode: "CSE-101",
      uploadDate: "01/09/2023",
      uploadTime: "10:00am",
      fileLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },
    {
      id: "n2",
      previewImage: "/src/assets/images/NotesImg.png",
      title: "CT-2 Lecture Notes",
      uploadedBy: "Alvi Binte Zamil",
      courseCode: "MATH-101",
      uploadDate: "03/10/2023",
      uploadTime: "2:30pm",
      fileLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },

    {
      id: "n3",
      previewImage: "/src/assets/images/NotesImg.png",
      title: "CT-3 Notes",
      uploadedBy: "Than Than Thay",
      courseCode: "PHY-101",
      uploadDate: "03/10/2023",
      uploadTime: "2:30pm",
      fileLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },

    {
      id: "n4",
      previewImage: "/src/assets/images/NotesImg.png",
      title: "Organic Chemistry",
      uploadedBy: "Md Ariful Islam",
      courseCode: "CHEM-101",
      uploadDate: "03/10/2023",
      uploadTime: "2:30pm",
      fileLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },
  ],
  "1-2": [
    {
      id: "n5",
      previewImage: "/src/assets/images/NotesImg.png",
      title: "DLD Notes",
      uploadedBy: "Than Than Thay",
      courseCode: "CSE-103",
      uploadDate: "01/05/2024",
      uploadTime: "11:15am",
      fileLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },
  ],
  "2-1": [
    {
      id: "n6",
      previewImage: "/src/assets/images/NotesImg.png",
      title: "Data Structures",
      uploadedBy: "Md Ariful Islam",
      courseCode: "CSE-204",
      uploadDate: "06/06/2024",
      uploadTime: "9:00am",
      fileLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },
  ],
};

interface ResourceUser {
  name: string;
  batch: string;
  imgURL: string;
}

export interface ResourceItem {
  user: ResourceUser;
  title: string;
  course: string;
  resourceLink: string;
}

const resourcesDB: Record<string, ResourceItem[]> = {
  "1-1": [
    {
      user: { name: "Yeaser Ahmad", batch: "CSE-23", imgURL: user3 },
      title: "Discrete Math Good Video",
      course: "CSE-101",
      resourceLink: "https://www.youtube.com/watch?v=p2b2Vb-cYCs&list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3",
    },
    {
      user: { name: "Alvi Binte Zamil", batch: "CSE-23", imgURL: user2 },
      title: "CT-2 Slides",
      course: "PHY-101",
      resourceLink: "https://docs.google.com/document/d/1grn59V272XT3P4ZSHewFH0K57pKSht8RebalssrAlkQ/edit?usp=drive_link",
    },
  ],
  "1-2": [
    {
      user: { name: "Than Than Thay", batch: "CSE-23", imgURL: user2 },
      title: "DLD Lab Reference",
      course: "CSE-104",
      resourceLink: "https://docs.google.com/presentation/d/1P0Y03j47nc_Zq9p-VC1whwF9zfMSYrMk/edit?usp=drive_link&ouid=114501181698666564902&rtpof=true&sd=true",
    },
  ],
  "2-1": [
    {
      user: { name: "Md Ariful Islam", batch: "CSE-22", imgURL: user1 },
      title: "DS Reading",
      course: "CSE-204",
      resourceLink: "https://resource.example.com/4",
    },
    {
      user: { name: "Md Ariful Islam", batch: "CSE-22", imgURL: user1 },
      title: "OOP Assignment Help",
      course: "CSE-206",
      resourceLink: "https://resource.example.com/5",
    },
  ],
};

export function getNotes(level: string | number | undefined, term: string | number | undefined): Note[] {
  const key = `${level ?? "1"}-${term ?? "1"}`;
  return notesDB[key] ?? [];
}

export function getResources(level: string | number | undefined, term: string | number | undefined): ResourceItem[] {
  const key = `${level ?? "1"}-${term ?? "1"}`;
  return resourcesDB[key] ?? [];
}
