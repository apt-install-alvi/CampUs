"use client";
import { useState } from "react";
import { Plus, Mail, Github, Linkedin, Facebook } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ButtonCTA } from "@/components/ButtonCTA";
import userImg from "../../features/feed/assets/placeholderUser.png";
import UserProfileUpdate from "@/components/UserProfileUpdate"; // new modal component
type Skill = { title: string; detail?: string };
type Contact = {
  type: "gmail" | "linkedin" | "github" | "facebook";
  id: string;
};
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
  const [contacts, setContacts] = useState<Contact[]>([
    { type: "github", id: "" },
    { type: "linkedin", id: "" },
  ]);

  // Placeholder events: replace with real data source when available
  const events: { title: string; date: Date }[] = [
    { title: "MCSC CyberVoid'25", date: new Date(2025, 11, 27) },
  ];
  const now = new Date();
  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingEvents = events.filter(
    (e) =>
      e.date.getTime() > now.getTime() &&
      e.date.getTime() <= oneWeekLater.getTime()
  );
  const eventCount = upcomingEvents.length;

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"skill" | "interest" | "contact">(
    "skill"
  );

  const openAddSkill = () => {
    setModalMode("skill");
    setModalOpen(true);
  };

  const openAddInterest = () => {
    setModalMode("interest");
    setModalOpen(true);
  };

  const openAddContact = () => {
    setModalMode("contact");
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

  const handleSaveContact = (contact: Contact) => {
    const key = `${contact.type}:${contact.id.trim()}`;
    if (!contact.id.trim()) return;
    setContacts((prev) =>
      prev.some((c) => `${c.type}:${c.id}` === key) ? prev : [...prev, contact]
    );
    setModalOpen(false);
  };

  const contactLink = (c: Contact) => {
    const id = c.id.trim();
    const isUrl = /^https?:\/\//i.test(id);
    if (isUrl) return id;
    switch (c.type) {
      case "gmail":
        return `mailto:${id}`;
      case "linkedin":
        return `https://linkedin.com/in/${id}`;
      case "github":
        return `https://github.com/${id}`;
      case "facebook":
        return `https://facebook.com/${id}`;
      default:
        return "#";
    }
  };

  const contactDisplayText = (c: Contact) => {
    const id = c.id.trim();
    if (!id) return "";
    if (c.type === "gmail") return id; // show email address
    const isUrl = /^https?:\/\//i.test(id);
    if (!isUrl) return id; // if just a handle, show it directly
    try {
      const u = new URL(id);
      const segments = u.pathname.split("/").filter(Boolean);
      // Prefer the last non-empty path segment as the handle
      return segments.length ? segments[segments.length - 1] : id;
    } catch {
      return id;
    }
  };

  const ContactIcon = ({ type }: { type: Contact["type"] }) => {
    switch (type) {
      case "gmail":
        return <Mail className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "github":
        return <Github className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[70vh] bg-background-lm text-text-lm animate-fade-in">
      {/* Page-level Navbar to match the provided design */}
      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
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
          {/* Contact */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-lm">Contact</h2>
              <Button
                onClick={openAddContact}
                className="h-8 rounded-full bg-accent-lm px-3 text-primary-lm hover:bg-hover-btn-lm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {contacts
                .filter((c) => c.id.trim())
                .map((c, idx) => (
                  <a
                    key={`${c.type}-${c.id}-${idx}`}
                    href={contactLink(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-stroke-peach bg-primary-lm px-4 py-1.5 text-sm font-semibold text-accent-lm shadow-sm hover:bg-hover-btn-lm"
                    aria-label={`${c.type} profile`}
                  >
                    <ContactIcon type={c.type} />
                    <span>{contactDisplayText(c)}</span>
                  </a>
                ))}
            </div>
          </div>
        </section>
        {/* Sidebar: Upcoming Events */}
        <aside className="flex flex-col justify-start h-fit rounded-2xl border border-stroke-grey bg-primary-lm shadow-sm animate-slide-in">
          <div className="p-7 border-b border-stroke-grey">
            <h6 className="font-[Poppins] font-semibold text-text-lm">
              Upcoming Events
            </h6>
          </div>
          <div className="p-8 flex flex-col justify-start">
            {eventCount === 0 ? (
              <p className="text-text-lighter-lm text-md">No events added</p>
            ) : (
              // events will be mapped to number of events that are interested by the user ONLY WITHIN 1 week of the current date
              //will be wrapped in a <Link> where to=/(link of post)
              <div className="flex flex-col py-2 px-3 hover:bg-secondary-lm hover:w-full hover:rounded-lg">
                <p className="font-medium text-md text-text-lm">
                  MCSC CyberVoid'25
                </p>
                <p className="text-text-lighter-lm">Saturday, 27 Dec 2025</p>
              </div>
            )}
          </div>
          <div className="flex justify-end p-3">
            <Link to="/events">
              <ButtonCTA label={"Add More"} />
            </Link>
          </div>
        </aside>
      </div>

      <UserProfileUpdate
        open={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        onSaveSkill={handleSaveSkill}
        onSaveInterest={handleSaveInterest}
        onSaveContact={handleSaveContact}
      />
    </div>
  );
}

export default UserProfile;
