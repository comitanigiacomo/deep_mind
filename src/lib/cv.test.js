import { describe, expect, it } from 'vitest';
import { cvFilename, cvHref } from './cv';

describe('cv helpers', () => {
  it('serves the single English PDF', () => {
    expect(cvFilename()).toBe('giacomo-comitani-cv-en.pdf');
    expect(cvHref()).toBe('/cv/giacomo-comitani-cv-en.pdf');
  });
});
