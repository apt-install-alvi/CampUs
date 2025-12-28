// src/features/feed/components/EventPost.tsx
import React from "react";
import { PostBody } from "./PostBody";
import userImg from "../assets/placeholderUser.png";
// don't render buttons here — PostBody already renders the Like/Comment/Share components
// if ShareModal is used by your ShareButton internally, it will open from there

export type Segment = {
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
};

interface Props {
  post: EventPostType;
}

export default function EventPost({ post }: Props) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <PostBody
        title={post.title}
        user={{
          name: post.author,
          batch: post.dept ?? "",
          imgURL: userImg
        }}
        content={{
          text: post.body ?? post.excerpt ?? "",
          img: post.image ?? undefined,
        }}
      />
    </article>
  );
}