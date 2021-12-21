import { useLocation } from "react-router";
import { useState } from "react";
import { NAVIGATION } from "../../utils/constants";
import {
  Header,
  Icon,
  Icons,
  Logo,
  Page,
  Pages,
  SearchBar,
} from "./Navigation.styled";
import LogoSVG from "../../images/logo.svg";
import SearchSVG from "../../images/search.svg";
import UserSVG from "../../images/user.svg";
import CartIcon from "../CartIcon";

export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  return (
    <Header>
      <nav>
        <Logo to="/">
          <img src={LogoSVG} alt="Logo" />
        </Logo>
        <Pages>
          <Page
            to={NAVIGATION.HOME}
            className={location.pathname === "/" && "active"}
          >
            Home
          </Page>
          <Page to={NAVIGATION.SHOP} state={{ page: 1 }}>
            Shop
          </Page>
          <Page to={NAVIGATION.ABOUT}>About</Page>
        </Pages>
        <Icons>
          <SearchBar
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document.getElementById("searchButton").click();
                setSearchTerm("");
              }
            }}
          />
          <Icon
            onClick={() => setSearchTerm("")}
            to={`${NAVIGATION.SEARCH}?q=${searchTerm}`}
            id="searchButton"
          >
            <img src={SearchSVG} alt="Search" />
          </Icon>
          <Icon to={NAVIGATION.CART}>
            <CartIcon />
          </Icon>
          <img src={UserSVG} alt="User" />
        </Icons>
      </nav>
    </Header>
  );
}
