"use client";

import { useState, Suspense } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import {
  Search,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  ArrowLeft,
  Tag as TagIcon,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PostDetail } from "@/components/post-detail";

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
  // Unified warm orange accents to match the desired theme
  Question: "bg-orange-50 text-orange-700 border border-orange-200",
  Advice: "bg-orange-50 text-orange-700 border border-orange-200",
  Resource: "bg-orange-50 text-orange-700 border border-orange-200",
};

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Writing a research paper",
    author: "Ariful Islam",
    authorAvatar: "/abstract-geometric-shapes.png",
    authorCourse: "NSE-18",
    content:
      "Hello! I recently decided to write a research paper inspired by my seniors. My interests include cybersecurity and AI, but I’m a newbie. Can anyone guide me?",
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

export default function QnA() {
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
  const [tagInput, setTagInput] = useState("");

  const filteredPosts = mockPosts.filter(
    (post) =>
      (activeTab === "All" || post.category === activeTab) &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !newPost.tags.includes(tag.trim())) {
      setNewPost({ ...newPost, tags: [...newPost.tags, tag.trim()] });
    }
    setTagInput("");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">

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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                <Input
                  placeholder="Search anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-9 rounded-full bg-white border border-orange-200 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button
                onClick={() => setIsNewPostOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white"
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
                        ? "bg-orange-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100"
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
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white p-6 rounded-xl border border-orange-200/50 shadow-sm hover:shadow-md hover:border-orange-400 transition cursor-pointer"
                >
                  <div className="flex justify-between mb-3">
                    <Badge
                      className={`rounded-full px-3 py-1 ${
                        categoryStyles[post.category]
                      }`}
                    >
                      {post.category}
                    </Badge>
                    <MoreVertical className="h-5 w-5 text-orange-300" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700">
                      {post.author}
                    </span>
                    <span className="text-sm text-slate-500">
                      {post.timestamp}
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="flex gap-4">
                    {[Heart, MessageCircle, Share2].map((Icon, i) => (
                      <button
                        key={i}
                        className="flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100"
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              rows={5}
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
            />

            {/* Tag chips (Question/Advice/Resource) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <TagIcon className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Tag</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Question", "Advice", "Resource"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewPost({ ...newPost, category: cat })}
                    aria-pressed={newPost.category === cat}
                    className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm border transition focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                      newPost.category === cat
                        ? "border-orange-400 bg-orange-50 text-orange-700 shadow-sm ring-2 ring-orange-300"
                        : "border-orange-200 bg-white text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {newPost.category === cat && (
                      <Check className="h-3.5 w-3.5 text-orange-600" />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
