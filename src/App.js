import { NavTabs } from "./js/components/NavTabs"
import { SideBar } from "./js/components/SideBar";
import React, { useState, useId } from "react";
import HomePage from "./js/HomePage";
import LibraryPage from "./js/LibraryPage";

import './index.css'

export default function App() {

  const [activeTab, setActiveTab] = useState('主页');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    console.log(activeTab);
  };

  return (
    <div className="relative">
      <div className="sticky left-0 top-0">
        <NavTabs />
        {/* FIXME: 不能同时开NavTabs喝DocTab，需要在后续引入文档时更新逻辑并引入DocTab */}
        {/* <DocTab /> */}
        <div className="flex">
          <SideBar handleTabClick={handleTabClick} />
          <div className="grow pl-4 pt-4">
            {/* 根据 activeTab 的值显示对应的内容 */}
            {activeTab === '主页' && <HomePage />}
            {activeTab === '文献库' && <LibraryPage />}

          </div>
        </div>
      </div>
    </div>
  );

}