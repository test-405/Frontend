import React, { useState, useId } from "react";
import AddLibrary from "./components/AddLibrary";
import { SearchPage } from "./SearchPage";
import { LibraryPage } from "./LibraryPage";
import { SideBar } from "./components/SideBar";

export default function HomePage() {

  // tab selection for sidebar
  const [activeTab, setActiveTab] = useState('主页');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    console.log(activeTab);
  };

  return (
    <div className="flex">
      <SideBar handleTabClick={handleTabClick} />
      <div className="grow pl-4 pt-4">
        {/* 根据 activeTab 的值显示对应的内容 */}
        {activeTab === '主页' && <SearchPage />}
        {activeTab === '文献库' && <LibraryPage />}
      </div>
    </div>

  )
}