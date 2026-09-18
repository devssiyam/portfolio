import { useRef } from 'react';
import type { Testimonial } from '../types/content';
import { useCardTilt } from '../hooks/useCardTilt';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useCardTilt(ref);

  return (
    <div ref={ref} className="testimonial-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="testimonial-card__quote">"</div>
      <p className="testimonial-card__text">{testimonial.quote}</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar" style={{ '--av-color': testimonial.avatarColorVar } as React.CSSProperties}>
          {testimonial.avatarInitial}
        </div>
        <div>
          <h4>{testimonial.authorName}</h4>
          <span>{testimonial.authorRole}</span>
        </div>
        <div className="testimonial-card__stars">★★★★★</div>
      </div>
    </div>
  );
}
