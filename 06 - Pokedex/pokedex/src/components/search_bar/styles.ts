import styled from "styled-components";

export const SearchDiv = styled.div`
  background: #f1f5f9;
  border-radius: 10px;
  padding: 12px 20px;
`;

export const SearchInput = styled.input`
  background: transparent;
  &:placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #94a3b8;
  }
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  background: transparent;
  padding: 4px;
  cursor: pointer;
`;
