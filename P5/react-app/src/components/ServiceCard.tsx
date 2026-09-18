import { useRef } from 'react';
import type { Service } from '../types/content';
import { useCardTilt } from '../hooks/useCardTilt';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useCardTilt(ref);

  return (
    <div ref={ref} className="service-card" data-aos="fade-up" data-aos-delay={index * 80}>
      <div className="service-card__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
        </svg>
      </div>
      <div className="service-card__number">{service.number}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <ul className="service-card__list">
        {service.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <a href="#contact" className="service-card__link">
        Get Started →
      </a>
    </div>
  );
}
