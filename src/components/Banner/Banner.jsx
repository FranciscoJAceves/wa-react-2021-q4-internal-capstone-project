import PropTypes from "prop-types";
import {
  BannerContainer,
  BannerCTA,
  BannerSubtitle,
  BannerText,
  BannerTitle,
} from "./Banner.styled";

function Banner({ title, subtitle, text, image }) {
  return (
    <BannerContainer image={image}>
      <BannerCTA>
        <BannerSubtitle>{subtitle}</BannerSubtitle>
        <BannerTitle>{title}</BannerTitle>
        <BannerText>{text}</BannerText>
      </BannerCTA>
    </BannerContainer>
  );
}

Banner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string.isRequired,
};

Banner.defaultProps = { title: "", subtitle: "", text: "" };

export default Banner;
