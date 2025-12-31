"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreVertical, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import cycleImg from "@/assets/images/cycle.png";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LFPost = {
  id: string;
  title: string;
  author: string;
  authorCourse: string;
  authorAvatar?: string;
  description: string;
  imageUrl?: string;
  reactions: number;
  comments: number;
  shares: number;
  timestamp: string;
};

const mockPosts: LFPost[] = [
  {
    id: "lf-1",
    title: "My Cycle is lost!!!!",
    author: "Ariful Khan Pathan",
    authorCourse: "CSE-23",
    authorAvatar: "/abstract-geometric-shapes.png",
    description:
      "Bhai amar cycle churi hoye gese MIST theke please bhai keu dekhle boliyen...",
    imageUrl: cycleImg,
    reactions: 46,
    comments: 2,
    shares: 2,
    timestamp: "2h ago",
  },
];

export function LostFound() {
  const [query] = useState("");
  const [isAnnounceOpen, setIsAnnounceOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    file: undefined as File | undefined,
  });
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [activePost, setActivePost] = useState<LFPost | null>(null);
  const [commentText, setCommentText] = useState("");

  type LFComment = {
    id: string;
    author: string;
    avatar?: string;
    content: string;
    timestamp: string;
  };

  // posts state (initialized from mockPosts)
  const [posts, setPosts] = useState<LFPost[]>(mockPosts);

  const [commentsByPost, setCommentsByPost] = useState<
    Record<string, LFComment[]>
  >({
    "lf-1": [
      {
        id: "c1",
        author: "Hasan Mahmud",
        avatar: "/placeholder.svg?key=h1",
        content: "Hi! I saw your cycle in Mist field.",
        timestamp: "1h ago",
      },
      {
        id: "c2",
        author: "Dulal Mia",
        avatar: "/placeholder.svg?key=d1",
        content: "Ohh! Ami o dekhchi oi khane, akta meye chalachchhilo.",
        timestamp: "30m ago",
      },
    ],
  });

  const openComments = (post: LFPost) => {
    setActivePost(post);
    setIsCommentsOpen(true);
  };

  const submitComment = () => {
    if (!activePost) return;
    const txt = commentText.trim();
    if (!txt) return;
    const newC: LFComment = {
      id: `${activePost.id}-c-${Date.now()}`,
      author: "You",
      avatar: "/placeholder.svg?key=u1",
      content: txt,
      timestamp: "now",
    };
    setCommentsByPost((prev) => ({
      ...prev,
      [activePost.id]: [...(prev[activePost.id] ?? []), newC],
    }));
    setCommentText("");
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  function generateId(prefix = "lf-") {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  }

  // Handle posting new Lost/Found announcement
  function handlePost() {
    const title = form.title.trim();
    const description = form.description.trim();

    // simple guard: require at least title or description
    if (!title && !description) {
      // you can show validation if you want; for now just return
      return;
    }

    // create image URL if file present
    const imageUrl = form.file ? URL.createObjectURL(form.file) : undefined;

    const newPost: LFPost = {
      id: generateId("lf-"),
      title: title || "Untitled",
      author: "You",
      authorCourse: "—",
      authorAvatar: "/placeholder.svg",
      description: description,
      imageUrl,
      reactions: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
    };

    // prepend post (newest first)
    setPosts((prev) => [newPost, ...prev]);

    // ensure comment bucket exists for this post
    setCommentsByPost((prev) => ({
      ...prev,
      [newPost.id]: prev[newPost.id] ?? [],
    }));

    // reset form
    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      file: undefined,
    });

    // clear native file input value if present
    const fileInput = document.getElementById("lf-file-input") as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";

    // close dialog
    setIsAnnounceOpen(false);
  }

  return (
    <div className="min-h-screen bg-background-lm animate-fade-in">
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Composer */}
        <div className="rounded-xl border border-stroke-grey bg-primary-lm p-4 mb-6">
          <Input
            placeholder="Tap to announce what has been lost or found"
            readOnly
            onClick={() => setIsAnnounceOpen(true)}
            className="cursor-pointer rounded-lg bg-primary-lm border-stroke-peach placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
          />
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="bg-primary-lm p-6 rounded-xl border border-stroke-grey shadow-sm hover:shadow-md hover:border-stroke-peach transition animate-slide-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-text-lm">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={post.authorAvatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-text-lm">
                      {post.author}
                    </span>
                    <span className="text-[12px] text-text-lighter-lm">
                      {post.authorCourse}
                    </span>
                    <span className="text-[12px] text-text-lighter-lm">
                      • {post.timestamp}
                    </span>
                  </div>
                </div>
                <MoreVertical className="h-5 w-5 text-accent-lm" />
              </div>

              <p className="text-text-lm mb-4">
                {post.description}
                <Button
                  variant="ghost"
                  className="ml-2 h-auto p-0 text-accent-lm"
                >
                  Read More
                </Button>
              </p>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Lost item"
                  className="w-full rounded-lg border border-stroke-grey"
                />
              )}

              <div className="mt-4 flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-bold">{post.reactions}</span>
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm"
                  onClick={() => openComments(post)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-bold">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm font-bold">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Announce Dialog */}
      <Dialog open={isAnnounceOpen} onOpenChange={setIsAnnounceOpen}>
        <DialogContent className="sm:max-w-xl bg-primary-lm border-stroke-grey text-text-lm">
          <DialogHeader>
            <DialogTitle>Announce Lost or Found Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-text-lighter-lm">Title</label>
              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
              />
            </div>
            <div>
              <label className="text-sm text-text-lighter-lm">
                Description
              </label>
              <Textarea
                placeholder="Describe the item and context"
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-1 bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-text-lighter-lm">Date</label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1 bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
                />
              </div>
              <div>
                <label className="text-sm text-text-lighter-lm">Time</label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="mt-1 bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-3">
              <Button
                className="bg-accent-lm hover:bg-hover-btn-lm text-primary-lm"
                onClick={() => document.getElementById("lf-file-input")?.click()}
              >
                Upload Image
              </Button>
              <Input
                id="lf-file-input"
                type="file"
                onChange={(e) =>
                  setForm({ ...form, file: e.target.files?.[0] })
                }
                className="bg-primary-lm border-stroke-grey text-text-lm file:text-text-lm"
              />
            </div>
            <Button
              className="w-full bg-accent-lm hover:bg-hover-btn-lm text-primary-lm"
              onClick={handlePost}
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comments Dialog */}
      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent className="sm:max-w-xl bg-primary-lm border-stroke-grey text-text-lm">
          {activePost && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-text-lm">
                  {activePost.author}
                </DialogTitle>
              </DialogHeader>
              <div>
                <h3 className="text-lg font-bold text-text-lm">
                  {activePost.title}
                </h3>
                <p className="text-text-lighter-lm mt-1">
                  {activePost.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Join the conversation"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-primary-lm border-stroke-grey text-text-lm placeholder:text-text-lighter-lm focus-visible:ring-accent-lm focus-visible:border-accent-lm"
                />
                <Button
                  className="h-9 w-9 p-0 rounded-full bg-accent-lm text-primary-lm hover:bg-hover-btn-lm"
                  onClick={submitComment}
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {(commentsByPost[activePost.id] ?? []).map((c) => (
                  <div key={c.id} className="flex gap-2">
                    <Avatar className="h-8 w-8 border border-stroke-grey">
                      <AvatarImage src={c.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{c.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-bold text-text-lm">
                        {c.author}
                      </div>
                      <div className="text-sm text-text-lm">{c.content}</div>
                      <div className="text-xs text-text-lighter-lm">
                        {c.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
