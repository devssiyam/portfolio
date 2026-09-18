import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeader
          tag="My Work"
          title={<>Featured <span className="text-accent">Projects</span></>}
          subtitle="A selection of real-world projects I've built and designed"
        />

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
