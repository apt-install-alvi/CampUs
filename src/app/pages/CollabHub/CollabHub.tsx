import { useState, useMemo, useEffect } from "react";
import { placeholderUser } from "../../../lib/placeholderUser";
import {
  LikeButton,
  CommentButton,
  ShareButton,
} from "../../../components/PostButtons";

import { UserInfo } from "@/components/UserInfo";
import { CategoryFilter} from "@/components/Category_Events_CollabHub/CategoryFilter";
import type { Category } from "@/components/Category_Events_CollabHub/Category";
import CreateCollabPost from "./components/CreateCollabPost";


type CollabPost = {
  id: string;
  category: Category;
  title: string;
  content: string;
  user: typeof placeholderUser;
  tags: string[];
  likes: number;
  comments: number;
};

// Sample posts
const initialPosts: CollabPost[] = [
  {
    id: "p1",
    category: "competition",
    title: "Java Project Competition",
    content:
      "We are participating in a Java Project Competition. We are short of 2 persons on our team.",
    user: placeholderUser,
    tags: ["#java", "#javafx", "#postgresql"],
    likes: 3,
    comments: 1,
  },
  {
    id: "p2",
    category: "research",
    title: "Data collection for Diabetes research",
    content:
      "Currently working on a research paper related to Diabetes. Need people for data collection.",
    user: placeholderUser,
    tags: ["#biomed", "#research"],
    likes: 46,
    comments: 12,
  },
  {
    id: "p3",
    category: "project",
    title: "Web App Project Team",
    content:
      "Looking for a frontend developer to join our web app project on student productivity tracking.",
    user: placeholderUser,
    tags: ["#frontend", "#react"],
    likes: 12,
    comments: 2,
  },
];


  export function CollabHub() {
  const [posts, setPosts] = useState<CollabPost[]>(initialPosts);
  const [filter, setFilter] = useState<Category>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const categories: Category[] = ["all", "research", "competition", "project"];

  const filteredPosts = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [filter, posts]);

  return (
    <div className="flex gap-10 h-full w-full p-10 bg-background-lm">
      {/* LEFT: Posts */}
      <div className="flex-1">
        <div className="flex flex-col gap-10 h-full bg-primary-lm p-10 rounded-2xl border-2 border-stroke-grey">
          {/* Announce collaboration */}
          <button
            onClick={() => setModalOpen(true)}
            className="w-full rounded-md border border-stroke-grey bg-secondary-lm px-4 py-3 text-left text-sm text-accent-lm hover:bg-hover-lm transition "
          >
            Click to post a collaboration post here.
          </button>

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="flex items-center justify-center min-h-50 border-stroke-grey">
              <p className="text-text-lighter-lm text-lg">
                No posts in this category
              </p>
            </div>
          ) : (
            filteredPosts.map((p) => (
     
              <div key={p.id} className="bg-secondary-lm p-8 rounded-xl border border-stroke-grey hover:bg-hover-lm transition border-2 border-stroke-grey hover:border-stroke-peach p-8 rounded-2xl">
                <UserInfo
                  userImg={p.user.imgURL}
                  userName={p.user.name}
                  userBatch={p.user.batch || "Student"}
                />
                <h3 className="font-[Poppins] font-semibold text-xl text-text-lm">
                  {p.title}
                </h3>
                <p className="text-text-lighter-lm text-lg leading-relaxed">
                  {p.content}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-bold bg-[#C23D00] text-[#FFFFFF] px-3 py-1.5 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 items-center mt-2">
                  <LikeButton />
                  <CommentButton />
                  <ShareButton />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selected={filter}
        onChange={setFilter}
      />

      <CreateCollabPost
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCreate={(payload) => {
          const newPost: CollabPost = {
            id: `p${posts.length + 1}`,
            category: payload.category,
            title: payload.title,
            content: payload.description,
            user: placeholderUser,
            tags: payload.tags.map((t) => `#${t}`),
            likes: 0,
            comments: 0,
          };
          setPosts((prev) => [newPost, ...prev]);
        }}
      />

    </div>
  );
}

export default CollabHub;
