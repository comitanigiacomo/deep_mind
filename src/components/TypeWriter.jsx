
import { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 200, delay = 2000, loop = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, speed);
    } else if (!isDeleting && index === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setIndex(prev => prev - 1);
      }, speed / 2); // Cancellazione più veloce
    } else if (isDeleting && index === 0) {
      if (loop) {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, delay, loop]);

  return <span>{displayText}</span>;
};

export default TypeWriter;

