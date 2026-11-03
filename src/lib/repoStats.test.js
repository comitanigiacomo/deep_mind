import { describe, expect, it } from 'vitest';
import { parseRepoStats, RepoStatsError } from './repoStats';

const RAW_STATS = {
  'comitanigiacomo/kanso': {
    title: 'Kanso',
    description: 'Minimal habit tracker',
    image: '/kanso-web.webp',
    demo: 'https://kanso.jack-lab.dev/',
    demoType: 'store',
    stars: 12,
    forks: 2,
    commits: 140,
    topics: ['react', 'habits'],
    languages: [{ name: 'TypeScript' }],
  },
  'comitanigiacomo/deep_mind': {
    title: 'Portfolio',
    description: 'Personal website',
    stars: 3,
    forks: 0,
    commits: 88,
    topics: [],
    languages: [{ name: 'JavaScript' }],
  },
};

describe('parseRepoStats', () => {
  it('maps the raw payload to the UI shape while preserving order', () => {
    const projects = parseRepoStats(RAW_STATS);

    expect(projects).toHaveLength(2);
    expect(projects[0]).toMatchObject({
      id: 'comitanigiacomo/kanso',
      owner: 'comitanigiacomo',
      repo: 'kanso',
      title: 'Kanso',
      stars: 12,
      topics: ['react', 'habits'],
    });
    expect(projects[1].title).toBe('Portfolio');
  });

  it('exposes the curated live demo URL and trims descriptions', () => {
    const [project] = parseRepoStats({
      'owner/repo': { description: '  Trailing spaces.  ', demo: '  https://example.dev/  ' },
    });

    expect(project.description).toBe('Trailing spaces.');
    expect(project.demo).toBe('https://example.dev/');
  });

  it('maps the demo type and defaults it to a live demo', () => {
    const [store, live] = parseRepoStats({
      'owner/store': { demo: 'https://extensions.gnome.org/extension/1/', demoType: 'store' },
      'owner/live': { demo: 'https://example.dev/' },
    });

    expect(store.demoType).toBe('store');
    expect(live.demoType).toBe('live');
  });

  it('applies safe defaults when optional fields are missing', () => {
    const [project] = parseRepoStats({ 'owner/repo': {} });

    expect(project).toMatchObject({
      title: 'repo',
      description: '',
      image: '/fallback-image.png',
      demo: '',
      demoType: 'live',
      stars: 0,
      forks: 0,
      commits: 0,
      topics: [],
      languages: [],
    });
  });

  it('rejects payloads that are not keyed objects', () => {
    expect(() => parseRepoStats(null)).toThrow(RepoStatsError);
    expect(() => parseRepoStats([])).toThrow(RepoStatsError);
    expect(() => parseRepoStats('nope')).toThrow(RepoStatsError);
  });
});
