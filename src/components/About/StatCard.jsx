import styles from './About.module.css';

export function StatCard({ value, label }) {
  return (
    <div className={styles['stat-card']}>
      <span className={styles['stat-value']}>{value}</span>
      <span className={styles['stat-label']}>{label}</span>
    </div>
  );
}
