import styled from "styled-components";
import { PokedexLogo } from "../../assets/PokedexLogo";

type HeaderProps = {
  onClickLogo: () => void;
};
export function Header({ onClickLogo }: HeaderProps) {
  const DivLogo = styled.div`
    cursor: pointer;
    svg {
      transition: ease-in-out all 1s;
    }
    svg:hover {
      transform: rotate(540deg);
    }
  `;

  return (
    <header>
      <DivLogo onClick={onClickLogo}>
        <PokedexLogo />
      </DivLogo>
    </header>
  );
}
