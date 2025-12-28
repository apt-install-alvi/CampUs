"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import userImg from "../../features/feed/assets/placeholderUser.png";
import { UpcomingEvents } from "./Home";

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
    setInterests((prev) => (prev.includes(tag) ? prev : [...prev, tag])); //duplicate  page handel,ui clean
  };

  return (
    <div className="min-h-[70vh] bg-background-lm text-text-lm animate-fade-in">
      {/* Page-level Navbar to match the provided design */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main profile card */}
        <section className="rounded-2xl border border-stroke-grey bg-primary-lm shadow-sm animate-slide-in">
          {/* Header */}
          <div className="flex items-start gap-6 border-b border-stroke-grey p-6">
            <div className="relative">
              <div className="rounded-full border-4 border-stroke-peach p-1">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userImg} />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-extrabold tracking-tight text-text-lm">
                Alvi Binte Zamil
              </h1>
              <div className="mt-1 text-sm text-text-lighter-lm">CSE-23</div>
              <div className="text-sm text-text-lighter-lm">LEVEL-3</div>
              <div className="mt-3">
                <Badge className="bg-secondary-lm text-accent-lm border border-stroke-peach rounded-full px-3 py-2">
                  An AI enthusiast
                </Badge>
              </div>
            </div>

          </div>

          {/* Skills */}
          <div className="border-b border-stroke-grey p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-lm">Skills</h2>
              <Button
                onClick={addSkill}
                className="h-8 rounded-full bg-accent-lm px-3 text-primary-lm hover:bg-hover-btn-lm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="divide-y divide-stroke-grey rounded-xl border border-stroke-grey bg-secondary-lm">
              {skills.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 px-4 py-4"
                >
                  <div>
                    <div className="font-semibold text-text-lm">{sk.title}</div>
                    {sk.detail && (
                      <div className="text-sm text-text-lighter-lm">
                        {sk.detail}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stroke-peach bg-primary-lm text-accent-lm">
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
              <h2 className="text-lg font-bold text-text-lm">Interested In</h2>
              <Button
                onClick={addInterest}
                className="h-8 rounded-full bg-accent-lm px-3 text-primary-lm hover:bg-hover-btn-lm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stroke-peach bg-primary-lm px-4 py-1.5 text-sm font-semibold text-accent-lm shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        {/* <UpcomingEvents></UpcomingEvents> */}
        {/* <aside className="h-fit rounded-2xl border border-stroke-grey bg-primary-lm p-4 shadow-sm animate-slide-in">
          <h3 className="px-2 text-sm font-bold text-slate-700">
            Upcoming Events
          </h3>
          <div className="mt-3 rounded-xl border border-stroke-grey bg-secondary-lm p-4 text-sm text-text-lm">
            No events added
          </div>
          <Button className="mt-3 w-full rounded-full bg-accent-lm text-primary-lm hover:bg-hover-btn-lm">
            Add More
          </Button>
        </aside> */}
      </div>
    </div>
  );
}
