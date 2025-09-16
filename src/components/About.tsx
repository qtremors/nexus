// components/About.tsx

import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.description}>
          As a Computer Science Engineering graduate, I thrive on building efficient and user-centric applications. My approach is rooted in a methodical debugging process and a proactive focus on best practices for code quality and security. I enjoy pragmatic problem-solving and believe in direct, clear communication to achieve project goals.
        </p>
        <div className={styles.skills}>
          <h3 className={styles.skillsTitle}>Core Strengths:</h3>
          <ul className={styles.skillsList}>
            <li>Methodical Debugging</li>
            <li>Code Quality & Best Practices</li>
            <li>Pragmatic Problem-Solving</li>
            <li>Iterative (Build-Test-Refine) Workflow</li>
            <li>User Experience Focus</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;