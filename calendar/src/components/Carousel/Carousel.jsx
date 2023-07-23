// carousel component
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import image1 from "../../assets/1.jpeg";
import image2 from "../../assets/2.jpeg";
import image3 from "../../assets/3.jpeg";
import image4 from "../../assets/4.jpeg";
import image5 from "../../assets/5.jpeg";

export default function Carousel({ images, duration = 3000 }) {
  const mockImages = [image1, image2, image3, image4, image5];
  images = images || mockImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();

  const moveTo = useCallback((index) => {
    carouselRef.current.style.transform = `translateX(-${index}00%)`;
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveTo((currentIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={"carousel-container"}>
      <div className="carousel-image" ref={carouselRef}>
        {images.map((image, index) => (
          <img src={image} alt="carousel" key={index} />
        ))}
      </div>
      <div className="carousel-indicator">
        {new Array(images.length).fill(0).map((item, index) => (
          <span
            onClick={() => moveTo(index)}
            className={index === currentIndex ? "active" : ""}
            key={index}
          ></span>
        ))}
      </div>
      <div
        className="carousel-button carousel-button--prev"
        onClick={() => moveTo((currentIndex + images.length - 1) % images.length)}
      ></div>
      <div
        className="carousel-button carousel-button--next"
        onClick={() => moveTo((currentIndex + 1) % images.length)}
      ></div>
    </div>
  );
}
