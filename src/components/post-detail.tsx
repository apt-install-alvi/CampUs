"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
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

type Post = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  authorCourse: string;
  content: string;
  category: string;
  reactions: number;
  commentsCount: number;
  shares: number;
};

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export function PostDetail({ post, onBack }: PostDetailProps) {
  const [commentText, setCommentText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

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

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Go Back</span>
      </button>

      {/* Main Post Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <div className="flex items-start justify-between mb-4">
          <Badge
            variant="secondary"
            className="bg-orange-50 text-orange-700 border-none px-3 py-1"
          >
            {post.category}
          </Badge>
          <button className="text-orange-300 hover:text-orange-500">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10 border border-orange-100">
            <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-bold text-orange-600">
              {post.author}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {post.authorCourse}
            </div>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-6">{post.content}</p>

        <div className="flex items-center gap-4 pt-4 border-t border-orange-50">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
            <Heart className="h-4 w-4 fill-orange-600" />
            <span className="text-sm font-bold">{post.reactions}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-bold">{post.commentsCount}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors">
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-bold">{post.shares}</span>
          </button>
        </div>
      </div>

      {/* Add Reply Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
        {!isReplying ? (
          <button
            onClick={() => setIsReplying(true)}
            className="w-full text-left px-4 py-3 text-slate-400 text-sm hover:bg-orange-50 rounded-lg transition-colors"
          >
            Add a reply
          </button>
        ) : (
          <div className="space-y-4">
            <Textarea
              placeholder="Add a reply..."
              value={commentText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setCommentText(e.target.value)
              }
              className="min-h-25 border-none focus-visible:ring-0 p-0 text-sm"
            />
            <div className="flex items-center justify-between pt-2 border-t border-orange-50">
              <span className="text-xs text-slate-400 italic">
                Replying as Hasan Mahmud
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReplying(false)}
                  className="text-slate-600"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4"
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Sort by:
            <button className="text-orange-600 flex items-center gap-1">
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
    <div className="relative">
      <div className="flex gap-3">
        <div className="relative flex flex-col items-center">
          <Avatar className="h-8 w-8 z-10 border-2 border-white">
            <AvatarImage src={comment.avatar || "/placeholder.svg"} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <div className="absolute top-8 bottom-0 w-0.5 bg-gray-100 left-1/2 -translate-x-1/2" />
          )}
        </div>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-gray-900">
              {comment.author}
            </span>
            <span className="text-[10px] text-gray-400 font-medium px-1.5 py-0.5 bg-gray-50 rounded">
              {comment.course}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2 leading-snug">
            {comment.content}
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-orange-600">
              <Heart className="h-3 w-3" />
              {comment.likes}
            </button>
            <button className="text-[11px] font-bold text-orange-600 hover:underline">
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-4 space-y-4 border-l-2 border-gray-100 pl-6">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
