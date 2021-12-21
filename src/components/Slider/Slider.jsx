import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { SliderButton, SliderControls } from "./Slider.styled";

function Slider({ contentList, autoPlaySeconds, startFrom }) {
  const [active, setActive] = useState(startFrom);

  const nextSlide = useCallback(() => {
    setActive((currentActive) =>
      currentActive + 1 === contentList.length ? 0 : currentActive + 1
    );
  }, [contentList]);

  const previousSlide = useCallback(() => {
    setActive((currentActive) =>
      currentActive - 1 < 0 ? contentList.length - 1 : currentActive - 1
    );
  }, [contentList]);

  useEffect(() => {
    if (autoPlaySeconds > 0) {
      const timerId = setInterval(nextSlide, autoPlaySeconds);
      return () => clearInterval(timerId);
    }
    return undefined;
  });

  const sliderMarks = contentList.map(({ id }, index) => (
    <SliderButton onClick={() => setActive(index)} key={id}>
      {active === index ? "●" : "○"}
    </SliderButton>
  ));

  return (
    <>
      {contentList[active].content}
      <SliderControls>
        <SliderButton onClick={previousSlide}>{"<"}</SliderButton>
        {sliderMarks}
        <SliderButton onClick={nextSlide}>{">"}</SliderButton>
      </SliderControls>
    </>
  );
}

Slider.propTypes = {
  contentList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, content: PropTypes.node })
  ).isRequired,
  autoPlaySeconds: PropTypes.number,
  startFrom: PropTypes.number,
};

Slider.defaultProps = { autoPlaySeconds: 0, startFrom: 0 };

export default Slider;
