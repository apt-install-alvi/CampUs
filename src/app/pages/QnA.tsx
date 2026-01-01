// File: src/app/pages/QnA.tsx
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PostDetail } from "@/components/post-detail";
import QnaPost from "@/components/QnaPost";

export type Post = {
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
  // Use theme tokens from index.css
  Question: "bg-secondary-lm text-accent-lm border-stroke-peach",
  Advice: "bg-secondary-lm text-accent-lm border-stroke-peach",
  Resource: "bg-secondary-lm text-accent-lm border-stroke-peach",
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
  const [activeTab, setActiveTab] = useState<"All" | "Question" | "Advice" | "Resource">("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // posts state now lives here so created posts appear
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const filteredPosts = posts.filter(
    (post) =>
      (activeTab === "All" || post.category === activeTab) &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function generateId(prefix = "p-") {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  }

  function handleCreatePost(payload: {
    title: string;
    description: string;
    tags: string[];
    category: Post["category"];
  }) {
    const newPost: Post = {
      id: generateId("qna-"),
      title: payload.title,
      author: "You",
      authorAvatar: "/placeholder.svg",
      authorCourse: "—",
      content: payload.description,
      category: payload.category,
      tags: payload.tags,
      reactions: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
    };

    setPosts((prev) => [newPost, ...prev]);
  }

  return (
    <div className="min-h-screen bg-background-lm animate-fade-in">
      <main className="mx-auto max-w-4xl px-4 py-6">
        {selectedPost ? (
          <PostDetail post={{ ...selectedPost, commentsCount: selectedPost.comments }} onBack={() => setSelectedPost(null)} />
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

              {/* Trigger for the separate modal component */}
              <QnaPost
                open={isNewPostOpen}
                onOpenChange={setIsNewPostOpen}
                onCreate={(p) => {
                  handleCreatePost(p);
                  setIsNewPostOpen(false);
                }}
              />

              <Button onClick={() => setIsNewPostOpen(true)} className="bg-accent-lm hover:bg-hover-btn-lm text-primary-lm">
                New Post
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(["All", "Question", "Advice", "Resource"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === tab ? "bg-accent-lm text-primary-lm" : "bg-primary-lm text-text-lm hover:bg-hover-lm"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-primary-lm p-6 rounded-xl border border-stroke-grey shadow-sm hover:shadow-md hover:border-stroke-peach transition cursor-pointer animate-slide-in"
                >
                  <div className="flex justify-between mb-3">
                    <Badge className={`rounded-full px-3 py-1 border ${categoryStyles[post.category]}`}>
                      {post.category}
                    </Badge>
                    <MoreVertical className="h-5 w-5 text-accent-lm" />
                  </div>

                  <h3 className="text-lg font-semibold text-text-lm mb-2">{post.title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-text-lm">{post.author}</span>
                    <span className="text-sm text-text-lighter-lm">{post.timestamp}</span>
                  </div>

                  <p className="text-text-lm leading-relaxed mb-4">{post.content}</p>

                  <div className="flex gap-4">
                    {[Heart, MessageCircle, Share2].map((Icon, i) => (
                      <button
                        key={i}
                        className="flex items-center gap-2 px-3 py-1 rounded-full border border-stroke-peach text-accent-lm bg-secondary-lm hover:bg-hover-lm"
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

    </div>
  );
}

// end of QnA.tsx



