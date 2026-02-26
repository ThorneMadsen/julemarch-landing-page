import Snowfall from 'react-snowfall';
import Hero from './components/Hero/Hero';
import { navContent } from './data/content';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Snowfall
        color="#FFFFFF"
        snowflakeCount={150}
        style={{ position: 'fixed', zIndex: 1 }}
      />
      <a href="#hero" className="skip-to-content">
        {navContent.skipToContentText}
      </a>
      <main>
        <Hero />
      </main>
    </div>
  );
}
