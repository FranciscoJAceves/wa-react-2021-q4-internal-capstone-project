import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import { defaultTheme } from "./styles/themes";
import { NAVIGATION, URL_PARAMS } from "./utils/constants";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const nothingFound = (
  <h1
    style={{
      gridColumn: "2 / span 4",
      textAlign: "center",
      fontSize: "30px",
      color: "red",
    }}
  >
    There's nothing here!
  </h1>
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path={NAVIGATION.HOME} element={<Home />} />
            <Route path={NAVIGATION.SHOP}>
              <Route index element={<Shop />} />
              <Route path={URL_PARAMS.PRODUCT_ID} element={<Details />} />
            </Route>
            <Route path={NAVIGATION.SEARCH} element={<Search />} />
            <Route path={NAVIGATION.CART} element={<Cart />} />
            <Route path={NAVIGATION.CHECKOUT} element={<Checkout />} />
            <Route path={NAVIGATION.ABOUT} element={<About />} />
            <Route path="*" element={nothingFound} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
