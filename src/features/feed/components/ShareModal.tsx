import crossBtn from "../../../assets/icons/cross_btn.svg";

export function ShareModal()
{
  return (
    <div className="w-60 p-4 bg-primary-lm ring-stroke-grey rounded-2xl">
      <div className="flex justify-end">
        <img src={crossBtn}></img>
      </div>
    </div>
  );
}