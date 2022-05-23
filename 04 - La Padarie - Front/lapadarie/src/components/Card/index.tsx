import { ReactElement } from "react";
import "./style.css";

type CardProps = {
  title: string;
  icon: ReactElement;
  value: string;
  bgColor?: string;
  textColor?: string;
};
export function Card({ title, icon, value, bgColor, textColor }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: bgColor ?? "#ffffff",
        color: textColor ?? "#000000",
      }}
      className="card"
    >
      <header>
        <h1>{title}</h1>
        {icon}
      </header>
      <h1>{value}</h1>
    </div>
  );
}
