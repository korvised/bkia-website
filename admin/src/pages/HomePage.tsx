import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LuPlaneTakeoff,
  LuPlaneLanding,
  LuPackageSearch,
  LuMessageSquare,
  LuBell,
  LuArrowRight,
  LuPlane,
  LuNewspaper,
  LuHeadphones,
  LuSettings,
  LuActivity,
} from "react-icons/lu";
import { useGetAuth } from "@/hooks";
import { useFetchFlightsQuery } from "@/features/flight/api/flightApi";
import { useFetchLostFoundItemsQuery } from "@/features/lost-found/api/lostFoundApi";
import { useFetchFeedbacksQuery } from "@/features/feedback/api/feedbackApi";
import { useFetchNoticesQuery } from "@/features/notice/api/noticeApi";
import {
  FlightDirection,
  FlightStatus,
  LostFoundStatus,
  LostFoundType,
  FeedbackStatus,
} from "@/types/enum.type";
import { cn } from "@/lib";

// ── helpers ───────────────────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function greeting(name: string) {
  const h = new Date().getHours();
  const salutation =
    h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  return `${salutation}, ${name.split(" ")[0]}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ── Status badge maps ─────────────────────────────────────────────────────────

const FLIGHT_STATUS_STYLE: Record<FlightStatus, string> = {
  [FlightStatus.SCHEDULED]: "bg-blue-50 text-blue-700",
  [FlightStatus.BOARDING]:  "bg-indigo-50 text-indigo-700",
  [FlightStatus.DEPARTED]:  "bg-gray-100 text-gray-600",
  [FlightStatus.ARRIVED]:   "bg-green-50 text-green-700",
  [FlightStatus.DELAYED]:   "bg-amber-50 text-amber-700",
  [FlightStatus.CANCELED]:  "bg-red-50 text-red-700",
  [FlightStatus.DIVERTED]:  "bg-orange-50 text-orange-700",
};

const LF_STATUS_STYLE: Record<LostFoundStatus, string> = {
  [LostFoundStatus.OPEN]:     "bg-blue-50 text-blue-700",
  [LostFoundStatus.MATCHED]:  "bg-amber-50 text-amber-700",
  [LostFoundStatus.RETURNED]: "bg-green-50 text-green-700",
  [LostFoundStatus.DONATED]:  "bg-purple-50 text-purple-700",
  [LostFoundStatus.DISPOSED]: "bg-gray-100 text-gray-500",
};

const FB_STATUS_STYLE: Record<FeedbackStatus, string> = {
  [FeedbackStatus.NEW]:         "bg-red-50 text-red-700",
  [FeedbackStatus.IN_PROGRESS]: "bg-amber-50 text-amber-700",
  [FeedbackStatus.RESOLVED]:    "bg-green-50 text-green-700",
};

// ── Stat card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | undefined;
  isLoading: boolean;
  href: string;
  accent: string;
}

function StatCard({ icon, label, value, isLoading, href, accent }: StatCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accent)}>
          {icon}
        </div>
        <LuArrowRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <div>
        {isLoading ? (
          <div className="h-8 w-16 animate-pulse rounded-md bg-gray-100" />
        ) : (
          <p className="text-3xl font-bold text-gray-900">{value ?? 0}</p>
        )}
        <p className="mt-0.5 text-sm text-gray-500">{label}</p>
      </div>
    </Link>
  );
}

// ── Skeleton row ──────────────────────────────────────────────────────────────

function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export const HomePage = () => {
  const { currentUser } = useGetAuth();
  const today = useMemo(() => todayISO(), []);
  const name  = currentUser?.user?.name ?? "there";

  // ── Data fetches ────────────────────────────────────────────────────────

  const { data: depData,    isLoading: depLoading    } = useFetchFlightsQuery({ operationDate: today, direction: FlightDirection.DEPARTURE, limit: 1, page: 1 });
  const { data: arrData,    isLoading: arrLoading    } = useFetchFlightsQuery({ operationDate: today, direction: FlightDirection.ARRIVAL,   limit: 1, page: 1 });
  const { data: allFlights, isLoading: flightsLoading } = useFetchFlightsQuery({ operationDate: today, limit: 10, page: 1 });
  const { data: lfCount,    isLoading: lfCountLoading } = useFetchLostFoundItemsQuery({ status: LostFoundStatus.OPEN, limit: 1, page: 1 });
  const { data: recentLF,   isLoading: recentLFLoading } = useFetchLostFoundItemsQuery({ limit: 5, page: 1 });
  const { data: fbCount,    isLoading: fbCountLoading } = useFetchFeedbacksQuery({ status: FeedbackStatus.NEW, limit: 1, page: 1 });
  const { data: recentFB,   isLoading: recentFBLoading } = useFetchFeedbacksQuery({ limit: 5, page: 1 });
  const { data: noticeData, isLoading: noticeLoading  } = useFetchNoticesQuery({ isActive: "true", limit: 1, page: 1 });

  return (
    <div className="space-y-6">

      {/* ── 1. Welcome header ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting(name)}</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600">
          <LuActivity className="h-4 w-4 text-primary" />
          <span className="font-medium">Bokeo International Airport</span>
        </div>
      </div>

      {/* ── 2. KPI Stats ───────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={<LuPlaneTakeoff className="h-5 w-5 text-primary" />}
          label="Today's Departures"
          value={depData?.meta.total}
          isLoading={depLoading}
          href="/flights"
          accent="bg-primary/10"
        />
        <StatCard
          icon={<LuPlaneLanding className="h-5 w-5 text-sky-600" />}
          label="Today's Arrivals"
          value={arrData?.meta.total}
          isLoading={arrLoading}
          href="/flights"
          accent="bg-sky-50"
        />
        <StatCard
          icon={<LuPackageSearch className="h-5 w-5 text-amber-600" />}
          label="Open Lost & Found"
          value={lfCount?.meta.total}
          isLoading={lfCountLoading}
          href="/support/lost-found"
          accent="bg-amber-50"
        />
        <StatCard
          icon={<LuMessageSquare className="h-5 w-5 text-rose-600" />}
          label="New Feedback"
          value={fbCount?.meta.total}
          isLoading={fbCountLoading}
          href="/support/feedback"
          accent="bg-rose-50"
        />
        <StatCard
          icon={<LuBell className="h-5 w-5 text-violet-600" />}
          label="Active Notices"
          value={noticeData?.meta.total}
          isLoading={noticeLoading}
          href="/content/notices"
          accent="bg-violet-50"
        />
      </div>

      {/* ── 3. Today's Flights ─────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <LuPlane className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-gray-900">Today's Flights</h2>
            {allFlights && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {allFlights.meta.total}
              </span>
            )}
          </div>
          <Link
            to="/flights"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View all <LuArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {flightsLoading ? (
          <SkeletonRows count={4} />
        ) : !allFlights?.data.length ? (
          <p className="py-12 text-center text-sm text-gray-400">
            No flights scheduled for today
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Flight</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Airline</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Route</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Departure</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Arrival</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allFlights.data.map((flight) => (
                  <tr
                    key={flight.id}
                    className="transition-colors hover:bg-gray-50/60"
                  >
                    <td className="px-5 py-3 font-semibold text-gray-900">
                      {flight.flightNo}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {flight.airline?.names?.en ?? flight.airline?.name ?? "—"}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-600">
                      {flight.route?.origin?.code ?? "?"}&nbsp;→&nbsp;{flight.route?.destination?.code ?? "?"}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {formatTime(flight.scheduledDepTime)}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {formatTime(flight.scheduledArrTime)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          FLIGHT_STATUS_STYLE[flight.status],
                        )}
                      >
                        {flight.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── 4. Recent: Lost & Found + Feedback ────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">

        {/* Lost & Found */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <LuPackageSearch className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-gray-900">Recent Lost & Found</h2>
            </div>
            <Link
              to="/support/lost-found"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View all <LuArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentLFLoading ? (
            <SkeletonRows count={4} />
          ) : !recentLF?.data.length ? (
            <p className="py-10 text-center text-sm text-gray-400">No items yet</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentLF.data.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold",
                      item.type === LostFoundType.LOST
                        ? "bg-red-50 text-red-700"
                        : "bg-green-50 text-green-700",
                    )}
                  >
                    {item.type}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {item.displayNames?.en ?? item.displayNames?.lo ?? "—"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.category} · {formatDate(item.incidentDate)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      LF_STATUS_STYLE[item.status],
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <LuMessageSquare className="h-5 w-5 text-rose-500" />
              <h2 className="font-semibold text-gray-900">Recent Feedback</h2>
            </div>
            <Link
              to="/support/feedback"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View all <LuArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentFBLoading ? (
            <SkeletonRows count={4} />
          ) : !recentFB?.data.length ? (
            <p className="py-10 text-center text-sm text-gray-400">No feedback yet</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentFB.data.map((fb) => (
                <div key={fb.id} className="flex items-center gap-3 px-5 py-3.5">
                  {fb.rating !== null && (
                    <span className="shrink-0 text-xs font-bold text-amber-400">
                      {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {fb.comment
                        ? fb.comment.slice(0, 55) + (fb.comment.length > 55 ? "…" : "")
                        : fb.category}
                    </p>
                    <p className="text-xs text-gray-400">
                      {fb.category} · {formatDate(fb.createdAt)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      FB_STATUS_STYLE[fb.status],
                    )}
                  >
                    {fb.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── 5. Quick Links ─────────────────────────────────────────────────── */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Quick Links
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: LuPlane,
              label: "Flights",
              sub: "Manage flight schedules",
              href: "/flights",
              accent: "bg-primary/10 text-primary",
            },
            {
              icon: LuNewspaper,
              label: "News & Notices",
              sub: "Publish announcements",
              href: "/content/news",
              accent: "bg-sky-50 text-sky-600",
            },
            {
              icon: LuHeadphones,
              label: "Support",
              sub: "Lost & Found · Feedback",
              href: "/support/lost-found",
              accent: "bg-amber-50 text-amber-600",
            },
            {
              icon: LuSettings,
              label: "Settings",
              sub: "Users, roles & permissions",
              href: "/settings/users",
              accent: "bg-violet-50 text-violet-600",
            },
          ].map(({ icon: Icon, label, sub, href, accent }) => (
            <Link
              key={href}
              to={href}
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  accent,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-primary">
                  {label}
                </p>
                <p className="truncate text-xs text-gray-400">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};
