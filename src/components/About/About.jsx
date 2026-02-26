import { aboutContent } from '../../data/content';
import { StatCard } from './StatCard';
import styles from './About.module.css';

export default function About() {
  return (
    <section id={aboutContent.sectionId} className={styles.about}>
      <div className={styles.container}>
        <div className={styles['image-placeholder']}>
          <span className={styles['image-label']}>
            {aboutContent.imagePlaceholder}
          </span>
        </div>
        <div className={styles['text-content']}>
          <h2 className={styles.heading}>{aboutContent.heading}</h2>
          <p className={styles.description}>{aboutContent.description}</p>
          <div className={styles.stats}>
            {aboutContent.stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
