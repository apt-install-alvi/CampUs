// src/components/EventPostDetail.tsx
import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type Segment = {
  id: string;
  name?: string;
  description?: string;
  date?: string;
  time?: string;
};

export type EventPostType = {
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

type Comment = {
  id: string;
  author: string;
  avatar: string;
  course: string;
  content: string;
  likes: number;
  replies?: Comment[];
  timestamp: string;
};

interface Props {
  post: EventPostType;
  onBack: () => void;
}

export default function EventPostDetail({ post, onBack }: Props) {
  const [commentText, setCommentText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  // dummy comments — you can replace with real data
  const comments: Comment[] = [
    {
      id: "c1",
      author: "Hasan Mahmud",
      avatar: "/placeholder.svg?key=h1",
      course: "CSE-22",
      content: "Hi ! thank you for your post",
      likes: 5,
      timestamp: "1h ago",
      replies: [
        {
          id: "c2",
          author: "Dulal Mia",
          avatar: "/placeholder.svg?key=d1",
          course: "NSE-18",
          content: "Wow!",
          likes: 3,
          timestamp: "30m ago",
        },
      ],
    },
    {
      id: "c3",
      author: "Thon Thon Thuy",
      avatar: "/placeholder.svg?key=t1",
      course: "CSE-22",
      content: "Cool Post!",
      likes: 8,
      timestamp: "15m ago",
    },
  ];

  // Category badge classes (same mapping as PostBody)
  const catClassMap: Record<string, string> = {
    workshop: "bg-red-100 text-red-700 border border-red-200",
    seminar: "bg-green-100 text-green-700 border border-green-200",
    course: "bg-blue-100 text-blue-700 border border-blue-200",
    competition: "bg-purple-100 text-purple-700 border border-purple-200",
  };

  const catLabel = post.category
    ? post.category.charAt(0).toUpperCase() + post.category.slice(1)
    : "";

  return (
    <div className="space-y-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-accent-lm hover:opacity-80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Go Back</span>
      </button>

      {/* Main Post Card */}
      <div className="bg-primary-lm rounded-xl p-6 shadow-sm border border-stroke-grey animate-slide-in">
        <div className="flex items-start justify-between mb-4">
          <Badge
            variant="secondary"
            className={`bg-secondary-lm text-accent-lm px-3 py-1 ${catClassMap[post.category] ?? ""}`}
          >
            {catLabel}
          </Badge>
          <button className="text-accent-lm hover:opacity-80">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-text-lm mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10 border border-stroke-grey">
            <AvatarImage src={undefined /* placeholder or use actual avatar */} />
            <AvatarFallback>{post.author?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-bold text-accent-lm">
              {post.author}
            </div>
            <div className="text-xs text-text-lighter-lm font-medium">
              {post.dept ?? ""}
            </div>
          </div>
        </div>

        <p className="text-text-lm leading-relaxed mb-6">
          {post.body ?? post.excerpt ?? ""}
        </p>

        {/* Segments: show each segment as a separate card */}
        {post.segments && post.segments.length > 0 && (
          <div className="space-y-4 mb-6">
            {post.segments.map((seg) => (
              <div
                key={seg.id}
                className="rounded-lg border border-stroke-grey bg-secondary-lm p-4"
              >
                <h4 className="font-semibold text-text-lm">{seg.name}</h4>
                {seg.description && (
                  <p className="text-sm text-text-lm mt-2">{seg.description}</p>
                )}
                <div className="text-xs text-text-lighter-lm mt-3">
                  {seg.date && (
                    <span className="mr-4">
                      {new Date(seg.date).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  {seg.time && <span>{seg.time}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image */}
        {post.image && (
          <div className="mb-6 w-full h-72 overflow-hidden rounded-md">
            <img
              src={post.image}
              className="object-cover object-center w-full h-full"
              alt={post.title}
            />
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-stroke-grey">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-lm text-accent-lm hover:bg-hover-lm transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-bold">{post.likes ?? 0}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-lm text-accent-lm hover:bg-hover-lm transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-bold">{post.comments ?? 0}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-lm text-accent-lm hover:bg-hover-lm transition-colors">
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-bold">{post.shares ?? 0}</span>
          </button>
        </div>
      </div>

      {/* Add Reply Section */}
      <div className="bg-primary-lm rounded-xl p-4 shadow-sm border border-stroke-grey">
        {!isReplying ? (
          <button
            onClick={() => setIsReplying(true)}
            className="w-full text-left px-4 py-3 text-text-lighter-lm text-sm hover:bg-hover-lm rounded-lg transition-colors"
          >
            Add a reply
          </button>
        ) : (
          <div className="space-y-4">
            <Textarea
              placeholder="Add a reply..."
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCommentText(e.target.value)
              }
              className="min-h-25 border-none focus-visible:ring-0 p-0 text-sm bg-primary-lm text-text-lm placeholder:text-text-lighter-lm"
            />
            <div className="flex items-center justify-between pt-2 border-t border-stroke-grey">
              <span className="text-xs text-text-lighter-lm italic">
                Replying as Hasan Mahmud
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReplying(false)}
                  className="text-text-lm"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-accent-lm hover:bg-hover-btn-lm text-primary-lm px-4"
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="bg-primary-lm rounded-xl p-6 shadow-sm border border-stroke-grey">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-text-lighter-lm">
            Sort by:
            <button className="text-accent-lm flex items-center gap-1">
              Best <span className="text-[10px]">▼</span>
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  isReply = false,
}: {
  comment: Comment;
  isReply?: boolean;
}) {
  return (
    <div className="relative animate-slide-in">
      <div className="flex gap-3">
        <div className="relative flex flex-col items-center">
          <Avatar className="h-8 w-8 z-10 border-2 border-primary-lm">
            <AvatarImage src={comment.avatar || "/placeholder.svg"} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <div className="absolute top-8 bottom-0 w-0.5 bg-stroke-grey left-1/2 -translate-x-1/2" />
          )}
        </div>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-text-lm">
              {comment.author}
            </span>
            <span className="text-[10px] text-text-lighter-lm font-medium px-1.5 py-0.5 bg-secondary-lm rounded">
              {comment.course}
            </span>
          </div>
          <p className="text-sm text-text-lm mb-2 leading-snug">
            {comment.content}
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-[11px] font-bold text-text-lighter-lm hover:text-accent-lm">
              <Heart className="h-3 w-3" />
              {comment.likes}
            </button>
            <button className="text-[11px] font-bold text-accent-lm hover:underline">
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-4 space-y-4 border-l-2 border-stroke-grey pl-6">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
