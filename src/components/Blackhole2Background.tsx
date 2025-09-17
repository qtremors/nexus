// components/Blackhole2Background.tsx

import styles from './Blackhole2Background.module.css';

const Blackhole2Background = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={styles.videoBgBottom}
    >
      <source src="/blackhole2.webm" type="video/webm" />
    </video>
  );
};

export default Blackhole2Background;