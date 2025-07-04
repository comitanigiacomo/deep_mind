import { useState, useCallback, useEffect } from 'react'
import KeyboardScene from '../components/keyboardScene'
import './Skills.css'
import { useTheme } from '../context/ThemeContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShinyText from '../components/ShinyText';

const keyDescriptions = {
  'key-01': {
    title: 'Under construction 🚧',
    highlights: [
      "Still under construction, stay tuned for cool stuff coming soon!",
      "I'm working on it, but it's not ready yet.",
    ]
  },
  'key-02': {
    title: 'Under construction 🚧',
    highlights: [
      "Still under construction, stay tuned for cool stuff coming soon!",
      "I'm working on it, but it's not ready yet.",
    ]
  },
  'key-03': {
    title: 'Under construction 🚧',
    highlights: [
      "Still under construction, stay tuned for cool stuff coming soon!",
      "I'm working on it, but it's not ready yet.",
    ]
  },
  'key-04': {
    title: 'Under construction 🚧',
    highlights: [
      "Still under construction, stay tuned for cool stuff coming soon!",
      "I'm working on it, but it's not ready yet.",
    ]
  },
  'key-05': {
    title: 'GitHub Actions',
    highlights: [
      "I think it’s awesome to have automation working for you behind the scenes.",
      "I’ve set up a few automated workflows on my GitHub repos, which saved me a ton of time.",
      "It’s like having a little helper doing the boring tasks so I can focus on coding.",
      "I’m definitely planning to explore it further and make my projects more efficient."
    ]
  },
  'key-06': {
    title: 'Kotlin',
    highlights: [
      "I tried Kotlin once to make a simple app and had a blast doing it.",
      "Though I’m still pretty new, I really like its clean syntax and modern features.",
      "I’m eager to keep learning and get more comfortable building real projects.",
      "It’s a fun language, and I think it’s got a lot of potential for my future work."
    ]
  },
  'key-07': {
    title: 'Blender 3D',
    highlights: [
      "I used Blender to create the 3D model of this keyboard, which was super cool.",
      "It was my first real dive into 3D modeling, and I found it really enjoyable.",
      "I’m planning to spend more time with Blender in the future to build more complex models.",
      "It’s amazing how creative you can get with it once you get the hang of the tools."
    ]
  },
  'key-08': {
    title: 'CSS',
    highlights: [
      "CSS is my go-to for styling websites along with HTML.",
      "I enjoy making layouts look clean and responsive on all devices.",
      "It’s satisfying to see a site come alive with good design and smooth animations.",
      "There’s always something new to learn, which keeps it interesting."
    ]
  },
  'key-09': {
    title: 'HTML5',
    highlights: [
      "HTML5 is the backbone of all my web projects, super straightforward but essential.",
      "I use it to structure content clearly and make everything accessible.",
      "It works hand-in-hand with CSS and JavaScript to build interactive sites.",
      "I really appreciate how powerful and flexible it is, even though it looks simple."
    ]
  },
  'key-10': {
    title: 'React',
    highlights: [
      "I build sites like this one with React because it’s intuitive and fast.",
      "React lets me create interactive UIs without too much hassle.",
      "I’ve done a few projects with it and love how reusable components make development easier.",
      "I’m constantly discovering new ways to improve my skills here."
    ]
  },
  'key-11': {
    title: 'LaTeX',
    highlights: [
      "I’ve used LaTeX mainly for making professional-looking notes at university.",
      "It’s great for formatting complex documents with precision.",
      "I’m comfortable with it and appreciate how clean and consistent the output looks.",
      "It might be old-school, but it really makes your work stand out."
    ]
  },
  'key-12': {
    title: 'Typst',
    highlights: [
      "Typst is a newer, more intuitive tool for writing documents, and I really like it.",
      "It feels simpler than LaTeX but still powerful enough for my projects.",
      "I used it for a small project and was impressed by how smooth the experience was.",
      "I’m excited to keep experimenting and see how it can improve my workflow."
    ]
  },
  'key-13': {
    title: 'Docker',
    highlights: [
      "I’ve started looking into Docker but I’m still pretty new to it.",
      "I want to get better at containerizing apps to make deployment easier.",
      "It seems like a game-changer for development and production environments.",
      "Learning Docker feels like the next big step in leveling up my skills."
    ]
  },
  'key-14': {
    title: 'Insomnia',
    highlights: [
      "I used Insomnia for a personal project and found it really handy.",
      "It’s great for testing APIs quickly without fuss.",
      "I appreciate how user-friendly and reliable it is for backend development.",
      "I’m definitely going to keep using it for future projects."
    ]
  },
  'key-15': {
    title: 'Linux',
    highlights: [
      "I’ve been using Linux for about four years now and I love it.",
      "It feels super stable and customizable, which fits perfectly with my workflow.",
      "I’m comfortable navigating the terminal and managing my system.",
      "Linux is definitely my daily driver, and I don’t plan on switching anytime soon."
    ]
  },
  'key-16': {
    title: 'Git',
    highlights: [
      "Git is my absolute favorite for version control — I use it all the time.",
      "I know the main commands well and love how it helps me keep track of changes.",
      "There’s always more to learn, and I’m excited to dive deeper into advanced features.",
      "Versioning code properly just makes development so much smoother and safer."
    ]
  },
  'key-17': {
    title: 'MongoDB',
    highlights: [
      "I used MongoDB for a university project and really liked how flexible it is.",
      "It’s great for handling data that changes often or has no strict schema.",
      "The document-based model feels very natural once you get used to it.",
      "I’m looking forward to working with it more in real-world apps."
    ]
  },
  'key-18': {
    title: 'PostgreSQL',
    highlights: [
      "PostgreSQL isn’t my favorite, but I know my way around it well enough.",
      "I can write queries, manage tables, and handle databases with confidence.",
      "It’s an important skill, even if it’s not the most exciting for me.",
      "Being able to work with both SQL and NoSQL is definitely a plus."
    ]
  },
  'key-19': {
    title: 'Go',
    highlights: [
      "I learned Go during my first year of university programming courses.",
      "I like how simple and fast it is while still being powerful.",
      "It feels solid for backend work and I’m confident using it.",
      "I want to build some personal projects soon to deepen my knowledge."
    ]
  },
  'key-20': {
    title: 'Python',
    highlights: [
      "I use Python a lot for solving coding challenges on LeetCode.",
      "It’s super handy for AI and statistics too, making it really versatile.",
      "I feel pretty confident with it and enjoy writing clean, efficient code.",
      "Python is definitely one of my favorite languages right now."
    ]
  },
  'key-21': {
    title: 'PHP',
    highlights: [
      "I used PHP for the frontend of a personal project.",
      "It’s not my favorite language, but I know how to get the job done well.",
      "It still has its uses and I’m comfortable working with it when needed.",
      "I’m open to improving and maybe exploring alternatives too."
    ]
  },
  'key-22': {
    title: 'C',
    highlights: [
      "I’m currently using C for reverse engineering and security courses at university.",
      "It’s a bit old-school and low-level, but very powerful.",
      "Not my favorite language, but it’s useful and important to know.",
      "I’m learning a lot about how computers really work through it."
    ]
  },
  'key-23': {
    title: 'Java',
    highlights: [
      "I learned Java at university to understand object-oriented programming better.",
      "I want to do a personal project soon to get even better at it.",
      "Java feels solid and versatile for lots of different applications.",
      "I’m excited to keep practicing and building cool stuff with it."
    ]
  },
  'key-24': {
    title: 'JavaScript',
    highlights: [
      "Lately, I’ve been using JavaScript a lot to build websites.",
      "It’s a fun and flexible language that fits perfectly in web development.",
      "I enjoy exploring its many features and improving my skills constantly.",
      "It’s definitely one of the most useful tools in my coding toolbox."
    ]
  },
  'default': {
    title: 'My Tech Stack',
    subtitle: <ShinyText text="Hover over keyboard to learn more about my skills" disabled={false} speed={3} className='custom-class' />,
    highlights: []
  },
  'unknown': {
    title: 'More Skills',
    subtitle: 'This key represents additional capabilities',
    highlights: [
      'Continuous learning approach',
      'Adaptability to new technologies',
      'Focus on best practices',
      'Custom solutions development'
    ]
  }
};


export default function Skills() {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [contentKey, setContentKey] = useState('default')
  const [fadeClass, setFadeClass] = useState('fade-in')
  const { isDarkMode } = useTheme()

  const handleKeyHover = useCallback((keyName) => {
    if (keyName !== contentKey) {
      setFadeClass('fade-out')
      setTimeout(() => {
        setContentKey(keyName || 'default')
        setFadeClass('fade-in')
      }, 200)
    }
  }, [contentKey])

  const { title, subtitle, highlights } =
    keyDescriptions[contentKey] || keyDescriptions['unknown']

  return (
    <section id="skills" className="skills-section">
      <div className="section-title">
        <h2>SKILLS</h2>
        <div className="title-underline"></div>
      </div>

      <Container fluid className="skills-container">
        <Row className="h-100">
          <Col lg={7} className="skills-scene-col px-0">
            <KeyboardScene
              onKeyHover={handleKeyHover}
              fixedRotation={[0.7, 0.5, 0]}
              scale={1.5}
            />
          </Col>

          <Col lg={5} className="skills-text-col">
            <div className={`skills-text-content ${fadeClass}`}>
              <h3 className="skill-main-title">{title}</h3>

              {subtitle && <p className="skill-subtitle">{subtitle}</p>}

              <ul className="skill-highlights">
                {highlights.map((item, index) => (
                    <span>{item}</span>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}