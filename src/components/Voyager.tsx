import Image from 'next/image';
import styles from './Voyager.module.css';

const Voyager = () => {
  return (
    <section className={styles.voyagerContainer}>
      <div className={styles.animationPath}>
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