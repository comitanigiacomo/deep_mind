const REPO_STATS_ENDPOINT = '/repo_stats.json';
const FALLBACK_IMAGE_PATH = '/fallback-image.png';

export class RepoStatsError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = 'RepoStatsError';
  }
}

function toSafeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toSafeArray(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * Transforms the raw `repo_stats.json` payload into the flat shape the UI needs.
 * Insertion order is preserved: the JSON file is curated, not sorted.
 */
export function parseRepoStats(rawStats) {
  if (!rawStats || typeof rawStats !== 'object' || Array.isArray(rawStats)) {
    throw new RepoStatsError('repo_stats.json must contain a JSON object keyed by "owner/repo"');
  }

  return Object.entries(rawStats).map(([fullName, stats = {}]) => {
    const [owner = '', repo = fullName] = fullName.split('/');

    return {
      id: fullName,
      owner,
      repo,
      title: stats.title || repo,
      description: stats.description || '',
      image: stats.image || FALLBACK_IMAGE_PATH,
      stars: toSafeNumber(stats.stars),
      forks: toSafeNumber(stats.forks),
      commits: toSafeNumber(stats.commits),
      topics: toSafeArray(stats.topics),
      languages: toSafeArray(stats.languages),
    };
  });
}

/**
 * Fetches the repository statistics generated at build time by GitHub Actions.
 * The caller owns cancellation through the optional AbortSignal.
 */
export async function fetchRepoStats({ signal } = {}) {
  let response;

  try {
    response = await fetch(REPO_STATS_ENDPOINT, { signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new RepoStatsError('Unable to reach repo_stats.json', { cause: error });
  }

  if (!response.ok) {
    throw new RepoStatsError(`repo_stats.json responded with status ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new RepoStatsError('repo_stats.json is not valid JSON', { cause: error });
  }
}
