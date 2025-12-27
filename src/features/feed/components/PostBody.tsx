import { UserInfo } from "../../../components/UserInfo";
import { CommentButton, LikeButton, ShareButton } from "./PostButtons";

interface PostContent
{
  title:string,
  user:{
    name:string,
    batch:string,
    imgURL:string
  }
  content:{
    text: string,
    img?: string
  }
}

export function PostBody({title, user, content}:PostContent)
{
  return (
    <div className="flex flex-col gap-3 bg-secondary-lm hover:bg-hover-lm transition border-2 border-stroke-grey hover:border-stroke-peach p-8 rounded-2xl">
      <h3 className="text-text-lm font-bold font-[Poppins]">{title}</h3>
      <UserInfo userName={user.name} userBatch={user.batch} userImg={user.imgURL}></UserInfo>
      <p>{content.text}</p>
      <div className="w-full h-120 overflow-hidden">
        {content.img && 
        <img src={content.img} className="object-cover object-center w-full h-full" />
      }
      </div>
      <div className="flex gap-3 justify-start">
        <LikeButton/>
        <CommentButton/>
        <ShareButton/>
      </div>
    </div>
  );
}