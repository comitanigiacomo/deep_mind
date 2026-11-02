import { useEffect, useState } from 'react';
import { fetchRepoStats, parseRepoStats } from '../lib/repoStats';

let repoStatsRequest = null;

/**
 * Shares a single network request across every consumer (About + Projects)
 * and resets the cache on failure so a retry can succeed.
 */
function requestRepoStats() {
  if (repoStatsRequest === null) {
    repoStatsRequest = fetchRepoStats().catch((error) => {
      repoStatsRequest = null;
      throw error;
    });
  }

  return repoStatsRequest;
}

const INITIAL_STATE = { status: 'loading', projects: [], error: null };

export function useRepoStats() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let isActive = true;

    requestRepoStats()
      .then(parseRepoStats)
      .then((projects) => {
        if (isActive) {
          setState({ status: 'success', projects, error: null });
        }
      })
      .catch((error) => {
        if (isActive) {
          setState({ status: 'error', projects: [], error });
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return state;
}
