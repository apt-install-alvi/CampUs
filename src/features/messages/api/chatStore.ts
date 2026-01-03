// Simple in-memory chat store to manage threads and active chat
// NOTE: Replace with real backend/state later.

export type ChatMessage = {
  id: string;
  from: "me" | "other";
  text: string;
  ts: number;
};

export type ChatThread = {
  userId: string;
  userName: string;
  messages: ChatMessage[];
};

type Listener = (state: {
  threads: ChatThread[];
  activeUserId: string | null;
}) => void;

const state: { threads: ChatThread[]; activeUserId: string | null } = {
  threads: [],
  activeUserId: null,
};

const listeners: Listener[] = [];

function notify() {
  const snapshot = {
    threads: [...state.threads],
    activeUserId: state.activeUserId,
  };
  listeners.forEach((l) => l(snapshot));
}

export function subscribe(listener: Listener) {
  listeners.push(listener);
  // immediate publish
  listener({ threads: [...state.threads], activeUserId: state.activeUserId });
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

export function getThreads() {
  return state.threads;
}

export function getActiveUserId() {
  return state.activeUserId;
}

export function ensureThread(userId: string, userName?: string) {
  const id = userId.trim();
  if (!id) return null;
  let t = state.threads.find((th) => th.userId === id);
  if (!t) {
    t = { userId: id, userName: userName ?? id, messages: [] };
    state.threads.push(t);
  }
  return t;
}

export function openChatWith(userId: string, userName?: string) {
  const t = ensureThread(userId, userName);
  if (!t) return;
  state.activeUserId = t.userId;
  notify();
}

export function sendMessage(text: string) {
  const msg = text.trim();
  if (!msg || !state.activeUserId) return;
  const t = state.threads.find((th) => th.userId === state.activeUserId);
  if (!t) return;
  t.messages.push({
    id: Math.random().toString(36).slice(2),
    from: "me",
    text: msg,
    ts: Date.now(),
  });
  notify();
}

export function receiveMessage(fromUserId: string, text: string) {
  const t = ensureThread(fromUserId);
  if (!t) return;
  t.messages.push({
    id: Math.random().toString(36).slice(2),
    from: "other",
    text: text,
    ts: Date.now(),
  });
  notify();
}
