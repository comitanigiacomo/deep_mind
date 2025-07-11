import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Intro.css';

export default function Intro({ onEnd }) {
  const [fadeOut, setFadeOut] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const endTimer = setTimeout(() => {
      onEnd();
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onEnd]);

  return (
    <div
      className={`intro-container ${fadeOut ? 'fade-out' : ''}`}
      style={{ backgroundColor: isDarkMode ? '#010101' : '#fefefe' }}
    >
      <img
        src={`/signature-${isDarkMode ? 'dark' : 'light'}.gif?reload=${Date.now()}`}
        alt="Firma animata"
        className="intro-gif"
      />
    </div>
  );
}