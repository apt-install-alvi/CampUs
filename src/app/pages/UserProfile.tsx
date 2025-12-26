"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";

type Skill = { title: string; detail?: string };

export function UserProfile() {
  const [skills, setSkills] = useState<Skill[]>([
    { title: "UI/UX", detail: "MIST INNOVATION CLUB" },
    { title: "Java, MySQL, C++", detail: "MIST Academic Courses" },
  ]);

  const [interests, setInterests] = useState<string[]>([
    "Robotics",
    "UI/UX",
    "CTF",
    "Automation",
    "Hackathon",
    "Arduino",
  ]);

  const addSkill = () => {
    const title = window.prompt("Add a skill (e.g., UI/UX or Java)")?.trim();
    if (!title) return;
    const detail = window
      .prompt("Optional detail (e.g., Club or Course)")
      ?.trim();
    setSkills((prev) => [...prev, { title, detail }]);
  };

  const addInterest = () => {
    const tag = window.prompt("Add an interest (e.g., ML, CTF)")?.trim();
    if (!tag) return;
    setInterests((prev) => (prev.includes(tag) ? prev : [...prev, tag]));//duplicate  page handel,ui clean  
  };

  return (
    <div className="min-h-[70vh]">
      {/* Page-level Navbar to match the provided design */}
      <Navbar />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main profile card */}
        <section className="rounded-2xl border border-orange-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-start gap-6 border-b border-orange-100 p-6">
            <div className="relative">
              <div className="rounded-full border-4 border-orange-200 p-1">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                THAN THAN THAY
              </h1>
              <div className="mt-1 text-sm text-slate-600">CSE-23</div>
              <div className="text-sm text-slate-600">LEVEL-3</div>
              <div className="mt-3">
                <Badge className="bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-3 py-1">
                  An AI enthusiast
                </Badge>
              </div>
            </div>

            <div className="hidden h-24 flex-1 rounded-lg bg-orange-50/30 lg:block" />
          </div>

          {/* Skills */}
          <div className="border-b border-orange-100 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Skills</h2>
              <Button
                onClick={addSkill}
                className="h-8 rounded-full bg-orange-600 px-3 text-white hover:bg-orange-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="divide-y divide-orange-100 rounded-xl border border-orange-100 bg-orange-50/20">
              {skills.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 px-4 py-4"
                >
                  <div>
                    <div className="font-semibold text-slate-800">
                      {sk.title}
                    </div>
                    {sk.detail && (
                      <div className="text-sm text-slate-500">{sk.detail}</div>
                    )}
                  </div>
                  <div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-600">
                      <Plus className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interested In */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Interested In
              </h2>
              <Button
                onClick={addInterest}
                className="h-8 rounded-full bg-orange-600 px-3 text-white hover:bg-orange-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-orange-200 bg-white px-4 py-1.5 text-sm font-semibold text-orange-700 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-orange-200 bg-white p-4 shadow-sm">
          <h3 className="px-2 text-sm font-bold text-slate-700">
            Upcoming Events
          </h3>
          <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50/30 p-4 text-sm text-slate-600">
            No events added
          </div>
          <Button className="mt-3 w-full rounded-full bg-orange-600 text-white hover:bg-orange-700">
            Add More
          </Button>
        </aside>
      </div>
    </div>
  );
}
