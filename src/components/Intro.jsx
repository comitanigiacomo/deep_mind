
import { useEffect, useState } from 'react';
import './Intro.css';

export default function Intro({ onEnd }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true); // Avvia dissolvenza
    }, 1500); // Avvia fade poco prima di onEnd()

    const endTimer = setTimeout(() => {
      onEnd(); // Chiama onEnd dopo la dissolvenza
    }, 1500); // Totale 2s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onEnd]);

  return (
    <div className={`intro-container ${fadeOut ? 'fade-out' : ''}`}>
      
    <img
      src={`../../signature.gif?reload=${Date.now()}`}
      alt="Firma animata"
      className="intro-gif"
     />

    </div>
  );
}

