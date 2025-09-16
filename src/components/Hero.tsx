// components/Hero.tsx

import styles from './Hero.module.css';

const Hero = () => {
  return (
    // The heroContainer now acts as a 100vh tall spacer
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to the Void</h1>
        {/* <p className={styles.subtitle}>Explore the mysteries of the universe.</p> */}
        {/* <button className={styles.ctaButton}>Discover More</button> */}
      </div>
    </section>
  );
};

export default Hero;