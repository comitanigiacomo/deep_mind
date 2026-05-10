import { useState, useCallback, useRef, useEffect } from 'react'
import KeyboardScene from '../components/keyboardScene'
import './Skills.css'
import { useTheme } from '../context/ThemeContext'
import ShinyText from '../components/ShinyText';

const skillData = {
    'key-01': {
        title: 'Under construction 🚧',
        level: 'Coming Soon',
        category: 'misc',
        description: "Still under construction — cool stuff coming soon!",
    },
    'key-02': {
        title: 'Under construction 🚧',
        level: 'Coming Soon',
        category: 'misc',
        description: "Still under construction — cool stuff coming soon!",
    },
    'key-03': {
        title: 'Under construction 🚧',
        level: 'Coming Soon',
        category: 'misc',
        description: "Still under construction — cool stuff coming soon!",
    },
    'key-04': {
        title: 'Under construction 🚧',
        level: 'Coming Soon',
        category: 'misc',
        description: "Still under construction — cool stuff coming soon!",
    },
    'key-05': {
        title: 'GitHub Actions',
        level: 'Intermediate',
        category: 'devops',
        description: "Automated workflows on GitHub repos — CI/CD pipelines that save time and make projects more efficient.",
    },
    'key-06': {
        title: 'Kotlin',
        level: 'Beginner',
        category: 'language',
        description: "Built a small personal app and enjoyed the experience. Excited to keep exploring mobile development.",
    },
    'key-07': {
        title: 'Blender',
        level: 'Beginner',
        category: 'tool',
        description: "Created the 3D keyboard model you see here. First dive into 3D modeling — planning to build more complex models.",
    },
    'key-08': {
        title: 'CSS',
        level: 'Advanced',
        category: 'frontend',
        description: "Go-to for styling — clean layouts, responsive designs, smooth animations across all devices.",
    },
    'key-09': {
        title: 'HTML5',
        level: 'Advanced',
        category: 'frontend',
        description: "Foundation for web projects. Prefer modern frameworks like React for dynamic, scalable apps.",
    },
    'key-10': {
        title: 'React',
        level: 'Advanced',
        category: 'frontend',
        description: "Built this portfolio and several projects. Love reusable components and interactive UI development.",
    },
    'key-11': {
        title: 'LaTeX',
        level: 'Advanced',
        category: 'tool',
        description: "Professional-looking university notes with precision formatting. Clean, consistent output.",
    },
    'key-12': {
        title: 'Typst',
        level: 'Advanced',
        category: 'tool',
        description: "Modern, intuitive document writing. Simpler than LaTeX but powerful enough for projects.",
    },
    'key-13': {
        title: 'Docker',
        level: 'Intermediate',
        category: 'devops',
        description: "Getting into containerization for easier deployment. Next big step in leveling up.",
    },
    'key-14': {
        title: 'Insomnia',
        level: 'Intermediate',
        category: 'tool',
        description: "Handy API testing tool — user-friendly and reliable for backend development.",
    },
    'key-15': {
        title: 'Linux',
        level: 'Advanced',
        category: 'tool',
        description: "Daily driver for 4+ years. Stable, customizable, comfortable with terminal and system management.",
    },
    'key-16': {
        title: 'Git',
        level: 'Advanced',
        category: 'devops',
        description: "Favorite version control tool — used daily. Comfortable with all main commands and workflows.",
    },
    'key-17': {
        title: 'MongoDB',
        level: 'Intermediate',
        category: 'database',
        description: "Flexible document-based database. Used for university projects with non-strict schemas.",
    },
    'key-18': {
        title: 'PostgreSQL',
        level: 'Intermediate',
        category: 'database',
        description: "Solid SQL skills — queries, table management, and database handling with confidence.",
    },
    'key-19': {
        title: 'Go',
        level: 'Intermediate',
        category: 'language',
        description: "Learned during first year at university. Simple, fast, and powerful for backend work.",
    },
    'key-20': {
        title: 'Python',
        level: 'Advanced',
        category: 'language',
        description: "LeetCode challenges, AI, and statistics. Versatile and one of my favorite languages.",
    },
    'key-21': {
        title: 'PHP',
        level: 'Intermediate',
        category: 'language',
        description: "Built frontend with dynamic HTML content generation. Gets the job done when needed.",
    },
    'key-22': {
        title: 'C',
        level: 'Beginner',
        category: 'language',
        description: "Used for reverse engineering and security courses. Low-level but powerful.",
    },
    'key-23': {
        title: 'Java',
        level: 'Intermediate',
        category: 'language',
        description: "University OOP foundation. Solid and versatile — planning personal projects to level up.",
    },
    'key-24': {
        title: 'JavaScript',
        level: 'Intermediate',
        category: 'language',
        description: "Primary web development language. Fun, flexible, and essential in my coding toolbox.",
    },
};

const categoryConfig = {
    language: { label: 'Language', icon: '⟨⟩' },
    frontend: { label: 'Frontend', icon: '◈' },
    devops: { label: 'DevOps', icon: '⚙' },
    tool: { label: 'Tool', icon: '◆' },
    database: { label: 'Database', icon: '⊡' },
    misc: { label: 'Other', icon: '✦' },
};

const levelConfig = {
    'Beginner': { width: '33%', color: '#3b82f6' },
    'Intermediate': { width: '66%', color: '#07589D' },
    'Advanced': { width: '100%', color: '#06b6d4' },
    'Coming Soon': { width: '0%', color: '#64748b' },
};


export default function Skills() {
    // The key currently displayed in the card
    const [displayedKey, setDisplayedKey] = useState(null)
    // Whether the progress bar should animate (delayed after mount)
    const [animateProgress, setAnimateProgress] = useState(false)
    // Counter to force re-mount of card for fresh CSS animation
    const [cardGeneration, setCardGeneration] = useState(0)
    // Ref to cancel pending exit timeout
    const exitTimerRef = useRef(null)

    const handleKeyHover = useCallback((keyName) => {
        // Always clear any pending exit when a new event arrives
        if (exitTimerRef.current) {
            clearTimeout(exitTimerRef.current)
            exitTimerRef.current = null
        }

        if (keyName) {
            // Immediately swap to the new key — bump generation to re-trigger CSS animation
            setDisplayedKey(keyName)
            setAnimateProgress(false)
            setCardGeneration(prev => prev + 1)
        } else {
            // Mouse left a key — delay hiding so rapid re-hovers don't flicker
            exitTimerRef.current = setTimeout(() => {
                setDisplayedKey(null)
                setAnimateProgress(false)
            }, 150)
        }
    }, [])

    // Trigger the progress bar animation shortly after card mounts
    useEffect(() => {
        if (displayedKey) {
            const id = setTimeout(() => setAnimateProgress(true), 80)
            return () => clearTimeout(id)
        }
    }, [displayedKey, cardGeneration])

    const handleKeyClick = useCallback((keyName) => {
        handleKeyHover(keyName)
    }, [handleKeyHover])

    const currentSkill = displayedKey ? skillData[displayedKey] : null
    const category = currentSkill ? categoryConfig[currentSkill.category] : null
    const level = currentSkill ? levelConfig[currentSkill.level] : null

    return (
        <section id="skills" className="skills-section">
            <div className="section-title">
                <h2>SKILLS</h2>
                <div className="title-underline"></div>
            </div>

            <div className="skills-layout">
                {/* Keyboard column */}
                <div className="skills-keyboard-area">
                    <KeyboardScene
                        onKeyHover={handleKeyHover}
                        onKeyClick={handleKeyClick}
                        fixedRotation={[0.5, 0.6, 0]}
                        scale={1.5}
                    />
                </div>

                {/* Card column — always in DOM, visibility controlled by CSS */}
                <div className="skills-card-area">
                    {currentSkill ? (
                        <div className="skill-card skill-card--enter" key={cardGeneration}>
                            <div className="skill-card__header">
                                <div className="skill-card__category">
                                    <span className="skill-card__category-icon">{category?.icon}</span>
                                    <span className="skill-card__category-label">{category?.label}</span>
                                </div>
                                <span className={`skill-card__level skill-card__level--${currentSkill.level.toLowerCase().replace(' ', '-')}`}>
                                    {currentSkill.level}
                                </span>
                            </div>

                            <h3 className="skill-card__title">{currentSkill.title}</h3>

                            <p className="skill-card__description">{currentSkill.description}</p>

                            {currentSkill.level !== 'Coming Soon' && (
                                <div className="skill-card__progress">
                                    <div className="skill-card__progress-track">
                                        <div
                                            className="skill-card__progress-fill"
                                            style={{
                                                width: animateProgress ? level?.width : '0%',
                                                background: `linear-gradient(90deg, ${level?.color}, ${level?.color}88)`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="skills-prompt">
                            <ShinyText
                                text="Hover over a key to explore my skills"
                                disabled={false}
                                speed={3}
                                className="skills-prompt-text"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}