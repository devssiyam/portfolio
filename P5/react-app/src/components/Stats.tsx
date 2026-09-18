import { useEffect } from 'react';
import { stats } from '../data/stats';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

function StatItem({ target, label, index }: { target: number; label: string; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const { value, start, cleanup } = useCountUp(target, 1800);

  useEffect(() => {
    if (inView) start();
    return cleanup;
  }, [inView, start, cleanup]);

  return (
    <div className="stats__item" ref={ref} data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="stats__number">
        <span className="counter">{value}</span>+
      </div>
      <div className="stats__label">{label}</div>
      <div className="stats__bar"></div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats section">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} target={stat.target} label={stat.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
