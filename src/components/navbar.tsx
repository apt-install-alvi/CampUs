import { Link, useLocation } from "react-router-dom";
import { Search, Moon, Bell, MessageSquare, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const location = useLocation();

  const links = [
    { label: "Home", to: "/home" },
    { label: "CollabHub", to: "/collab" },
    { label: "Events", to: "/events" },
    { label: "Q&A", to: "/qna" },
    { label: "Study", to: "/study" },
    { label: "Lost & Found", to: "/lost-and-found" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white px-4 md:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="ampUs logo"
            className="h-7 w-auto select-none"
          />
          <span className="hidden text-xl font-bold tracking-tight text-orange-700 md:block">
            ampUs
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {links.map(({ label, to }) => {
            const active =
              location.pathname === to ||
              location.pathname.startsWith(to + "/");
            return (
              <Link
                key={label}
                to={to}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-700 ${
                  active ? "bg-orange-50 text-orange-700" : "text-slate-600"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-1 items-center justify-end gap-3 md:flex-initial">
          <div className="relative hidden w-full max-w-60 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
            <Input
              type="search"
              placeholder="Search anything"
              className="h-9 w-full rounded-full border-orange-200 bg-white pl-10 placeholder:text-slate-400 focus-visible:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-600 hover:text-orange-700"
            >
              <Moon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-600 hover:text-orange-700"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-600 hover:text-orange-700"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 outline-none"
                >
                  <Avatar className="h-9 w-9 border-2 border-orange-100 transition-transform hover:scale-105">
                    <AvatarImage src="/user-avatar.jpg" />
                    <AvatarFallback>TT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 rounded-xl p-2 shadow-lg"
                align="end"
                sideOffset={8}
              >
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-12 w-12 border-2 border-orange-200">
                    <AvatarImage src="/user-avatar.jpg" />
                    <AvatarFallback>TT</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-orange-700">
                      Than Than Thay
                    </span>
                    <span className="text-sm text-orange-400 font-medium">
                      CSE 23
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-orange-100" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-orange-700 transition-colors hover:bg-orange-50 focus:bg-orange-50 focus:text-orange-700 outline-none"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Your Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/login"
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-orange-700 transition-colors hover:bg-orange-50 focus:bg-orange-50 focus:text-orange-700 outline-none"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
