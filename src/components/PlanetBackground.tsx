
import styles from './PlanetBackground.module.css';

const PlanetBackground = () => {
  return (
    <>
      <div className={styles.overlay}></div>
      <img
        src="/moon.png"
        alt="Planet background"
        className={styles.imageBg}
      />
    </>
  );
};

export default PlanetBackground;
