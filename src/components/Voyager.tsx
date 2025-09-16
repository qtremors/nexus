
import styles from './Voyager.module.css';

const Voyager = () => {
  return (
    <section className={styles.voyagerContainer}>
      <div className={styles.animationPath}>
        <svg
          viewBox="-200 0 1200 300"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.motionPathSvg}
        >
          <path
            id="voyager-motion-path"
            d="M -100,100 C 200,300 600,300 900,100"
            stroke="none"
            fill="none"
          />
        </svg>

        <div className={styles.voyagerShip}>
          <div className={styles.shipIcon}>🛰️</div>
          <div className={styles.shipTooltip}>Voyager 1</div>
        </div>
      </div>
    </section>
  );
};

export default Voyager;