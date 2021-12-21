import { Link } from "react-router-dom";
import styled from "styled-components";

export const CartContainer = styled.div`
  grid-column: 2 / span 4;
  margin-bottom: 30px;
`;

export const Thumbnail = styled.img`
  width: 100px;
`;

export const RemoveButton = styled.button`
  border: none;
  height: 40px;
  width: 40px;
  font-weight: 700;
  font-size: 1.725rem;
  color: ${({ theme }) => theme.light};
  background: ${({ theme }) => theme.darkWeak};
  border-radius: 4px;
`;

export const CheckoutSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const TotalLabel = styled.span`
  font-weight: 700;
  font-size: 1.275rem;
`;

export const TotalPrice = styled.span`
  margin-left: 10px;
  font-weight: 700;
  font-size: 2rem;
  color: ${({ theme }) => theme.accent};
`;

export const CheckoutButton = styled(Link)`
  margin-left: 30px;
  font-weight: 700;
  font-size: 1.275rem;
  background: ${({ theme }) => theme.accentWeak};
  color: ${({ theme }) => theme.light};
  border-radius: 4px;
  width: 200px;
  height: 50px;
  text-align: center;
  padding-top: 13px;
`;

export const NotFound = styled.span`
  display: flex;
  justify-content: center;
  font-size: 1.875rem;
`;
