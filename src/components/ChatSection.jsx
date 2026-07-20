import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './ChatSection.css';

export default function ChatSection() {
  const { lang } = useLang();
  const messages = translations[lang].chat.messages;

  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const { ref, inView } = useInView({
    threshold: 0.6, // Trigger when the user is well into the footer
    triggerOnce: true,
  });

  // State-machine based message appending (React StrictMode safe)
  useEffect(() => {
    if (!inView) return;

    if (visibleCount < messages.length) {
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
      }, 500); // Short pause before starting to type

      const messageTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(prev => Math.min(prev + 1, messages.length));
      }, 2000); // Total time including typing

      return () => {
        clearTimeout(typingTimer);
        clearTimeout(messageTimer);
      };
    } else {
      setIsTyping(false);
    }
  }, [inView, visibleCount, messages.length]);

  // Auto-scroll the page when new messages appear (kept for safety on smaller screens)
  useEffect(() => {
    if (endRef.current && visibleCount > 0) {
      // Disabled aggressive auto-scroll, relying on min-height instead.
      // But if on mobile where min-height isn't enough, this acts as fallback.
    }
  }, [visibleCount, isTyping]);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="chat-section" ref={ref}>
      <div className="chat-container">
        
        {messages.slice(0, visibleCount).map((msg, idx) => (
          <div key={idx} className="chat-message-row incoming">
            <img src="/profile.png" alt="Giacomo" className="chat-avatar-small" />
            <div className="chat-bubble-wrapper">
              <div 
                className="chat-bubble" 
                dangerouslySetInnerHTML={{ __html: msg }}
              />
              <span className="chat-timestamp">{currentTime}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message-row incoming typing-row">
            <img src="/profile.png" alt="Giacomo" className="chat-avatar-small" />
            <div className="chat-bubble-wrapper">
              <div className="chat-bubble typing-bubble">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
