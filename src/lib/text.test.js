import { describe, expect, it } from 'vitest';
import { toPlainText } from './text';

describe('toPlainText', () => {
  it('strips markup and collapses whitespace', () => {
    expect(toPlainText('<p>Hello <strong>world</strong></p>\n<p>again</p>')).toBe('Hello world again');
  });

  it('returns an empty string for non-string input', () => {
    expect(toPlainText(undefined)).toBe('');
    expect(toPlainText(null)).toBe('');
  });

  it('truncates long content on a word boundary and appends an ellipsis', () => {
    const excerpt = toPlainText('<p>alpha beta gamma delta</p>', 12);

    expect(excerpt).toBe('alpha beta…');
  });

  it('keeps short content untouched', () => {
    expect(toPlainText('<p>alpha beta</p>', 50)).toBe('alpha beta');
  });
});
