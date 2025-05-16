
import { useEffect, useState } from 'react';
import './Intro.css';

export default function Intro({ onEnd }) {
  const [fadeOut, setFadeOut] = useState(false);

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
    <div className={`intro-container ${fadeOut ? 'fade-out' : ''}`}>
      
    <img
      src={`../../signature.gif?reload=${Date.now()}`}
      alt="Firma animata"
      className="intro-gif"
     />

    </div>
  );
}

