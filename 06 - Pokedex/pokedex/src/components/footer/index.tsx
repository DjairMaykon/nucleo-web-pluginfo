import styled from "styled-components";

export function Footer() {
  const FooterStyled = styled.footer`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.2px;
    color: #5f3305;

    text-align: center;
  `;

  return (
    <FooterStyled>
      Com <span role="img">💛</span> Info Jr UFBA 2022
    </FooterStyled>
  );
}
