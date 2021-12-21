import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Container, Controls, Input } from "./QuantitySelector.styled";

function QuantitySelector({
  defaultValue,
  minValue,
  maxValue,
  onChange,
  dark,
  inputName,
  inputID,
}) {
  const [quantity, setQuantity] = useState(defaultValue);

  useEffect(() => {
    onChange(defaultValue);
  }, [onChange, defaultValue]);

  function changeQuantity(value) {
    let newValue = parseInt(value, 10);
    if (Number.isNaN(newValue)) {
      newValue = quantity;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    } else if (newValue < minValue) {
      newValue = minValue;
    }
    if (newValue !== quantity) {
      setQuantity(newValue);
      onChange(newValue);
    }
  }

  return (
    <Container>
      <Input
        value={quantity}
        onChange={(e) => changeQuantity(e.target.value)}
        type="text"
        name={inputName}
        id={inputID}
      />
      <Controls>
        <Button dark={dark} onClick={() => changeQuantity(quantity + 1)}>
          +
        </Button>
        <Button dark={dark} onClick={() => changeQuantity(quantity - 1)}>
          -
        </Button>
      </Controls>
    </Container>
  );
}

QuantitySelector.propTypes = {
  defaultValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
  dark: PropTypes.bool,
  inputName: PropTypes.string,
  inputID: PropTypes.string,
};

QuantitySelector.defaultProps = {
  defaultValue: 1,
  minValue: 1,
  maxValue: Infinity,
  onChange: () => {},
  dark: false,
  inputName: "quantity_input",
  inputID: "quantity_input",
};

export default QuantitySelector;
