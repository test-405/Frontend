// import { Button } from "@material-tailwind/react";
import { NavTabs } from "./js/components/NavTabs"
import { DocTab } from "./js/components/DocTab"
import TabsContext from "./js/TabsContext"
import React, { useState, useId } from "react";
import {
  HomeIcon,
  // XMarkIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import './index.css'

export default function App() {
  const [tabs, setTabs] = useState([
    { value: '主页', icon: HomeIcon, id: useId() },
    { value: 'document', icon: DocumentIcon, id: useId() },
    { value: 'time', icon: DocumentIcon, id: useId() },
    { value: 'abcd', icon: DocumentIcon, id: useId() },
  ]);
  const addTab = (newTab) => {
    setTabs(oldTabs => [...oldTabs, newTab]);
  }

  return (
    // <div className="w-1/5 h-full bg-gray-500">
    <div className="relative">
      <div className="fixed sticky left-0 top-0">
        <TabsContext.Provider value={{ tabs, setTabs, addTab }}>
          <NavTabs />
          {/* FIXME: 不能同时开NavTabs喝DocTab，需要在后续引入文档时更新逻辑并引入DocTab */}
          {/* <SideBar /> */}
          {/* <DocTab /> */}
        </TabsContext.Provider>
      </div>
      <div className="relative sticky left=0 top-0">
      </div>
    </div>
  )

}