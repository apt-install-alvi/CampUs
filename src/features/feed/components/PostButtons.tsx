// src/features/feed/components/PostButtons.tsx
import React, { useState, type MouseEventHandler } from "react";

import heartIcon from "../../../assets/icons/heart_icon.svg";
import filledHeartIcon from "../../../assets/icons/FILLEDheart_icon.svg";
import commentIcon from "../../../assets/icons/comment_icon.svg";
import shareIcon from "../../../assets/icons/share_icon.svg";

// import { ShareModal } from "./ShareModal";

interface ButtonProps {
  icon: string;
  label: string | number;
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
}

function ButtonBase({ icon, label, clickEvent }: ButtonProps) {
  // wrapper ensures we stop propagation so parent click (open detail) won't fire
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (clickEvent) {
      clickEvent(e as unknown as Parameters<MouseEventHandler<HTMLButtonElement>>[0]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex gap-2 px-4 py-2 font-bold text-accent-lm bg-primary-lm hover:bg-background-lm transition border-2 border-stroke-peach rounded-full cursor-pointer"
    >
      <img src={icon} alt="" />
      {label}
    </button>
  );
}

export function LikeButton() {
  const [likeState, setLikeState] = useState({ isLiked: false, likeCount: 0 });

  function handleLikeState(e?: React.MouseEvent<HTMLButtonElement>) {
    // e is optional here because ButtonBase always passes an event, but keep signature compatible
    setLikeState((prev) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));
  }

  return (
    <ButtonBase
      icon={likeState.isLiked ? filledHeartIcon : heartIcon}
      label={likeState.likeCount === 0 ? "Like" : likeState.likeCount}
      clickEvent={handleLikeState}
    />
  );
}

export function CommentButton() {
  const [commentCount, setCommentCount] = useState(0);
  // need to handle comment count updating if new comment is added in the post's dedicated link and wherever the post shows up

  // If you want clicking comment to open the detail view's reply box instead of navigating,
  // wire clickEvent to a handler that toggles a comment UI. For now, it stops propagation so feed won't open.
  function handleClick() {
    // placeholder: increment count locally (you can replace with real behavior)
    setCommentCount((c) => c);
  }

  return <ButtonBase icon={commentIcon} label={commentCount === 0 ? "Comment" : commentCount} clickEvent={handleClick} />;
}

export function ShareButton() {
  // const [isClicked, setIsClicked]=useState(false);

  function handleShare() {
    // placeholder share behaviour
    // setIsClicked(true);
  }

  return (
    <>
      <ButtonBase icon={shareIcon} label={"Share"} clickEvent={handleShare} />
      {/* {isClicked && <ShareModal/>} */}
    </>
  );
}
