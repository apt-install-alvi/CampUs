"use client";
import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import userImg from "../../features/feed/assets/placeholderUser.png";
import { UpcomingEvents } from "./Home";
import UserProfileUpdate from "@/components/UserProfileUpdate"; // new modal component

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

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"skill" | "interest">("skill");

  const openAddSkill = () => {
    setModalMode("skill");
    setModalOpen(true);
  };

  const openAddInterest = () => {
    setModalMode("interest");
    setModalOpen(true);
  };

  const handleSaveSkill = (skill: Skill) => {
    setSkills((prev) => [...prev, skill]);
    setModalOpen(false);
  };

  const handleSaveInterest = (interest: string) => {
    const tag = interest.trim();
    if (!tag) return;
    setInterests((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    setModalOpen(false);
  };

  return (
    <div className="w-full bg-background-lm text-text-lm">
      {/* CENTER WRAPPER */}
      <div className="flex justify-center px-6 pt-24 pb-16">
        {/* WIDER CARD */}
        <div className="w-full max-w-3xl">
          <section className="rounded-2xl border border-stroke-grey bg-primary-lm shadow-sm">
            {/* HEADER */}
            <div className="flex items-start gap-8 border-b border-stroke-grey p-8">
              <div className="rounded-full border-4 border-stroke-peach p-1">
                <Avatar className="h-28 w-28">
                  <AvatarImage src={userImg} />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-extrabold tracking-tight">
                  Alvi Binte Zamil
                </h1>
                <div className="mt-2 text-sm text-text-lighter-lm">CSE-23</div>
                <div className="text-sm text-text-lighter-lm">LEVEL-3</div>

                <div className="mt-4">
                  <Badge className="rounded-full border border-stroke-peach bg-secondary-lm px-4 py-2 text-accent-lm">
                    An AI enthusiast
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="border-b border-stroke-grey p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-lm">Skills</h2>
              <Button
                onClick={openAddSkill}
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
                  <div>{/* Placeholder for future controls */}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interested In */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-lm">Interested In</h2>
              <Button
                onClick={openAddInterest}
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
      </div>

      <UserProfileUpdate
        open={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        onSaveSkill={handleSaveSkill}
        onSaveInterest={handleSaveInterest}
      />
    </div>
  );
}

export default UserProfile;
