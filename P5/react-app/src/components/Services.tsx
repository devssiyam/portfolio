import SectionHeader from './SectionHeader';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="services__bg"></div>
      <div className="container">
        <SectionHeader
          tag="What I Offer"
          title={<>My <span className="text-accent">Services</span></>}
          subtitle="Professional services tailored to grow your online presence"
        />

        <div className="services__grid">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
