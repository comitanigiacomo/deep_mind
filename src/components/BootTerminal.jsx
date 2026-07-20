import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './BootTerminal.css';

const bootSequence = [
  "INIT: version 2.90 booting",
  "Loading Linux kernel 6.1.0-21-amd64...",
  "[ OK ] Started Docker Application Container Engine.",
  "[ OK ] Reached target Network is Online.",
  "Mounting /mnt/data_volumes...",
  "[ OK ] Mounted /mnt/data_volumes.",
  "Starting Tailscaled daemon...",
  "[ OK ] Tailscale node active. Zero-trust mesh engaged.",
  "Starting Nginx Proxy Manager...",
  "Routing external domains to internal services...",
  "Deploying Giacomo_Brain_v2.0...",
  "Spinning up Homelab microservices...",
  "[ OK ] System fully operational."
];

export default function BootTerminal() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('idle'); // idle -> booting -> connected
  const [clicks, setClicks] = useState(0);
  const [hacked, setHacked] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    let interval;
    // Delay boot by 1.5 seconds so user has time to scroll and watch
    const startDelay = setTimeout(() => {
      setPhase('booting');

      let currentLine = 0;
      interval = setInterval(() => {
        if (currentLine < bootSequence.length) {
          const nextLine = bootSequence[currentLine];
          setLines(prev => {
            if (!nextLine || prev.includes(nextLine)) return prev;
            return [...prev, nextLine];
          });
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('connected');
            setLines(["[ OK ] Connection: Secure & Online"]);
          }, 1200);
        }
      }, 700); // 700ms per line so they stay on screen longer
    }, 700); // 0.7s initial delay

    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, [inView, trigger]);

  useEffect(() => {
    if (bodyRef.current && phase === 'booting') {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, phase]);

  const resetConnection = (e) => {
    e.stopPropagation(); // prevent easter egg trigger
    setPhase('idle');
    setLines([]);
    setHacked(false);
    setClicks(0);
    setTrigger(t => t + 1);
  };

  const handleClick = () => {
    if (hacked || phase === 'connected') return;
    
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    if (newClicks >= 3) {
      setHacked(true);
      setLines(prev => [
        ...prev,
        "",
        "WARNING: UNAUTHORIZED ACCESS DETECTED...",
        "BYPASSING SECURITY PROTOCOLS...",
        "ROOT PRIVILEGES GRANTED.",
        "ACCESSING MAINFRAME...",
        "WELCOME BACK, GIACOMO."
      ]);
    }
  };

  return (
    <div className={`boot-terminal-wrapper ${hacked ? 'is-hacked' : ''}`} ref={ref} onClick={handleClick}>
      <div className="boot-terminal-header">
        <div className="boot-dots">
          <span className="boot-dot red"></span>
          <span className="boot-dot yellow"></span>
          <span className="boot-dot green"></span>
        </div>
        <span className="boot-title">Terminal</span>
      </div>
      <div className={`boot-terminal-body ${phase === 'connected' ? 'is-connected' : 'short'}`} ref={bodyRef}>
        {lines.map((line, i) => {
          const safeLine = line || '';
          const isOk = safeLine.includes('[ OK ]');
          const isWarning = safeLine.includes('WARNING') || safeLine.includes('UNAUTHORIZED');
          const isRoot = safeLine.includes('ROOT') || safeLine.includes('WELCOME');
          
          let lineClass = "boot-text";
          if (isOk) lineClass += " boot-success";
          if (isWarning) lineClass += " boot-warning";
          if (isRoot) lineClass += " boot-root";

          return (
            <div key={i} className="boot-line">
              <span className="boot-prompt">{safeLine === "" ? "" : "> "}</span>
              <span className={lineClass}>
                {isOk ? (
                  <>
                    <span className="boot-ok-tag">[ OK ]</span> {safeLine.replace('[ OK ]', '')}
                  </>
                ) : (
                  safeLine
                )}
              </span>
            </div>
          );
        })}
        
        {phase === 'connected' && (
          <button 
            className="boot-reset-btn" 
            onClick={resetConnection} 
            title="Restart Connection"
            aria-label="Restart Connection"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        )}

        {phase === 'booting' && lines.length < bootSequence.length && <div className="boot-cursor-blink"></div>}
        {hacked && <div className="boot-cursor-blink"></div>}
      </div>
    </div>
  );
}
