import React, { useMemo, useState } from "react";
import postImg from "@/assets/images/placeholderPostImg.png";
import CategorySelection, { type CategoryKey } from "../../../components/CategorySelection";
import EventPost from "./components/EventPost";
import CreateEventModal from "./components/CreateEventModal";
import EventPostDetail from "./components/EventPostDetail";


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
    segments: [
      {
        id: "s1",
        name: "CyberSecurity Quiz",
        description:
          "Short quiz about security basics with small prizes for winners.",
        date: "2025-12-27",
        time: "15:00",
      },
      {
        id: "s2",
        name: "Break the Firewall",
        description: "Hands-on CTF challenge to test your penetration skills.",
        date: "2025-12-27",
        time: "15:00",
      },
    ],
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

  // selected post for detail view
  const [selectedPost, setSelectedPost] = useState<EventPostType | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  function handleCreate(post: EventPostType) {
    setPosts((prev) => [post, ...prev]);
  }

  // when user clicks a post: show detail
  function openDetail(post: EventPostType) {
    setSelectedPost(post);
    // optionally scroll to top:
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeDetail() {
    setSelectedPost(null);
  }

  return (
    <div className="min-h-screen bg-background-lm">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <CategorySelection value={filter} onChange={setFilter} />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="rounded-xl bg-secondary-lm border border-stroke-grey p-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full rounded-md border border-stroke-grey bg-primary-lm px-4 py-3 text-left text-sm text-text-lighter-lm hover:bg-[#FFF4EE]"
              >
                Click to announce an event here
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {selectedPost ? (
                // Render the detail view
                <EventPostDetail post={selectedPost} onBack={closeDetail} />
              ) : (
                // Render the feed
                filtered.map((p) => (
                  <EventPost key={p.id} post={p as any} onClick={() => openDetail(p)} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateEventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Events;
