import SectionHeader from './SectionHeader';
import SkillCard from './SkillCard';
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="skills__bg"></div>
      <div className="container">
        <SectionHeader
          tag="What I Know"
          title={<>My <span className="text-accent">Skills</span></>}
          subtitle="Technologies and tools I work with to bring ideas to life"
        />

        <div className="skills__grid" data-aos="fade-up">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
