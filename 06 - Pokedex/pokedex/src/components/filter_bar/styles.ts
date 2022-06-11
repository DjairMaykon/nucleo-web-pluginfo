import styled from "styled-components";

export const FilterBarContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FilterLabel = styled.label`
  padding: 4px 8px;
  border-radius: 50px;

  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  cursor: pointer;
  display: flex;
  gap: 2px;
`;

export const FilterInput = styled.input`
  display: none;
`;
