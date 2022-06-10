import styled from "styled-components";

export const PokedexUl = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
`;

export const PokedexTitle = styled.h1`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 62px;
  letter-spacing: -0.03em;
`;

export const PokedexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
