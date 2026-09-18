import { useRef } from 'react';
import type { Project } from '../types/content';
import { useCardTilt } from '../hooks/useCardTilt';
import { GitHubIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  useCardTilt(ref);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="project-card"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      <div className="project-card__img">
        <div
          className="project-card__placeholder"
          style={{ '--proj-color': project.colorVar } as React.CSSProperties}
        >
          <svg
            viewBox="0 0 80 60"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: project.placeholderSvg }}
          />
        </div>
        <div className="project-card__overlay">
          <span className="project-card__category">{project.category}</span>
        </div>
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-card__actions">
          <a href={project.demoUrl} className="btn btn--primary btn--sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
          <a href={project.repoUrl} className="btn btn--ghost btn--sm">
            <GitHubIcon size={14} />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
