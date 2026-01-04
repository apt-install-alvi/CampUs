import { useState, Suspense, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { UserInfo } from "@/components/UserInfo";
import {
  LikeButton,
  CommentButton,
  ShareButton,
} from "../../../components/PostButtons";
import { PostDetail } from "./components/PostDetail";
import { addNotification } from "../../../lib/notifications";

type Post = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  authorCourse: string;
  content: string;
  category: "Question" | "Advice" | "Resource";
  tags: string[];
  reactions: number;
  comments: number;
  shares: number;
  timestamp: string;
};

const categoryStyles = {
  Question: "bg-secondary-lm text-accent-lm border-stroke-peach",
  Advice: "bg-secondary-lm text-accent-lm border-stroke-peach",
  Resource: "bg-secondary-lm text-accent-lm border-stroke-peach",
};

const initialMockPosts: Post[] = [
  {
    id: "1",
    title: "Writing a research paper",
    author: "Ariful Islam",
    authorAvatar: "/abstract-geometric-shapes.png",
    authorCourse: "NSE-18",
    content:
      "Hello! I recently decided to write a research paper inspired by my seniors. My interests include cybersecurity and AI, but I’m a newbie. I tried learning about Machine Learning, Pattern Recognition, LLMs and other jargon but it's all still very confusing to me. Like it just straight up flies over my head. As for cybersecurity, I find OSINT problems fun to solve, but Web Hacking is my absolute weak spot. Can anyone guide me?",
    category: "Advice",
    tags: ["Research", "Academic"],
    reactions: 0,
    comments: 3,
    shares: 1,
    timestamp: "2 days ago",
  },
  {
    id: "2",
    title: "How do I start my deep fake project?",
    author: "Sarah Chen",
    authorAvatar: "/abstract-geometric-shapes.png",
    authorCourse: "CS-22",
    content:
      "I want to start a deep fake detection project for my final year. Any suggestions?",
    category: "Question",
    tags: ["AI", "Project"],
    reactions: 0,
    comments: 3,
    shares: 1,
    timestamp: "3 days ago",
  },
];

export function QnA() {
  return (
    <Suspense fallback={null}>
      <QAPageContent />
    </Suspense>
  );
}

function QAPageContent() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Question" | "Advice" | "Resource"
  >("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    category: "Question" as Post["category"],
  });

  // posts are stateful so we can update reactions/comments etc.
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);

  const filteredPosts = posts.filter(
    (post) =>
      (activeTab === "All" || post.category === activeTab) &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleAddTag(tag: string) {
    if (tag.trim() && !newPost.tags.includes(tag.trim())) {
      setNewPost({ ...newPost, tags: [...newPost.tags, tag.trim()] });
    }
  }

  // Like handler: toggle +1 behavior (simple)
  function toggleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, reactions: p.reactions + 1 } : p
      )
    );
  }

  // Create a new post -> prepend to posts
  function submitNewPost() {
    const title = newPost.title.trim();
    if (!title) return;
    const id = Date.now().toString();
    const created: Post = {
      id,
      title,
      author: "You",
      authorAvatar: "/placeholder.svg",
      authorCourse: "—",
      content: newPost.description,
      category: newPost.category,
      tags: newPost.tags,
      reactions: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
    };
    setPosts((p) => [created, ...p]);
    // Notify: new QnA post created
    addNotification({
      type: "qna",
      title: `New QnA Post: ${title}`,
      description: newPost.description,
      path: "/qna",
    });
    setIsNewPostOpen(false);
    setNewPost({ title: "", description: "", tags: [], category: "Question" });
  }

  // add an inline comment to a post (increments comment count)
  function addInlineComment(postId: string, commentText: string) {
    if (!commentText.trim()) return;
    // Update comments count, then open detail view with updated post
    setPosts((prev) => {
      const next = prev.map((p) =>
        p.id === postId ? { ...p, comments: p.comments + 1 } : p
      );
      const updated = next.find((p) => p.id === postId) || null;
      setSelectedPost(updated);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-background-lm animate-fade-in">
      <main className="mx-auto max-w-4xl px-4 py-6">
        {selectedPost ? (
          <PostDetail
            post={{ ...selectedPost, commentsCount: selectedPost.comments }}
            onBack={() => setSelectedPost(null)}
          />
        ) : (
          <>
            {/* Search + New Post */}
            <div className="mb-6 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent-lm" />
                <Input
                  placeholder="Search anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-9 rounded-full bg-primary-lm border border-stroke-grey placeholder:text-text-lighter-lm focus:ring-2 focus:ring-accent-lm focus:border-accent-lm"
                />
              </div>
              <Button
                onClick={() => setIsNewPostOpen(true)}
                className="bg-accent-lm hover:bg-hover-btn-lm text-primary-lm"
              >
                New Post
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(["All", "Question", "Advice", "Resource"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeTab === tab
                        ? "bg-accent-lm text-primary-lm"
                        : "bg-primary-lm text-text-lm hover:bg-hover-lm"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="flex items-center justify-center min-h-50">
                  <p className="text-text-lighter-lm text-lg">
                    No posts in this category
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onOpenDetail={() => setSelectedPost(post)}
                    onLike={() => toggleLike(post.id)}
                    onAddInlineComment={(text) =>
                      addInlineComment(post.id, text)
                    }
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="sm:max-w-lg bg-primary-lm border-stroke-grey text-text-lm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 px-0">
            <Input
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
            />

            <Textarea
              placeholder="Description"
              rows={5}
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
              className="w-full bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
            />

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {(["Question", "Advice", "Resource"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewPost({ ...newPost, category: cat })}
                    aria-pressed={newPost.category === cat}
                    className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm border transition focus:outline-none focus:ring-2 focus:ring-accent-lm ${
                      newPost.category === cat
                        ? "border-stroke-peach bg-secondary-lm text-accent-lm shadow-sm ring-2 ring-accent-lm"
                        : "border-stroke-grey bg-primary-lm text-text-lm hover:bg-hover-lm"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full bg-accent-lm hover:bg-hover-btn-lm text-primary-lm"
                onClick={submitNewPost}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/**
 * PostCard: renders a feed card with a fixed collapsed content height.
 * - Detects overflow and shows "Read More" when needed
 * - Clicking "Read More" or the Comment icon expands the card in-place (revealing full content + inline reply box)
 * - Clicking the card header/title opens the detail view
 */
function PostCard({
  post,
  onOpenDetail,
  onLike,
  onAddInlineComment,
}: {
  post: Post;
  onOpenDetail: () => void;
  onLike: () => void;
  onAddInlineComment: (text: string) => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setShowReadMore(el.scrollHeight > el.clientHeight + 1);
  }, [post.content]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        // Avoid navigating to detail while composing a reply
        if (!replying) onOpenDetail();
      }}
      className="
        relative
        bg-secondary-lm p-8 rounded-2xl
        border-2 border-stroke-grey
        hover:bg-hover-lm hover:border-stroke-peach
        transition cursor-pointer
      "
    >
      <span
        className={`
        absolute top-4 right-4
        px-3 py-1 font-semibold rounded-full border
        ${categoryStyles[post.category]}
      `}
      >
        {post.category}
      </span>

      {/* USER */}
      <UserInfo
        userImg={post.authorAvatar}
        userName={post.author}
        userBatch={post.authorCourse}
      />

      {/* TITLE */}
      <h5 className="font-[Poppins] font-semibold text-text-lm mt-2">
        {post.title}
      </h5>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="text-text-lighter-lm text-md leading-relaxed mt-2"
        style={collapsed ? { maxHeight: "6rem", overflow: "hidden" } : {}}
      >
        {post.content}
      </div>

      {showReadMore && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed((c) => !c);
            if (collapsed) setReplying(true);
          }}
          className="text-accent-lm text-sm font-medium mt-1"
        >
          {collapsed ? "Read more" : "Show less"}
        </button>
      )}

      {/* TAGS */}
      <div className="flex gap-2 flex-wrap mt-3">
        <span className="font-bold bg-[#C23D00] text-primary-lm px-3 py-1.5 rounded-full text-sm">
          #{post.category}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="font-bold bg-[#C23D00] text-primary-lm px-3 py-1.5 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 items-center mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
        >
          <LikeButton />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail();
          }}
        >
          <CommentButton />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Share clicked");
          }}
        >
          <ShareButton />
        </button>
      </div>

      {/* TIMESTAMP */}
      <p className="text-xs text-text-lighter-lm mt-2">{post.timestamp}</p>

      {/* INLINE REPLY (UNCHANGED LOGIC, STYLED) */}
      {!collapsed && (
        <div className="mt-4 bg-secondary-lm rounded-2xl p-6 border-2 border-stroke-grey">
          {!replying ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReplying(true);
              }}
              className="w-full text-left px-4 py-3 text-text-lighter-lm text-sm hover:bg-hover-lm rounded-lg transition"
            >
              Add a reply
            </button>
          ) : (
            <div className="space-y-4">
              <Textarea
                placeholder="Add a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="border-none bg-secondary-lm text-text-lm focus-visible:ring-0"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setReplying(false);
                    setReplyText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-accent-lm text-primary-lm"
                  onClick={() => {
                    onAddInlineComment(replyText);
                    setReplyText("");
                    setReplying(false);
                  }}
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
