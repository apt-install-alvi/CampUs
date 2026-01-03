import { useState, Suspense, useEffect, useRef } from "react";
import {
  Search,
  Heart as HeartIcon,
  MessageCircle as MessageIcon,
  Share2 as ShareIcon,
  MoreVertical,
  Check,
  Tag as TagIcon,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { PostDetail } from "./components/PostDetail";

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
      "Hello! I recently decided to write a research paper inspired by my seniors. My interests include cybersecurity and AI, but I’m a newbie. Can anyone guide me? (This demo post includes a fairly long body to show wrapping and read-more behavior.)",
    category: "Advice",
    tags: ["Research", "Academic"],
    reactions: 54,
    comments: 33,
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
    reactions: 42,
    comments: 18,
    shares: 3,
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
    setIsNewPostOpen(false);
    setNewPost({ title: "", description: "", tags: [], category: "Question" });
  }

  // add an inline comment to a post (increments comment count)
  function addInlineComment(postId: string, commentText: string) {
    if (!commentText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: p.comments + 1 } : p
      )
    );
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
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenDetail={() => setSelectedPost(post)}
                  onLike={() => toggleLike(post.id)}
                  onAddInlineComment={(text) => addInlineComment(post.id, text)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent
          className="sm:max-w-lg bg-primary-lm border-stroke-grey text-text-lm max-h-[80vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 px-0">
            <Input
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
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
              <div className="flex items-center gap-2 text-text-lm">
                <TagIcon className="h-4 w-4 text-accent-lm" />
                <span className="text-sm font-medium text-text-lm">Tag</span>
              </div>
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
                    {newPost.category === cat && (
                      <Check className="h-3.5 w-3.5 text-accent-lm" />
                    )}
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

  // measure overflow
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const check = () => {
      // small tolerance
      setShowReadMore(el.scrollHeight > el.clientHeight + 1);
    };

    // run on next tick to let layout settle
    const t = setTimeout(check, 0);
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", check);
    };
  }, [post.content]);

  function handleCommentClick(e?: React.MouseEvent) {
    // If event provided, stop it from opening detail. We expand inline instead.
    e?.stopPropagation();
    setCollapsed(false);
    setReplying(true);
  }

  function submitReply() {
    const txt = replyText.trim();
    if (!txt) return;
    onAddInlineComment(txt);
    setReplyText("");
    setReplying(false);
    // keep expanded so user sees their comment effect
  }

  return (
    <div
      // clicking outside buttons opens detail
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetail();
        }
      }}
      onClick={onOpenDetail}
      className="bg-primary-lm p-6 rounded-xl border border-stroke-grey shadow-sm hover:shadow-md hover:border-stroke-peach transition animate-slide-in"
      style={{ cursor: "pointer" }}
    >
      <div className="flex justify-between mb-3">
        <Badge className={`rounded-full px-3 py-1 border ${categoryStyles[post.category]}`}>
          {post.category}
        </Badge>
        <MoreVertical className="h-5 w-5 text-accent-lm" />
      </div>

      <div className="mb-2">
        <h3
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail();
          }}
          className="text-lg font-semibold text-text-lm mb-2 wrap-break-word whitespace-normal max-w-full"
        >
          {post.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.authorAvatar} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-text-lm">{post.author}</span>
          <span className="text-sm text-text-lighter-lm">{post.timestamp}</span>
        </div>

        {/* CONTENT area: fixed collapsed height so card doesn't grow */}
        <div
          ref={contentRef}
          className="text-text-lm mb-2 wrap-break-word whitespace-normal max-w-full"
          style={
            collapsed
              ? { maxHeight: "6rem", overflow: "hidden" } // fixed collapsed height
              : {}
          }
        >
          {post.content}
        </div>

        {/* Read More toggles collapsed state */}
        {showReadMore && (
          <Button
            variant="ghost"
            className="ml-0 h-auto p-0 text-accent-lm"
            onClick={(e) => {
              e.stopPropagation(); // don't open detail
              setCollapsed((c) => !c);
              // if expanding, also show reply area
              if (collapsed) {
                setReplying(true);
              }
            }}
          >
            {collapsed ? "Read More" : "Show less"}
          </Button>
        )}
      </div>

      {/* Image / other content can follow here if needed */}

      <div className="mt-4 flex items-center gap-3">
        {/* Like: stop propagation so it doesn't open detail */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm"
        >
          <HeartIcon className="h-4 w-4" />
          <span className="text-sm font-bold">{post.reactions}</span>
        </button>

        {/* Comment: expand inline rather than open detail */}
        <button
          type="button"
          onClick={(e) => handleCommentClick(e)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm"
        >
          <MessageIcon className="h-4 w-4" />
          <span className="text-sm font-bold">{post.comments}</span>
        </button>

        {/* Share: keep local, stop propagation */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            alert("Share clicked (implement share logic)");
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm"
        >
          <ShareIcon className="h-4 w-4" />
          <span className="text-sm font-bold">{post.shares}</span>
        </button>
      </div>

      {/* Inline reply area shown when expanded or replying */}
      {!collapsed && (
        <div className="mt-4 bg-primary-lm rounded-xl p-4 shadow-sm border border-stroke-grey">
          {!replying ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReplying(true);
              }}
              className="w-full text-left px-4 py-3 text-text-lighter-lm text-sm hover:bg-hover-lm rounded-lg transition-colors"
            >
              Add a reply
            </button>
          ) : (
            <div className="space-y-4">
              <Textarea
                placeholder="Add a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-25 border-none focus-visible:ring-0 p-0 text-sm bg-primary-lm text-text-lm placeholder:text-text-lighter-lm"
              />
              <div className="flex items-center justify-between pt-2 border-t border-stroke-grey">
                <span className="text-xs text-text-lighter-lm italic">
                  Replying as You
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReplying(false);
                      setReplyText("");
                    }}
                    className="text-text-lm"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-accent-lm hover:bg-hover-btn-lm text-primary-lm px-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      submitReply();
                    }}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
