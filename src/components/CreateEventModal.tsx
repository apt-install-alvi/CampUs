// src/components/CreateEventModal.tsx
import React, { useEffect, useState } from "react";
import type { EventPostType, Segment } from "./EventPost";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (post: EventPostType) => void;
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).slice(2);
}

export default function CreateEventModal({ open, onClose, onCreate }: Props) {
  const [category, setCategory] = useState<
    "workshop" | "seminar" | "course" | "competition"
  >("workshop");
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]); // no default tags
  const [segments, setSegments] = useState<Segment[]>([
    { id: generateId(), name: "", description: "", date: "", time: "" },
  ]);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous || "";
    };
  }, [open]);

  function addSegment() {
    setSegments(prev => [
      ...prev,
      { id: generateId(), name: "", description: "", date: "", time: "" },
    ]);
  }

  function updateSegment(id: string, data: Partial<Segment>) {
    setSegments(prev =>
      prev.map(seg => (seg.id === id ? { ...seg, ...data } : seg))
    );
  }

  function removeSegment(id: string) {
    setSegments(prev => prev.filter(seg => seg.id !== id));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    setTags(prev => [...new Set([...prev, t])]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(prev => prev.filter(t => t !== tag));
  }

  function handlePost() {
    const post: EventPostType = {
      id: generateId(),
      category,
      title,
      author: "You",
      excerpt: title,
      body: "",
      image: imageDataUrl,
      segments,
      tags,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    onCreate(post);
    onClose();
  }

  if (!open) return null;

  return (
    <>
      {/* OVERLAY (below modal) */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{
          backgroundColor: "rgba(14,21,31,0.35)",
        }}
      />

      {/* MODAL WRAPPER (above overlay) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          // Actual modal card: SOLID white, fixed max height and scrollable content
          className="w-full max-w-3xl p-6"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            // keep modal from growing beyond viewport and make it scrollable
            maxHeight: "calc(100vh - 96px)",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Announce Event</h2>
            <button
              onClick={onClose}
              className="text-gray-700 text-2xl hover:text-gray-900"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Category */}
            <div className="flex gap-6">
              {["Workshop", "Seminar", "Course", "Competition"].map(c => (
                <label key={c} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={category === c.toLowerCase()}
                    onChange={() => setCategory(c.toLowerCase() as any)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            <hr className="border-gray-300" />

            {/* Title */}
            <div>
              <h3 className="mb-2 text-lg font-medium">Title</h3>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#C23D00]"
                placeholder="Enter event title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            {/* Segment list */}
            <div>
              <div className="flex items-center mb-4">
                <div className="flex-1 h-px bg-gray-300" />
                <h3 className="px-4 text-lg font-medium">Segment</h3>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {segments.map((seg, idx) => (
                <div
                  key={seg.id}
                  className="mb-4 border border-gray-300 rounded-lg p-4"
                >
                  <div className="mb-3">
                    <div className="flex justify-between items-center">
                      <strong>Name</strong>
                      {segments.length > 1 && (
                        <button
                          onClick={() => removeSegment(seg.id)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                      value={seg.name}
                      onChange={e => updateSegment(seg.id, { name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <strong>Description</strong>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                      rows={3}
                      value={seg.description}
                      onChange={e =>
                        updateSegment(seg.id, { description: e.target.value })
                      }
                    />
                  </div>

                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 border-r">Date</th>
                          <th className="px-4 py-2">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-r">
                            <input
                              type="date"
                              className="w-full px-4 py-2"
                              value={seg.date}
                              onChange={e =>
                                updateSegment(seg.id, { date: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              className="w-full px-4 py-2"
                              value={seg.time}
                              onChange={e =>
                                updateSegment(seg.id, { time: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <div className="text-right">
                <button
                  onClick={addSegment}
                  className="bg-[#C23D00] text-white px-5 py-2 rounded-full"
                  style={{ color: "white" }}
                >
                  + Add segment
                </button>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Tags */}
            <div>
              <h3 className="mb-2 text-lg font-medium">Tags</h3>
              <div className="flex gap-2 mb-3">
                {tags.length > 0 &&
                  tags.map(t => (
                    <span
                      key={t}
                      className="border border-[#C23D00] text-[#C23D00] rounded-full px-3 py-1 text-sm"
                    >
                      #{t}
                    </span>
                  ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Add tag (press Add)"
                />
                <button
                  onClick={addTag}
                  className="bg-[#C23D00] text-white px-3 py-2 rounded-lg"
                  style={{ color: "white" }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Upload */}
            <div>
              <label className="block mb-2 font-medium">Upload Image</label>
              <div className="flex gap-3">
                <label className="bg-[#C23D00] text-white px-5 py-2 rounded-lg cursor-pointer" style={{ color: "white" }}>
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
                <div className="flex-1 border rounded-lg px-3 py-2">
                  {imageDataUrl ? "Image selected" : "No file chosen"}
                </div>
              </div>
            </div>

            <div className="text-right pt-4">
              <button
                onClick={handlePost}
                className="bg-[#C23D00] text-white px-6 py-2 rounded-full"
                style={{ color: "white" }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}