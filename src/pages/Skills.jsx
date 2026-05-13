import { useCallback, useState, useEffect } from 'react'
import KeyboardScene from '../components/keyboardScene'
import './Skills.css'

export default function Skills() {
    const [scale, setScale] = useState(1.7)

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth <= 480) {
                setScale(1.3)
            } else if (window.innerWidth <= 768) {
                setScale(1.5)
            } else {
                setScale(1.7)
            }
        }

        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [])

    const handleKeyHover = useCallback(() => {}, [])
    const handleKeyClick = useCallback(() => {}, [])

    return (
        <section id="skills" className="skills-section">
            <div className="section-title">
                <h2>SKILLS</h2>
                <div className="title-underline"></div>
            </div>

            <div className="skills-layout">
                <div className="skills-keyboard-area">
                    <KeyboardScene
                        onKeyHover={handleKeyHover}
                        onKeyClick={handleKeyClick}
                        fixedRotation={[0.5, 0.6, 0]}
                        scale={scale}
                    />
                </div>
            </div>
        </section>
    )
}