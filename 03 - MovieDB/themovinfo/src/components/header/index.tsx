import Logo from "../../assets/logo.svg?component";
import { ToogleMode } from "./components/toogleMode";

export function Header() {
  return (
    <header className="bg-slate-500 px-6 py-4 flex items-center justify-between">
      <h1 className="h-fit">
        <Logo width="80" height="fit-content" />
      </h1>
      <ToogleMode />
    </header>
  );
}
