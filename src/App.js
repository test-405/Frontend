import { NavTabs } from "./js/components/NavTabs"
import { SideBar } from "./js/components/SideBar";
import React, { useState } from "react";
import HomePage from "./js/HomePage";
import { LibraryPage } from "./js/LibraryPage";
import { TabsProvider, useTabs } from './js/TabsContext'; // Assuming this is the correct path to TabsContext.js
import { SearchPage } from "./js/SearchPage";

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
    setOpenTab(tabName);
  };

  return (
    <TabsProvider>
      <div className="relative">
        <div className="sticky left-0 top-0">
          <NavTabs activeTab={openTab} setActiveTab={handleTabChange}/>
        </div>
      </div>
    </TabsProvider>
  );
}
