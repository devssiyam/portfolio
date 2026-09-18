import type { CSSProperties } from 'react';
import type { Skill } from '../types/content';
import { useInView } from '../hooks/useInView';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

/**
 * Merges modules 8 (skill bar width animation) and 16 (IntersectionObserver
 * stagger reveal) into one useInView-backed component, per
 * MIGRATION-PLAN.md §5 — avoiding a second parallel observer.
 *
 * Module 16 in the original set opacity/transform directly via inline
 * style (not a CSS class) with a per-card transition-delay of `i * 60ms`;
 * that exact inline-style approach is replicated here rather than inventing
 * a new CSS class, since `.skill-card` has no such rule in style.css.
 * Module 8's bar fill keeps its own `i * 80ms` stagger and reads
 * `skill.width` (kept distinct from the displayed `skill.percent`, exactly
 * as authored — see AUDIT.md).
 */
export default function SkillCard({ skill, index }: SkillCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  const cardStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
  };

  return (
    <div ref={ref} className="skill-card" style={cardStyle} data-aos="zoom-in" data-aos-delay={index * 60}>
      <div className="skill-card__icon" style={{ '--skill-color': skill.colorVar } as CSSProperties}>
        <svg viewBox={skill.iconViewBox} xmlns="http://www.w3.org/2000/svg" fill={skill.fillOnSvg ? 'currentColor' : undefined}>
          {skill.iconPaths.map((d, i) => (
            <path key={i} d={d} fill={skill.fillOnSvg ? undefined : 'currentColor'} />
          ))}
        </svg>
      </div>
      <h3 className="skill-card__name">{skill.name}</h3>
      <div className="skill-card__bar">
        <div
          className="skill-card__fill"
          style={
            {
              width: inView ? `${skill.width}%` : '0%',
              transitionDelay: `${index * 80}ms`,
              '--skill-color': skill.colorVar,
            } as CSSProperties
          }
        ></div>
      </div>
      <span className="skill-card__percent">{skill.percent}%</span>
    </div>
  );
}
