import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { CartProvider } from "./contexts/CartContext";
import GlobalStyle from "./globalStyle";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import defaultTheme from "./styles/themes";
import { NAVIGATION, URL_PARAMS } from "./utils/constants";

const nothingFound = (
  <h1
    style={{
      gridColumn: "2 / span 4",
      textAlign: "center",
      fontSize: "30px",
      color: "red",
    }}
  >
    There&apos;s nothing here!
  </h1>
);

function App() {
  return (
    <main>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <CartProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
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
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;
