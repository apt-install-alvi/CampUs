// src/app/pages/Events.tsx
import React, { useMemo, useState } from "react";
import postImg from "../../features/feed/assets/placeholderPostImg.png";

import CategorySelection, {type CategoryKey } from "../../components/CategorySelection";

// Use your feed EventPost composer that relies on PostBody/PostButtons/ShareModal
import EventPost from "../../features/feed/components/EventPost";
import CreateEventModal from "../../components/CreateEventModal";

/**
 * Local EventPostType (keep in sync with what your EventPost expects)
 */
type Segment = {
  id: string;
  name?: string;
  description?: string;
  date?: string;
  time?: string;
};

type EventPostType = {
  id: string;
  category: string;
  title: string;
  author: string;
  dept?: string;
  excerpt?: string;
  body?: string;
  image?: string | null;
  segments?: Segment[];
  tags?: string[];
  likes?: number;
  comments?: number;
  shares?: number;
};

const initialPosts: EventPostType[] = [
  {
    id: "p1",
    category: "workshop",
    title: "Announcing CyberVoid 2025 by MCSC. Don't miss it!",
    author: "Than Than Thay",
    dept: "CSE-23",
    excerpt:
      "For the first time, MIST Cyber Security Club is hosting a 3-in-1 event exclusively for MIST students! CyberVoid'25 kicks off on Dec 10, 2025...",
    body:
      "For the first time, MIST Cyber Security Club is hosting a 3-in-1 event exclusively for MIST students! CyberVoid'25 kicks off on Dec 10, 2025, and wraps up on Dec 12. Don't miss out on this incredible 3-day experience! Register now and secure your spot! Features include cybersecurity quiz, CTF challenges and hands-on workshops.",
    image: postImg,
    segments: [],
    tags: ["hackathon", "ctf"],
    likes: 46,
    comments: 12,
    shares: 2,
  },
  {
    id: "p2",
    category: "seminar",
    title: "Cloud Security Seminar — Industry speakers",
    author: "Cloud Club",
    dept: "EECE",
    excerpt: "Join industry experts for a seminar on modern cloud security architecture...",
    body: "An in-depth seminar with speakers from major cloud providers covering best practices for secure deployments.",
    image: null,
    segments: [],
    tags: ["cloud", "seminar"],
    likes: 12,
    comments: 3,
    shares: 1,
  },
];

export function Events() {
  const [posts, setPosts] = useState<EventPostType[]>(initialPosts);
  const [filter, setFilter] = useState<CategoryKey>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  function handleCreate(post: EventPostType) {
    setPosts((prev) => [post, ...prev]);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">

 

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <CategorySelection value={filter} onChange={setFilter} />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full rounded-md border px-4 py-3 text-left text-sm text-[var(--color-muted-foreground)] hover:bg-[#FFF4EE]"
              >
                Click to announce an event here
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {filtered.map((p) => (
                <EventPost key={p.id} post={p as any} />
              ))}
            </div>
          </div>
        </div>
      </div>

  

      <CreateEventModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  );
}

export default Events;
