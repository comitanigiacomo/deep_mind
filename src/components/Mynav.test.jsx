import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Mynav from './Mynav';
import { ThemeProvider } from '../context/ThemeProvider';
import { LanguageProvider } from '../context/LanguageProvider';

function renderNavigation() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <MemoryRouter>
          <Mynav />
        </MemoryRouter>
      </LanguageProvider>
    </ThemeProvider>,
  );
}

describe('Mynav', () => {
  it('renders one link per portfolio section', () => {
    renderNavigation();

    expect(screen.getAllByRole('link')).toHaveLength(9);
  });

  it('exposes an accessible toggle for the mobile menu', async () => {
    renderNavigation();

    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });

    expect(toggle).toHaveAttribute('aria-controls', 'primary-navigation');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the menu when Escape is pressed', async () => {
    renderNavigation();

    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    await userEvent.click(toggle);
    await userEvent.keyboard('{Escape}');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
