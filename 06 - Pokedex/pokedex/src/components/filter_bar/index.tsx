import { useState } from "react";
import { POKEMONTYPECOLOR } from "../../utils/constants";
import { FilterBarContainer, FilterInput, FilterLabel } from "./styles";

type FilterBarProps = {
  onChangeTypes: (type: string) => void;
  isTypeSelected: (type: string) => boolean;
};
export function FilterBar({ onChangeTypes, isTypeSelected }: FilterBarProps) {
  return (
    <FilterBarContainer>
      {Object.entries(POKEMONTYPECOLOR).map((type) => (
        <FilterLabel
          style={{
            backgroundColor: type[1].color,
            opacity: isTypeSelected(type[0]) ? "100%" : "50%",
          }}
        >
          <FilterInput
            type="checkbox"
            onClick={(e) => onChangeTypes(type[0])}
          />
          {type[0]}
        </FilterLabel>
      ))}
    </FilterBarContainer>
  );
}
