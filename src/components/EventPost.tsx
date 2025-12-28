import React, { useState } from "react";
import PostBody from "/src/features/feed/components/PostBody.tsx";
import PostButtons from "./PostButtons";
import ShareModal from "./ShareModal";

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
  likes?: number;
  comments?: number;
  shares?: number;
};

interface Props {
  post: EventPostType;
}

export default function EventPost({ post }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  function handleToggleExpand() {
    setExpanded((s) => !s);
  }

  function handleOpenImage(src?: string) {
    setLightboxSrc(src ?? null);
  }

  function handleShare() {
    setShareOpen(true);
  }

  return (
    <>
      {/* Home page design */}
      <article
        id={`post-${post.id}`}
        className="flex flex-col gap-6 bg-primary-lm p-10 rounded-2xl border-2 border-stroke-grey"
      >
        <PostBody
          post={post}
          expanded={expanded}
          onToggleExpand={handleToggleExpand}
          onOpenImage={handleOpenImage}
        />

        <PostButtons
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
          onShare={handleShare}
        />
      </article>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={`${window.location.origin}${window.location.pathname}#post-${post.id}`}
      />

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/60"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl"
            alt="post"
          />
        </div>
      )}
    </>
  );
}
