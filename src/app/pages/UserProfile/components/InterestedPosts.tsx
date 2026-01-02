import { Link } from "react-router-dom";
import { ButtonCTA } from "@/components/ButtonCTA";
import type { InterestedItem } from "../backend/interestedStore";

export function InterestedPosts({ items }: { items: InterestedItem[] }) {
  return (
    <section className="rounded-2xl border border-stroke-grey bg-primary-lm shadow-sm p-7 min-h-50 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-text-lm">Interested Posts</h2>
      </div>

      {items.length === 0 ? (
        <>
          <p className="text-sm text-text-lighter-lm">
            No interested posts yet.
          </p>
          <div className="flex justify-end pt-3 mt-auto">
            <Link to="/collab">
              <ButtonCTA label={"Add More"} />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          {items
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-stroke-grey bg-secondary-lm px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-text-lm">
                      {item.title}
                    </div>
                    <div className="text-xs text-text-lighter-lm">
                      {item.category}
                      {item.userName ? ` • by ${item.userName}` : ""}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-bold bg-[#C23D00] text-[#FFFFFF] px-2 py-0.5 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-text-lighter-lm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          <div className="flex justify-end pt-3 mt-auto">
            <Link to="/collab">
              <ButtonCTA label={"Add More"} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default InterestedPosts;
