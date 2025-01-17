import styled from "styled-components";
import { Link } from "react-router-dom";

export const FeaturedProductsContainer = styled.div`
  grid-column: 2 / span 4;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

export const FeaturedProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const FeaturedProductsTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
`;

export const FeaturedProductsOption = styled.span`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  background: ${({ theme, active }) =>
    active ? theme.accentWeak : theme.light};

  :not(:first-child) {
    margin-left: 10px;
  }
`;

export const ViewAllButton = styled(Link)`
  align-self: center;
  margin: 30px 0px;
  width: 300px;
  height: 50px;
  background: transparent;
  color: ${({ theme }) => theme.accent};
  border-color: ${({ theme }) => theme.accent};
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.125rem;
  text-align: center;
  padding: 11.5px;
`;
