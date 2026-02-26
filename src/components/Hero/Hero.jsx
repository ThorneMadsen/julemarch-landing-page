import useCountdown from '../../hooks/useCountdown';
import { heroContent } from '../../data/content';
import styles from './Hero.module.css';

export function CountdownUnit({ value, label }) {
  return (
    <div className={styles['countdown-unit']}>
      <span className={styles['countdown-value']}>
        {String(value).padStart(2, '0')}
      </span>
      <span className={styles['countdown-label']}>{label}</span>
    </div>
  );
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(heroContent.eventDate);
  const units = heroContent.countdownUnits;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{heroContent.heading}</h1>
        <p className={styles.subheading}>{heroContent.subheading}</p>
        <a href={heroContent.ctaHref} className={styles.cta}>
          {heroContent.ctaText}
        </a>
        <div className={styles.countdown} aria-label={heroContent.countdownLabel}>
          <p className={styles['countdown-heading']}>{heroContent.countdownLabel}</p>
          <div className={styles['countdown-units']}>
            <CountdownUnit value={days} label={units.days} />
            <CountdownUnit value={hours} label={units.hours} />
            <CountdownUnit value={minutes} label={units.minutes} />
            <CountdownUnit value={seconds} label={units.seconds} />
          </div>
        </div>
      </div>
    </section>
  );
}
