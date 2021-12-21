import styled from "styled-components";

const CartIconContainer = styled.div`
  position: relative;

  img {
    vertical-align: middle;
  }

  #badge {
    position: absolute;
    bottom: -9px;
    right: -10px;
    margin: 0px;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.light};
    padding-top: 4px;
    height: 24px;
    width: 24px;
    background: ${({ theme }) => theme.accentWeak};
    border-radius: 100%;
  }
`;

export default CartIconContainer;
