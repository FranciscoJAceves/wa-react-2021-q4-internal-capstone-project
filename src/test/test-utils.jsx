import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import defaultTheme from "../styles/themes";
import { CartProvider } from "../contexts/CartContext";
import GlobalStyle from "../globalStyle";

function AllProviders({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
