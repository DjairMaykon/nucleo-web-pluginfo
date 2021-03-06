import styled from "styled-components";

export const PokecardSkeleton = styled.article`
  width: 324px;
  height: 168px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;

export const PokecardArticle = styled.article`
  display: flex;
  gap: 36px;
  padding: 24px;
  border-radius: 24px;
`;

export const PokecardContent = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PokecardTitle = styled.h2`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: -0.04em;
  color: #1e293b;
`;

export const PokecardTypesUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PokecardTypesLi = styled.li`
  width: fit-content;
  padding: 4px 8px;
  border-radius: 50px;

  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;
`;
