import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Meeting = {
  id: string;
  title: string;
  dateKey: string;
  startTime: string;
  endTime?: string;
  notes?: string;
  color: string;
  createdAt: number;
};

const COLORS = [
  "#1e90ff",
  "#5b5cff",
  "#8a2be2",
  "#ff3ea5",
  "#ff8a3d",
  "#14c7c4",
  "#22c55e",
];

function nextColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

type State = {
  meetings: Record<string, Meeting[]>;
  addMeeting: (
    data: Omit<Meeting, "id" | "createdAt" | "dateKey" | "color"> & {
      dateKey: string;
      color?: string;
    },
  ) => Meeting;
  updateMeeting: (id: string, patch: Partial<Meeting>) => void;
  removeMeeting: (id: string) => void;
  getByDate: (dateKey: string) => Meeting[];
  hasMeetings: (dateKey: string) => boolean;
};

function pushSorted(
  list: Meeting[],
  meeting: Meeting,
): Meeting[] {
  const next = [...list, meeting];
  next.sort((a, b) => a.startTime.localeCompare(b.startTime));
  return next;
}

export const useMeetingsStore = create<State>()(
  persist(
    (set, get) => ({
      meetings: {},
      addMeeting: ({ dateKey, color, ...rest }) => {
        const meeting: Meeting = {
          ...rest,
          id:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `m_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          dateKey,
          color: color ?? nextColor(),
          createdAt: Date.now(),
        };
        set((state) => {
          const existing = state.meetings[dateKey] ?? [];
          return {
            meetings: {
              ...state.meetings,
              [dateKey]: pushSorted(existing, meeting),
            },
          };
        });
        return meeting;
      },
      updateMeeting: (id, patch) =>
        set((state) => {
          const next: typeof state.meetings = {};
          for (const [k, list] of Object.entries(state.meetings)) {
            const replaced = list.map((m) =>
              m.id === id ? { ...m, ...patch } : m,
            );
            if (patch.dateKey && patch.dateKey !== k) {
              const moved = replaced.filter((m) => m.id === id);
              const stayed = replaced.filter((m) => m.id !== id);
              if (stayed.length) next[k] = stayed;
              if (moved.length) {
                const target = next[patch.dateKey] ?? [];
                next[patch.dateKey] = pushSorted(target, moved[0]!).sort((
                  a,
                  b,
                ) => a.startTime.localeCompare(b.startTime));
              }
            } else {
              next[k] = replaced.sort((a, b) =>
                a.startTime.localeCompare(b.startTime),
              );
            }
          }
          return { meetings: next };
        }),
      removeMeeting: (id) =>
        set((state) => {
          const next: typeof state.meetings = {};
          for (const [k, list] of Object.entries(state.meetings)) {
            const filtered = list.filter((m) => m.id !== id);
            if (filtered.length) next[k] = filtered;
          }
          return { meetings: next };
        }),
      getByDate: (dateKey) => get().meetings[dateKey] ?? [],
      hasMeetings: (dateKey) => (get().meetings[dateKey]?.length ?? 0) > 0,
    }),
    {
      name: "klystic-intranet-meetings",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ meetings: s.meetings }),
    },
  ),
);
