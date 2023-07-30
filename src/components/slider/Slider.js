import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import { useEffect, useState } from "react";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const SliderLength = sliderData.length;

  const autoSlider = true;
  const intervalTime = 4000;
  let slideInterval;

  const nextSlide = () => {
    setCurrentSlide(currentSlide < SliderLength - 1 ? currentSlide + 1 : 0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    if (autoSlider) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, auto, autoSlider, slideInterval]);

  const prevSlide = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : SliderLength - 1);
  };

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slider, index) => {
        const { image, heading, desc } = slider;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            <>
              <img src={image} alt="slide" />
              <div className="content">
                <h2>{heading}</h2>
                <p>{desc}</p>
                <hr />
                <a href="#products" className="--btn --btn-primary">
                  Shop Now
                </a>
              </div>
            </>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
