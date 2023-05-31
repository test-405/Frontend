import React, { useState, useId } from "react";
import AddLibrary from "./components/AddLibrary";
import { SearchPage } from "./SearchPage";
import { LibraryPage } from "./LibraryPage";
import { SideBar } from "./components/SideBar";

export default function HomePage() {

  // tab selection for sidebar
  const [selectedSideTab, setSelectedSideTab] = useState('主页');

  const handleTabClick = (tabName) => {
    setSelectedSideTab(tabName);
    console.log(selectedSideTab);
  };

  return (
    <div className="flex">
      <SideBar handleTabClick={handleTabClick} />
      <div className="grow pl-4 pt-4">
        {/* 根据 selectedSideTab 的值显示对应的内容 */}
        {selectedSideTab === '主页' && <SearchPage />}
        {selectedSideTab === '文献库' && <LibraryPage />}
      </div>
    </div>

  )
}