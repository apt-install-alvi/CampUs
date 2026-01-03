"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  subscribe as chatSubscribe,
  getThreads,
  getActiveUserId,
  openChatWith,
  sendMessage,
  type ChatThread,
} from "@/app/pages/Messaging/backend/chatStore";

export function Messaging() {
  const [threads, setThreads] = useState<ChatThread[]>(() => getThreads());
  const [activeUserId, setActiveUserId] = useState<string | null>(() =>
    getActiveUserId()
  );
  const [text, setText] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    const unsub = chatSubscribe(({ threads, activeUserId }) => {
      setThreads(threads);
      setActiveUserId(activeUserId);
    });
    return unsub;
  }, []);

  // Deep link: /messages?user=<id>
  useEffect(() => {
    const user = params.get("user");
    if (user) openChatWith(user);
  }, [params]);

  const activeThread = useMemo(
    () => threads.find((t) => t.userId === activeUserId) ?? null,
    [threads, activeUserId]
  );

  const onSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_520px] gap-4 p-4 min-h-[70vh] md:max-w-200 md:ml-auto">
      {/* Sidebar */}
      <aside className="rounded-xl border border-stroke-grey bg-secondary-lm overflow-hidden">
        <div className="p-3 border-b border-stroke-grey font-semibold">
          Messages
        </div>
        <div className="flex flex-col">
          {threads.length === 0 ? (
            <div className="p-3 text-sm text-text-lighter-lm">
              No chats yet.
            </div>
          ) : (
            threads.map((t) => (
              <button
                key={t.userId}
                onClick={() => openChatWith(t.userId, t.userName)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-left",
                  "hover:bg-hover-btn-lm",
                  activeUserId === t.userId ? "bg-stroke-peach/20" : ""
                )}
              >
                <span className="font-medium text-text-lm truncate">
                  {t.userName}
                </span>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Chat Window */}
      <section className="rounded-xl border border-stroke-grey bg-primary-lm flex flex-col">
        {activeThread ? (
          <>
            <div className="border-b border-stroke-grey p-3 font-semibold">
              Chat with {activeThread.userName}
            </div>
            <div className="flex-1 p-3 space-y-2 overflow-auto">
              {activeThread.messages.length === 0 ? (
                <div className="text-sm text-text-lighter-lm">
                  Start the conversation…
                </div>
              ) : (
                activeThread.messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                      m.from === "me"
                        ? "ml-auto bg-message-user-lm text-primary-lm"
                        : "mr-auto bg-message-other-lm text-text-lm"
                    )}
                  >
                    {m.text}
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-stroke-grey p-3 flex items-center gap-2">
              <Input
                autoFocus
                placeholder="Type a message…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSend();
                }}
                className="bg-secondary-lm text-text-lm"
              />
              <Button onClick={onSend} className="bg-accent-lm text-primary-lm">
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 p-6 text-sm text-text-lighter-lm">
            Select a chat from the sidebar.
          </div>
        )}
      </section>
    </div>
  );
}
