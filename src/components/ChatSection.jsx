import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './ChatSection.css';

const TYPING_DELAY_MS = 2000;
const TYPING_INDICATOR_DELAY_MS = 500;

export default function ChatSection() {
  const { lang } = useLang();
  const messages = translations[lang].chat.messages;

  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (!isInView || visibleCount >= messages.length) {
      setIsTyping(false);
      return undefined;
    }

    const typingTimer = window.setTimeout(() => setIsTyping(true), TYPING_INDICATOR_DELAY_MS);
    const messageTimer = window.setTimeout(() => {
      setIsTyping(false);
      setVisibleCount((previousCount) => Math.min(previousCount + 1, messages.length));
    }, TYPING_DELAY_MS);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(messageTimer);
    };
  }, [isInView, visibleCount, messages.length]);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const visibleMessages = messages.slice(0, visibleCount);

  return (
    <section className="chat-section" ref={ref}>
      <div className="chat-container">
        {visibleMessages.map((message, index) => (
          <div key={index} className="chat-message-row incoming">
            <img src="/profile.webp" alt="" className="chat-avatar-small" width="28" height="28" />
            <div className="chat-bubble-wrapper">
              {/* Messages are first-party translations that intentionally contain markup. */}
              <div
                className="chat-bubble"
                dangerouslySetInnerHTML={{ __html: message }}
              />
              <span className="chat-timestamp">{currentTime}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message-row incoming typing-row">
            <img src="/profile.webp" alt="" className="chat-avatar-small" width="28" height="28" />
            <div className="chat-bubble-wrapper">
              <div className="chat-bubble typing-bubble" aria-label="…">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
