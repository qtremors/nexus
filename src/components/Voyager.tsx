import Image from 'next/image';
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
          <div className={styles.shipIcon}>
            <Image
              src="/voyager1.png"
              alt="Voyager 1 space probe"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.shipTooltip}>For Fun</div>
        </div>
      </div>
    </section>
  );
};

export default Voyager;