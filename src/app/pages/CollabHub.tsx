import { useState, useMemo } from "react";
import { placeholderUser } from "../../features/feed/api/placeholderUser";
import { LikeButton, CommentButton, ShareButton } from "../../features/feed/components/PostButtons";

// Types
type Category = "all" | "research" | "competition" | "project";

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
  const [filter, setFilter] = useState<Category>("all");
  const categories: Category[] = ["all", "research", "competition", "project"];

  const filteredPosts = useMemo(() => {
    if (filter === "all") return initialPosts;
    return initialPosts.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="flex gap-10 h-full w-full p-10 bg-white">
      {/* LEFT: Categories */}
      <div className="flex flex-col gap-4 w-48 h-fit bg-primary-lm p-4 rounded-2xl border-2 border-stroke-grey">
        <h6 className="font-[Poppins] font-semibold text-text-lm mb-2">Categories</h6>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-left px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === cat
                ? "bg-[#C23D00] text-[#FFFFFF]"
                : "hover:bg-secondary-lm text-text-lighter-lm"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* RIGHT: Posts */}
      <div className="flex flex-col gap-10 flex-1">
        <div className="flex flex-col gap-10">
          {filteredPosts.length === 0 ? (
            <div className="bg-primary-lm p-10 rounded-2xl border-2 border-stroke-grey flex items-center justify-center min-h-[200px]">
              <p className="text-text-lighter-lm text-lg">No posts in this category</p>
            </div>
          ) : (
            filteredPosts.map((p) => (
              <div
                key={p.id}
                className="bg-primary-lm p-10 rounded-2xl border-2 border-stroke-grey flex flex-col gap-6"
              >
                {/* User Info - EXACTLY LIKE HOME PAGE */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={p.user.avatar}
                      alt={p.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {/* Online status indicator - same as Home page */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-lm text-base">
                      {p.user.name}
                    </span>
                    <span className="text-text-lighter-lm text-sm">
                      {p.user.dept} • {p.user.role || "Student"}
                    </span>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="font-[Poppins] font-semibold text-xl text-text-lm">
                  {p.title}
                </h3>

                {/* Post Content */}
                <p className="text-text-lighter-lm text-lg leading-relaxed">{p.content}</p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-bold bg-[#C23D00] text-[#FFFFFF] px-3 py-1.5 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interaction Buttons */}
                <div className="flex gap-4 items-center mt-2">
                  <LikeButton />
                  <CommentButton />
                  <ShareButton />
                  <button className="ml-auto px-4 py-2 border border-[#C23D00] rounded-full text-[#C23D00] font-medium hover:bg-[#C23D00] hover:text-[#FFFFFF] transition-colors duration-200">
                    Interested
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CollabHub;