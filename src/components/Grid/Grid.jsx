import PropTypes from "prop-types";
import GridContainer from "./Grid.styled";

function Grid({ children }) {
  return <GridContainer>{children}</GridContainer>;
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
