import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";

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

export default function LostFoundPost({
  post,
  onOpenComments,
}: {
  post: LFPost;
  onOpenComments: () => void;
}) {
  const descRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const t = setTimeout(() => {
      setShowReadMore(el.scrollHeight > el.clientHeight + 1);
    }, 0);

    const onResize = () => {
      if (!el) return;
      setShowReadMore(el.scrollHeight > el.clientHeight + 1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [post.description]);

  return (
    <div
      className="bg-primary-lm p-6 rounded-xl border border-stroke-grey shadow-sm hover:shadow-md hover:border-stroke-peach transition animate-slide-in"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-text-lm">{post.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-text-lm">{post.author}</span>
            <span className="text-[12px] text-text-lighter-lm">{post.authorCourse}</span>
            <span className="text-[12px] text-text-lighter-lm">• {post.timestamp}</span>
          </div>
        </div>
        <MoreVertical className="h-5 w-5 text-accent-lm" />
      </div>

      <div className="mb-4">
        {/* description container: set a CSS maxHeight when collapsed so we can detect overflow */}
        <div
          ref={descRef}
          style={
            collapsed
              ? { maxHeight: "4.5rem", overflow: "hidden" } // approx 3 lines
              : undefined
          }
          className="text-text-lm mb-2"
        >
          {post.description}
        </div>

        {/* Read More only shows when content overflows the collapsed box */}
        {showReadMore && (
          <Button
            variant="ghost"
            className="ml-0 h-auto p-0 text-accent-lm"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? "Read More" : "Show less"}
          </Button>
        )}
      </div>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Lost item" className="w-full rounded-lg border border-stroke-grey mb-4" />
      )}

      <div className="mt-4 flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm">
          <Heart className="h-4 w-4" />
          <span className="text-sm font-bold">{post.reactions}</span>
        </button>

        <button
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stroke-peach bg-secondary-lm text-accent-lm"
          onClick={onOpenComments}
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
  );
}
