import { useParams } from "react-router";
import { getResources } from "@/lib/studyMock";

export function Resources() {
  const { level, term } = useParams();
  const resources = getResources(level, term);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="max-w-4xl w-full px-4">
        {resources.length === 0 ? (
          <h5 className="mt-10 text-text-lighter-lm">No resources for this term yet</h5>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {resources.map((r) => (
              <li key={r}>
                <a href={r} target="_blank" rel="noopener noreferrer" className="text-accent-lm underline">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
