import { UserInfo } from "../../../components/UserInfo";
import { CommentButton, LikeButton, ShareButton } from "./PostButtons";

interface PostContent {
  title: string;
  user: {
    name: string;
    batch: string;
    imgURL: string;
  };
  content: {
    text: string;
    img?: string;
  };
  tags?: string[];        // optional tags
  category?: string;      // optional category (workshop, seminar, course, competition)
}

export function PostBody({ title, user, content, tags, category }: PostContent) {
  // mapping from category to tailwind-ish classes (background, text, border)
  const catClassMap: Record<string, string> = {
    workshop: "bg-red-100 text-red-700 border border-red-200",
    seminar: "bg-green-100 text-green-700 border border-green-200",
    course: "bg-blue-100 text-blue-700 border border-blue-200",
    competition: "bg-purple-100 text-purple-700 border border-purple-200",
  };

  const catLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const catClasses = category ? catClassMap[category] ?? "bg-secondary-lm text-text-lm border border-stroke-grey" : "";

  return (
    <div className="flex flex-col gap-3 bg-secondary-lm hover:bg-hover-lm transition border-2 border-stroke-grey hover:border-stroke-peach p-8 rounded-2xl">
      <h3 className="text-text-lm font-bold font-[Poppins]">{title}</h3>

      {/* Category badge: larger than tags, appears under title */}
      {category && (
        <div className="mt-1">
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold text-base ${catClasses}`}
            aria-label={`Category: ${catLabel}`}
          >
            {catLabel}
          </span>
        </div>
      )}

      {/* Tags: appear under the category, side-by-side */}
      {tags && tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {tags.map((t) => (
            <span
              key={t}
              className="border border-accent-lm text-accent-lm rounded-full px-3 py-1 text-sm"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      <UserInfo
        userName={user.name}
        userBatch={user.batch}
        userImg={user.imgURL}
      ></UserInfo>

      <p>{content.text}</p>
      <div className="w-full h-120 overflow-hidden">
        {content.img && (
          <img
            src={content.img}
            className="object-cover object-center w-full h-full"
          />
        )}
      </div>
      <div className="flex gap-3 justify-start">
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </div>
    </div>
  );
}
