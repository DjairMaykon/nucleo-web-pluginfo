import { useState } from "react";

type TabsProps = {
  tabs: string[];
  onSelectTab: (tab: string) => void;
  initialTab?: string;
};
export function Tabs({ tabs, initialTab, onSelectTab }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<string>(
    initialTab ? initialTab : tabs[0]
  );

  function handleClick(tab: string) {
    setSelectedTab(tab);
    onSelectTab(tab);
  }
  return (
    <div className="flex rounded-3xl bg-slate-600 w-fit p-2 font-bold">
      {tabs.map((tab, i) => {
        return (
          <a
            key={i}
            onClick={() => handleClick(tab)}
            className={`${
              selectedTab == tab && "bg-slate-300"
            } py-1 px-4 rounded-3xl cursor-pointer`}
          >
            {tab}
          </a>
        );
      })}
    </div>
  );
}
