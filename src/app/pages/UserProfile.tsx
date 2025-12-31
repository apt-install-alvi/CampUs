"use client";
import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import userImg from "../../features/feed/assets/placeholderUser.png";

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
  /* ---------- Skill inline add ---------- */
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [skillTitle, setSkillTitle] = useState("");
  const [skillDetail, setSkillDetail] = useState("");

  /* ---------- Interest inline add ---------- */
  const [addInterestOpen, setAddInterestOpen] = useState(false);
  const [interestValue, setInterestValue] = useState("");
  const saveSkill = () => {
    if (!skillTitle.trim()) return;
    setSkills([...skills, { title: skillTitle, detail: skillDetail }]);
    setSkillTitle("");
    setSkillDetail("");
    setAddSkillOpen(false);
  };

  const saveInterest = () => {
    if (!interestValue.trim()) return;
    if (!interests.includes(interestValue)) {
      setInterests([...interests, interestValue]);
    }
    setInterestValue("");
    setAddInterestOpen(false);
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

            {/* SKILLS */}
            <div className="border-b border-stroke-grey p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Skills</h2>
                <Button
                  onClick={() => setAddSkillOpen(true)}
                  className="h-9 w-9 rounded-md bg-accent-lm p-0 text-primary-lm"
                >
                  <Plus />
                </Button>
              </div>

              {/* Inline Add Skill */}
              {addSkillOpen && (
                <div className="mb-6 rounded-xl border bg-secondary-lm p-4 space-y-3">
                  <Input
                    placeholder="Skill (e.g. UI/UX)"
                    value={skillTitle}
                    onChange={(e) => setSkillTitle(e.target.value)}
                  />
                  <Input
                    placeholder="Detail (optional)"
                    value={skillDetail}
                    onChange={(e) => setSkillDetail(e.target.value)}
                  />

                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveSkill}>
                      <Check className="mr-1 h-4 w-4" /> Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setAddSkillOpen(false)}
                    >
                      <X className="mr-1 h-4 w-4" /> Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="divide-y rounded-xl border bg-secondary-lm">
                {skills.map((sk, idx) => (
                  <div key={idx} className="flex justify-between px-6 py-5">
                    <div>
                      <div className="font-semibold">{sk.title}</div>
                      {sk.detail && (
                        <div className="text-sm text-text-lighter-lm">
                          {sk.detail}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERESTED IN */}
            <div className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Interested In</h2>
                <Button
                  onClick={() => setAddInterestOpen(true)}
                  className="h-9 w-9 rounded-md bg-accent-lm p-0 text-primary-lm"
                >
                  <Plus />
                </Button>
              </div>

              {/* Inline Add Interest */}
              {addInterestOpen && (
                <div className="mb-6 flex items-center gap-3">
                  <Input
                    placeholder="Add interest (e.g. ML)"
                    value={interestValue}
                    onChange={(e) => setInterestValue(e.target.value)}
                  />
                  <Button size="sm" onClick={saveInterest}>
                    <Check />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setAddInterestOpen(false)}
                  >
                    <X />
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stroke-peach bg-primary-lm px-5 py-2 text-sm font-semibold text-accent-lm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
