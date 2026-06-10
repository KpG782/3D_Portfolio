type GhEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
};

async function fetchActivity() {
  try {
    const res = await fetch(
      "https://api.github.com/users/KpG782/events/public?per_page=100",
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!res.ok) return null;
    const events = (await res.json()) as GhEvent[];
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recent = events.filter(
      (e) => new Date(e.created_at).getTime() > cutoff,
    );
    if (recent.length === 0) return null;
    const pushes = recent.filter((e) => e.type === "PushEvent").length;
    const repos = new Set(recent.map((e) => e.repo.name)).size;
    const lastRepo = recent[0]?.repo.name.split("/")[1] ?? "";
    return { pushes, repos, lastRepo };
  } catch {
    return null;
  }
}

/** Live GitHub activity — server-fetched, cached 1h (ship-gate live card). */
export default async function GitHubCard() {
  const activity = await fetchActivity();

  return (
    <a
      href="https://github.com/KpG782"
      target="_blank"
      rel="noopener noreferrer"
      data-track="project_card_click"
      data-track-id="github-activity"
      className="glass flex flex-col justify-between gap-4 p-5 transition-colors duration-200 hover:border-pulse/40"
    >
      <p className="font-mono text-xs tracking-wide text-telemetry">
        <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-pass align-middle" />
        GITHUB · LAST 30 DAYS
      </p>
      {activity ? (
        <p className="font-mono text-sm leading-relaxed text-signal">
          {activity.pushes} pushes · {activity.repos} repos
          <span className="block text-telemetry">
            latest: {activity.lastRepo}
          </span>
        </p>
      ) : (
        <p className="font-mono text-sm text-telemetry">
          activity feed resting — see github.com/KpG782
        </p>
      )}
      <span className="font-mono text-xs text-pulse">profile →</span>
    </a>
  );
}
