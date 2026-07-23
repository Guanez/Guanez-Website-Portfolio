"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiGitCommit, FiStar, FiGitPullRequest } from "react-icons/fi";
import { VscRepo } from "react-icons/vsc";
import Link from "next/link";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubStats {
  repos: number;
  commits: number;
  stars: number;
  prs: number;
  contributions: number;
}

interface GitHubData {
  stats: GitHubStats;
  weeks: ContributionWeek[];
}

const GITHUB_USERNAME = "Guanez";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function getContributionLevel(count: number): string {
  if (count === 0) return "bg-[var(--gh-empty)]";
  if (count <= 3) return "bg-emerald-900/60";
  if (count <= 6) return "bg-emerald-700/80";
  if (count <= 9) return "bg-emerald-500";
  return "bg-emerald-400";
}

function getMonthLabels(weeks: ContributionWeek[]): { label: string; index: number }[] {
  const months: { label: string; index: number }[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = -1;

  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        months.push({ label: monthNames[month], index: i });
        lastMonth = month;
      }
    }
  });

  return months;
}

export default function GitHubActivitySection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const stats = data?.stats;
  const weeks = data?.weeks ?? [];
  const monthLabels = weeks.length > 0 ? getMonthLabels(weeks) : [];

  return (
    <div className="relative overflow-hidden">
      <div className="px-6 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter mt-20 mb-6"
          >
            <span className="text-gradient">GitHub</span>{" "}
            <span className="text-gradient-muted italic">Activity</span>
          </motion.h2>


          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: VscRepo, label: "Repos", value: stats?.repos ?? "—" },
              { icon: FiGitCommit, label: "Commits", value: stats?.commits ?? "—" },
              { icon: FiStar, label: "Stars", value: stats?.stars ?? "—" },
              { icon: FiGitPullRequest, label: "PRs", value: stats?.prs ?? "—" },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative p-5 md:p-6 rounded-xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm overflow-hidden group hover:border-[var(--fg-faint)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon size={14} className="text-[var(--fg-faint)]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--fg-faint)]">
                    {stat.label}
                  </span>
                </div>
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--fg)]">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-[var(--fg-ghost)] rounded animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            variants={itemVariants}
            className="relative p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-accent text-xs font-mono tracking-widest uppercase">
                  Contribution Graph
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <Link
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors font-mono uppercase tracking-wider"
              >
                View Profile <FiExternalLink size={12} />
              </Link>
            </div>

            {/* Graph */}
            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm bg-[var(--fg-ghost)] animate-pulse"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="h-32 flex items-center justify-center text-[var(--fg-faint)] text-sm">
                Unable to load contribution data
              </div>
            ) : (
              <div className="w-full">
                {/* Month labels — positioned as a % of width so they align to their week column and stretch with the grid */}
                <div className="relative h-4 mb-1 w-full">
                  {monthLabels.map((m, i) => (
                    <span
                      key={i}
                      className="absolute top-0 text-[10px] text-[var(--fg-faint)] font-mono"
                      style={{ left: `${(m.index / weeks.length) * 100}%` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Grid — each week is a flex-1 column so the whole graph fills the card width */}
                <div className="flex gap-[3px] w-full">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px] flex-1">
                      {week.contributionDays.map((day, di) => (
                        <div
                          key={di}
                          className={`aspect-square rounded-[2px] ${getContributionLevel(day.contributionCount)} transition-colors`}
                          title={`${day.date}: ${day.contributionCount} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[var(--fg-faint)] font-mono">
                    {stats?.contributions ?? 0} contributions in the last year
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[var(--fg-faint)]">Less</span>
                    {[0, 2, 5, 8, 12].map((level, i) => (
                      <div
                        key={i}
                        className={`w-[11px] h-[11px] rounded-[2px] ${getContributionLevel(level)}`}
                      />
                    ))}
                    <span className="text-[10px] text-[var(--fg-faint)]">More</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Explore Repositories Button */}
          <motion.div variants={itemVariants} className="flex justify-center mt-10">
            <Link
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              className="group flex items-center gap-2 px-8 py-4 border border-[var(--border)] rounded-full text-sm font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg-faint)] transition-all"
            >
              <FiGithub size={16} />
              Explore Repositories
              <FiExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
