// src/features/feed/components/PostButtons.tsx
import { useState, type MouseEventHandler } from "react";

import heartIcon from "../../../assets/icons/heart_icon.svg";
import filledHeartIcon from "../../../assets/icons/FILLEDheart_icon.svg";
import commentIcon from "../../../assets/icons/comment_icon.svg";
import shareIcon from "../../../assets/icons/share_icon.svg";

// import { ShareModal } from "./ShareModal";

interface ButtonProps {
  icon: string;
  label: string | number;
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  stopPropagation?: boolean; // NEW
}

function ButtonBase({
  icon,
  label,
  clickEvent,
  stopPropagation = true, // default: stop bubbling
}: ButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (clickEvent) {
      clickEvent(e);
    }
  }

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
  const [likeState, setLikeState] = useState({
    isLiked: false,
    likeCount: 0,
  });

  function handleLikeState() {
    setLikeState((prev) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked
        ? prev.likeCount - 1
        : prev.likeCount + 1,
    }));
  }

  return (
    <ButtonBase
      icon={likeState.isLiked ? filledHeartIcon : heartIcon}
      label={likeState.likeCount === 0 ? "Like" : likeState.likeCount}
      clickEvent={handleLikeState}
      stopPropagation={true} // stay in feed
    />
  );
}

export function CommentButton() {
  const [commentCount] = useState(0);

  // IMPORTANT:
  // stopPropagation = false → click bubbles to parent → opens post detail
  return (
    <ButtonBase
      icon={commentIcon}
      label={commentCount === 0 ? "Comment" : commentCount}
      stopPropagation={false}
    />
  );
}

export function ShareButton() {
  function handleShare() {
    // share logic here
  }

  return (
    <ButtonBase
      icon={shareIcon}
      label="Share"
      clickEvent={handleShare}
      stopPropagation={true} // stay in feed
    />
  );
}
