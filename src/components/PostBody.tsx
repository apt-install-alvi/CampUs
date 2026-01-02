import { UserInfo } from "./UserInfo";
import { CommentButton, LikeButton, ShareButton } from "./PostButtons";

interface PostContent
{
  title: string;
  user:{
    name: string;
    batch: string;
    imgURL: string;
  };
  content:{
    text: string;
    img?: string;
  };
  tags?: string[];
  category?: string;
}

export function PostBody({ title, user, content, tags, category }: PostContent)
{
  const categoryClassMap: Record<string, string> = 
  {
    workshop: "bg-red-100 text-red-700 border border-red-200",
    seminar: "bg-green-100 text-green-700 border border-green-200",
    course: "bg-blue-100 text-blue-700 border border-blue-200",
    competition: "bg-purple-100 text-purple-700 border border-purple-200",
  };

  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const categoryClasses = category ? categoryClassMap[category] ?? "bg-secondary-lm text-text-lm border border-stroke-grey" : "";

  return(
    <div className="flex flex-col gap-3 bg-secondary-lm hover:bg-hover-lm transition border-2 border-stroke-grey hover:border-stroke-peach p-8 rounded-2xl">
      <h3 className="text-text-lm font-bold font-[Poppins]">{title}</h3>

      {category && (
        <div className="mt-1">
          <p
            className={`inline-block px-4 py-2 rounded-full font-semibold text-base ${categoryClasses}`}
            aria-label={`Category: ${categoryLabel}`}
          >
            {categoryLabel}
          </p>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {tags.map((t) => (
            <p
              key={t}
              className="border border-accent-lm text-accent-lm rounded-full px-3 py-1 text-sm"
            >
              #{t}
            </p>
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
        {content.img &&
          <img src={content.img} className="object-cover object-center w-full h-full"
          />
      }
      </div>
      <div className="flex gap-3 justify-start">
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </div>
    </div>
  );
}
