import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Trash2,
  Edit3,
  Clock3,
  FileText,
  CalendarDays,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useMeetingsStore,
  toDateKey,
  parseDateKey,
  type Meeting,
} from "@/store/useMeetingsStore";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
  initialDate?: Date;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatHumanDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  if (h == null || m == null) return hhmm;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${pad2(m)} ${suffix}`;
}

export default function CalendarPopover({
  open,
  onClose,
  anchorRef,
  initialDate,
}: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(initialDate ?? today),
  );
  const [selectedKey, setSelectedKey] = useState<string>(() =>
    toDateKey(initialDate ?? today),
  );
  const [draftOpen, setDraftOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    notes: "",
  });

  const meetingsMap = useMeetingsStore((s) => s.meetings);
  const addMeeting = useMeetingsStore((s) => s.addMeeting);
  const updateMeeting = useMeetingsStore((s) => s.updateMeeting);
  const removeMeeting = useMeetingsStore((s) => s.removeMeeting);

  useEffect(() => {
    if (open) {
      const base = initialDate ?? today;
      setViewMonth(startOfMonth(base));
      setSelectedKey(toDateKey(base));
    }
  }, [open, initialDate, today]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (panelRef.current && panelRef.current.contains(t)) return;
      if (anchorRef?.current && anchorRef.current.contains(t)) return;
      onClose();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open, onClose, anchorRef]);

  const { cells, leadingBlanks } = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);
    const leadingBlanks = start.getDay();
    const days: Date[] = [];
    for (let i = 1; i <= end.getDate(); i++) {
      days.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i));
    }
    return { cells: days, leadingBlanks };
  }, [viewMonth]);

  const selectedDate = parseDateKey(selectedKey);
  const dayMeetings = meetingsMap[selectedKey] ?? [];
  const meetingCountsByKey = useMemo(() => {
    const m: Record<string, number> = {};
    for (const [k, list] of Object.entries(meetingsMap)) {
      if (list?.length) m[k] = list.length;
    }
    return m;
  }, [meetingsMap]);
  const meetingColorsByKey = useMemo(() => {
    const m: Record<string, string[]> = {};
    for (const [k, list] of Object.entries(meetingsMap)) {
      if (!list?.length) continue;
      m[k] = list.slice(0, 3).map((x) => x.color);
    }
    return m;
  }, [meetingsMap]);

  function openDraftForNew() {
    setEditingId(null);
    setDraft({
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      notes: "",
    });
    setDraftOpen(true);
  }

  function openDraftForEdit(m: Meeting) {
    setEditingId(m.id);
    setDraft({
      title: m.title,
      startTime: m.startTime,
      endTime: m.endTime ?? "",
      notes: m.notes ?? "",
    });
    setDraftOpen(true);
  }

  function saveDraft() {
    const title = draft.title.trim();
    if (!title) return;
    if (editingId) {
      updateMeeting(editingId, {
        title,
        startTime: draft.startTime,
        endTime: draft.endTime || undefined,
        notes: draft.notes || undefined,
        dateKey: selectedKey,
      });
    } else {
      addMeeting({
        dateKey: selectedKey,
        title,
        startTime: draft.startTime,
        endTime: draft.endTime || undefined,
        notes: draft.notes || undefined,
      });
    }
    setDraftOpen(false);
    setEditingId(null);
    setDraft({
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      notes: "",
    });
  }

  function deleteMeeting(id: string) {
    removeMeeting(id);
    if (editingId === id) {
      setDraftOpen(false);
      setEditingId(null);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none flex items-start justify-center px-4">
      <div className="absolute inset-0 bg-ink-950/20 backdrop-blur-[2px] animate-fade-in pointer-events-auto" />
      <div
        ref={panelRef}
        className="relative z-10 mt-20 sm:mt-24 pointer-events-auto w-full max-w-4xl animate-pop-in origin-top"
        role="dialog"
        aria-modal="true"
        aria-label="Calendar and meetings"
      >
        <div className="relative rounded-3xl glass-card border-white shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-brand-gradient opacity-30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-wave-3 opacity-50 blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-white/70">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md">
                <CalendarDays className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ink-950 leading-tight">
                  {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </div>
                <div className="text-xs text-ink-500">
                  Selected: {formatHumanDate(selectedDate)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 rounded-full bg-white/70 border border-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, -1))}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-full text-ink-600 hover:text-ink-950 hover:bg-white transition"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    setViewMonth(startOfMonth(now));
                    setSelectedKey(toDateKey(now));
                  }}
                  className="h-8 px-3 inline-flex items-center justify-center rounded-full text-xs font-bold text-ink-700 hover:bg-white transition"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, 1))}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-full text-ink-600 hover:text-ink-950 hover:bg-white transition"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
                </button>
              </div>
              <div className="sm:hidden flex items-center gap-1 rounded-full bg-white/70 border border-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, -1))}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-full text-ink-600 hover:text-ink-950 hover:bg-white transition"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, 1))}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-full text-ink-600 hover:text-ink-950 hover:bg-white transition"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/80 border border-white text-ink-500 hover:text-ink-900 hover:bg-white transition shadow-sm"
                aria-label="Close calendar"
              >
                <X className="h-4.5 w-4.5" strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-3 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/60">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink-400 py-1.5"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {Array.from({ length: leadingBlanks }).map((_, i) => (
                  <div key={`b-${i}`} />
                ))}
                {cells.map((date) => {
                  const key = toDateKey(date);
                  const isToday = sameDay(date, today);
                  const isSelected = key === selectedKey;
                  const isOutside = date.getMonth() !== viewMonth.getMonth();
                  const colors = meetingColorsByKey[key] ?? [];
                  const count = meetingCountsByKey[key] ?? 0;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedKey(key)}
                      className={cn(
                        "group relative aspect-square rounded-2xl flex flex-col items-center justify-start py-1.5 px-1 text-sm font-semibold transition-all duration-200 border",
                        isSelected
                          ? "bg-brand-gradient text-white border-transparent shadow-glow scale-[1.02]"
                          : "bg-white/60 border-white/80 text-ink-700 hover:bg-white hover:-translate-y-0.5 hover:shadow-md",
                        isOutside && !isSelected && "opacity-40",
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm",
                          isToday && !isSelected && "text-klystic-blue",
                        )}
                      >
                        {date.getDate()}
                      </span>
                      {isToday && !isSelected && (
                        <span className="mt-0.5 h-1 w-1 rounded-full bg-klystic-blue" />
                      )}
                      <div className="mt-auto mb-1 flex items-center gap-1 min-h-[6px]">
                        {colors.length === 0 ? null : colors.length <= 3 ? (
                          colors.map((c, i) => (
                            <span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full ring-1 ring-white/60"
                              style={{
                                background: isSelected ? "rgba(255,255,255,0.9)" : c,
                              }}
                            />
                          ))
                        ) : (
                          <span
                            className={cn(
                              "text-[9px] font-bold leading-none",
                              isSelected ? "text-white/90" : "text-ink-500",
                            )}
                          >
                            {count}×
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2 p-5 sm:p-6 min-h-[320px] flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                    {WEEKDAYS_LONG[selectedDate.getDay()]}
                  </div>
                  <div className="font-display text-xl font-bold text-ink-950 leading-tight">
                    {MONTHS[selectedDate.getMonth()]}{" "}
                    {selectedDate.getDate()},{" "}
                    <span className="text-ink-500 font-semibold">
                      {selectedDate.getFullYear()}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openDraftForNew}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient text-white text-xs font-bold px-4 py-2 shadow-glow hover:shadow-lg hover:brightness-105 transition"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                  New meeting
                </button>
              </div>

              <div className="mt-5 flex-1 min-h-0 overflow-hidden flex flex-col gap-3">
                {dayMeetings.length === 0 && !draftOpen ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-ink-300/60 bg-white/40 px-6 py-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-white shadow-sm text-ink-400 mb-3">
                      <GripVertical className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="font-display font-bold text-ink-800">
                      Nothing scheduled yet
                    </div>
                    <p className="mt-1 text-sm text-ink-500 max-w-[18rem]">
                      Add your first meeting to block time for standups, reviews, or focus sessions.
                    </p>
                    <button
                      type="button"
                      onClick={openDraftForNew}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white border border-white text-xs font-bold px-4 py-2 text-ink-800 shadow-sm hover:bg-white/90 transition"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                      Add meeting
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-2.5">
                    {dayMeetings.map((m) => (
                      <div
                        key={m.id}
                        className={cn(
                          "group relative rounded-2xl bg-white/80 border backdrop-blur-sm p-3.5 shadow-sm hover:shadow-md transition",
                          editingId === m.id
                            ? "border-klystic-indigo ring-2 ring-klystic-indigo/30"
                            : "border-white",
                        )}
                        style={{
                          borderLeftColor: m.color,
                          borderLeftWidth: 4,
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-ink-950 leading-tight truncate">
                              {m.title}
                            </div>
                            <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink-500">
                              <Clock3
                                className="h-3.5 w-3.5"
                                strokeWidth={2.2}
                                style={{ color: m.color }}
                              />
                              <span>
                                {formatTime12(m.startTime)}
                                {m.endTime
                                  ? ` – ${formatTime12(m.endTime)}`
                                  : ""}
                              </span>
                            </div>
                            {m.notes ? (
                              <p className="mt-2 text-xs leading-relaxed text-ink-600 line-clamp-3">
                                {m.notes}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                            <button
                              type="button"
                              onClick={() => openDraftForEdit(m)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-xl text-ink-400 hover:text-klystic-indigo hover:bg-klystic-indigo/10 transition"
                              aria-label="Edit meeting"
                            >
                              <Edit3
                                className="h-3.5 w-3.5"
                                strokeWidth={2.2}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteMeeting(m.id)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-xl text-ink-400 hover:text-rose-600 hover:bg-rose-500/10 transition"
                              aria-label="Delete meeting"
                            >
                              <Trash2
                                className="h-3.5 w-3.5"
                                strokeWidth={2.2}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {draftOpen && (
                  <div className="relative rounded-2xl bg-white/90 border border-white shadow-lg p-4 animate-fade-up">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="text-sm font-bold text-ink-900">
                        {editingId ? "Edit meeting" : "New meeting"}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftOpen(false);
                          setEditingId(null);
                        }}
                        className="h-7 w-7 inline-flex items-center justify-center rounded-full text-ink-400 hover:text-ink-900 hover:bg-white transition"
                        aria-label="Cancel"
                      >
                        <X className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <label className="block">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                          Title
                        </span>
                        <input
                          type="text"
                          value={draft.title}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, title: e.target.value }))
                          }
                          placeholder="e.g. UAT review with the team"
                          className="w-full rounded-xl bg-white/80 border border-white/90 focus:border-klystic-indigo/60 focus:ring-2 focus:ring-klystic-indigo/20 outline-none text-sm px-3 py-2 text-ink-900 placeholder:text-ink-400"
                        />
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="block">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                            Start
                          </span>
                          <input
                            type="time"
                            value={draft.startTime}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                startTime: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl bg-white/80 border border-white/90 focus:border-klystic-indigo/60 focus:ring-2 focus:ring-klystic-indigo/20 outline-none text-sm px-3 py-2 text-ink-900"
                          />
                        </label>
                        <label className="block">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                            End (optional)
                          </span>
                          <input
                            type="time"
                            value={draft.endTime}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                endTime: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl bg-white/80 border border-white/90 focus:border-klystic-indigo/60 focus:ring-2 focus:ring-klystic-indigo/20 outline-none text-sm px-3 py-2 text-ink-900"
                          />
                        </label>
                      </div>
                      <label className="block">
                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                          <FileText
                            className="h-3 w-3"
                            strokeWidth={2.2}
                          />{" "}
                          Notes
                        </span>
                        <textarea
                          value={draft.notes}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, notes: e.target.value }))
                          }
                          rows={3}
                          placeholder="Agenda, link to the call, prep notes…"
                          className="w-full resize-none rounded-xl bg-white/80 border border-white/90 focus:border-klystic-indigo/60 focus:ring-2 focus:ring-klystic-indigo/20 outline-none text-sm px-3 py-2 text-ink-900 placeholder:text-ink-400"
                        />
                      </label>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setDraftOpen(false);
                            setEditingId(null);
                          }}
                          className="inline-flex items-center justify-center rounded-full text-sm font-bold px-4 py-2 text-ink-600 hover:bg-white transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={saveDraft}
                          disabled={!draft.title.trim()}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full text-sm font-bold px-4 py-2 text-white shadow-glow transition",
                            draft.title.trim()
                              ? "bg-brand-gradient hover:brightness-105"
                              : "bg-ink-300 cursor-not-allowed shadow-none",
                          )}
                        >
                          <Plus
                            className="h-3.5 w-3.5"
                            strokeWidth={2.6}
                          />
                          {editingId ? "Save changes" : "Add meeting"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
