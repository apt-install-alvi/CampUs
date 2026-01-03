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
      previewImage: "/src/assets/images/placeholderPostImg.png",
      title: "Discrete Math",
      uploadedBy: "Yeaser Ahmad",
      courseCode: "CSE-101",
      uploadDate: "01/09/2023",
      uploadTime: "10:00am",
      fileLink: "https://example.com/sdp-lab-1",
    },
    {
      id: "n2",
      previewImage: "/src/assets/images/placeholderPostImg.png",
      title: "CT-2 Lecture Notes",
      uploadedBy: "Alvi Binte Zamil",
      courseCode: "CSE-101",
      uploadDate: "03/10/2023",
      uploadTime: "2:30pm",
      fileLink: "https://example.com/sdp-lecture-1",
    },
  ],
  "1-2": [
    {
      id: "n3",
      previewImage: "/src/assets/images/placeholderPostImg.png",
      title: "DLD Notes",
      uploadedBy: "Than Than Thay",
      courseCode: "CSE-103",
      uploadDate: "01/05/2024",
      uploadTime: "11:15am",
      fileLink: "https://example.com/algo-notes",
    },
  ],
  "2-1": [
    {
      id: "n4",
      previewImage: "/src/assets/images/placeholderPostImg.png",
      title: "Data Structures",
      uploadedBy: "Md Ariful Islam",
      courseCode: "CSE-204",
      uploadDate: "06/06/2024",
      uploadTime: "9:00am",
      fileLink: "https://example.com/ds-notes",
    },
  ],
};

const resourcesDB: Record<string, string[]> = {
  "1-1": ["https://resource.example.com/1", "https://resource.example.com/2"],
  "1-2": ["https://resource.example.com/3"],
  "2-1": ["https://resource.example.com/4", "https://resource.example.com/5"],
};

export function getNotes(level: string | number | undefined, term: string | number | undefined): Note[] {
  const key = `${level ?? "1"}-${term ?? "1"}`;
  return notesDB[key] ?? [];
}

export function getResources(level: string | number | undefined, term: string | number | undefined): string[] {
  const key = `${level ?? "1"}-${term ?? "1"}`;
  return resourcesDB[key] ?? [];
}
