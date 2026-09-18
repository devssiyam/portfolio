import SectionHeader from './SectionHeader';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <SectionHeader tag="Client Love" title={<>What Clients <span className="text-accent">Say</span></>} />

        <div className="testimonials__grid">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.authorName} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
