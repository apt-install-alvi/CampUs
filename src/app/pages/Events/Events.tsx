import React, { useMemo, useState } from "react";
import postImg from "@/assets/images/placeholderPostImg.png";
import { CategoryFilter } from "@/components/Category_Events_CollabHub/CategoryFilter";
import type { Category } from "@/components/Category_Events_CollabHub/Category";
import CreateEventModal from "./components/CreateEventModal";
import EventPostDetail from "./components/EventPostDetail";
import { PostBody } from "@/components/PostBody";
import { placeholderUser } from "../../../lib/placeholderUser";
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
  const [filter, setFilter] = useState<Category>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState<EventPostType | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  function handleCreate(post: EventPostType) {
    setPosts((prev) => [post, ...prev]);
  }

  function openDetail(post: EventPostType) {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeDetail() {
    setSelectedPost(null);
  }

  return (
    <div className="min-h-screen bg-background-lm">
      <div className="flex gap-10 h-full w-full p-10">
        {/* LEFT: Posts */}
        <div className="flex flex-col gap-10 h-full w-full bg-primary-lm p-10 rounded-2xl border-2 border-stroke-grey">
          <div className="rounded-xl bg-secondary-lm border border-stroke-grey p-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full rounded-md border border-stroke-grey bg-primary-lm px-4 py-3 text-left text-sm text-text-lighter-lm hover:bg-[#FFF4EE]"
            >
              Click to announce an event here
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center">
            {selectedPost ? (
              <EventPostDetail post={selectedPost} onBack={closeDetail} />
            ) : (
              <div className="flex flex-col gap-10 h-full w-[60vw]">
                {filtered.length === 0 ? (
                  <div className="flex items-center justify-center">
                    <p className="text-text-lighter-lm text-lg">
                      No posts in this category
                    </p>
                  </div>
                ) : (
                  filtered.map((p) => {
                    const content = {
                      text: p.excerpt ?? p.body ?? "",
                      img: p.image ?? undefined,
                    };

                    const user = {
                          ...placeholderUser, 
                          name: p.author,
                          batch: p.dept ?? "Student",
                        };


                   return (
                      <div
                        key={p.id}
                        onClick={() => openDetail(p)}
                        className="cursor-pointer flex flex-col gap-4"
                      >
                        
                        <PostBody
                          title={p.title}
                          content={content}
                          user={user}
                          tags={p.tags}
                          category={p.category}
                          
                        />

                      
                      </div>
                    );

                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Categories */}
        <CategoryFilter
          categories={["all", "workshop", "seminar", "course", "competition"]}
          selected={filter}
          onChange={setFilter}
        />
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
