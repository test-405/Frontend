import { NavTabs } from "./js/components/NavTabs"
import { SideBar } from "./js/components/SideBar";
import React, { useState } from "react";
import HomePage from "./js/HomePage";
import LibraryPage from "./js/LibraryPage";
import PaperPage from "./js/PaperPage";

export default function App() {

  // tab selection for sidebar
  const [activeTab, setActiveTab] = useState('主页');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    console.log(activeTab);
  };

  // tab selection for navbars
  const [openTab, setOpenTab] = useState("导航页");
  const handleTabChange = (tabName) => {
    console.log(tabName);
    setOpenTab(tabName);
  };

  return (
    <div className="relative">
      <div className="sticky left-0 top-0">
        <NavTabs activeTab={openTab} setActiveTab={handleTabChange}/>
        { openTab === '导航页' ? <div className="flex">
          <SideBar handleTabClick={handleTabClick} />
          <div className="grow pl-4 pt-4">
            {/* 根据 activeTab 的值显示对应的内容 */}
            {activeTab === '主页' && <HomePage />}
            {activeTab === '文献库' && <LibraryPage />}
            {activeTab === 'test_paper' && <PaperPage />}
          </div>
        </div>:<></>}
      </div>
    </div>
  );

}