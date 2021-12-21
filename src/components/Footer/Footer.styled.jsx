import styled from "styled-components";

const FooterContainer = styled.footer`
  grid-column: 1 / span 6;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 60px;
  background: ${({ theme }) => theme.accentWeak};

  span {
    font-size: 0.875rem;
    font-style: italic;
    color: ${({ theme }) => theme.darkWeak};
    margin: 0 10px 5px 0;
  }
`;

export default FooterContainer;
