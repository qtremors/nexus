import Image from 'next/image';
import styles from './Voyager.module.css';

const Voyager = () => {
  return (
    <section className={styles.voyagerContainer}>
      <div className={styles.animationPath}>
        <div className={styles.voyagerShip}>
          <div className={styles.shipIcon}>
            <Image
              src="/voyager.png"
              alt="Voyager"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.shipTooltip}>👾</div>
        </div>
      </div>
    </section>
  );
};

export default Voyager;