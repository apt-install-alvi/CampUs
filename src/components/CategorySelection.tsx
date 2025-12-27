// src/components/CategorySelection.tsx
import React from "react";

export type CategoryKey = "all" | "workshop" | "seminar" | "course" | "competition";

interface Props {
  value: CategoryKey;
  onChange: (c: CategoryKey) => void;
}

const categories: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "workshop", label: "Workshop" },
  { key: "seminar", label: "Seminar" },
  { key: "course", label: "Course" },
  { key: "competition", label: "Competition" },
];

export default function CategorySelection({ value, onChange }: Props) {
  return (
    <aside className="w-full max-w-xs">
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 font-semibold text-[var(--color-card-foreground)]">Categories</h3>
        <ul className="space-y-2">
          {categories.map((c) => {
            const active = value === c.key;
            return (
              <li key={c.key}>
                <button
                  onClick={() => onChange(c.key)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm ${
                    active
                      ? "bg-[#C23D00] text-white"
                      : "text-[var(--color-muted-foreground)] hover:bg-orange-50"
                  }`}
                  style={active ? { color: "white" } : undefined}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}