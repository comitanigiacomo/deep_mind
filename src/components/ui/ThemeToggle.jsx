import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Controls.css';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const label = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-pill"
      title={label}
      aria-label={label}
      aria-pressed={isDarkMode}
    >
      <span className={`theme-toggle-track ${isDarkMode ? 'is-dark' : 'is-light'}`}>
        <span className="theme-toggle-thumb">
          {isDarkMode ? <FaMoon size={11} aria-hidden="true" /> : <FaSun size={11} aria-hidden="true" />}
        </span>
      </span>
    </button>
  );
}
