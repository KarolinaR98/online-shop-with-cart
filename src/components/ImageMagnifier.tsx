import { useState } from "react";
import styles from "./ImageMagnifier.module.css";

type ImageMagnifierProps = {
  imageUrl: string;
};

const ImageMagnifier = (props: ImageMagnifierProps) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);

  const handleOnMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div className={styles.magnifierContainer}>
      <img
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={(e) => handleOnMouseMove(e)}
        className={styles.img}
        src={props.imageUrl}
        alt={props.imageUrl}
      />
     {showMagnifier && <div className={styles.magnifierImageContainer}>
        <div
          className={styles.magnifierImage}
          style={{
            backgroundImage: `url(${props.imageUrl})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        ></div>
      </div>}
    </div>
  );
};

export default ImageMagnifier;
