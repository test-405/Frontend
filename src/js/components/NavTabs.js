import React, { useState, useId } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {
  HomeIcon,
  // XMarkIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { useTabs, TabTypeEnum } from "../TabsContext";

import {
  XMarkIcon
} from "@heroicons/react/20/solid";

import { PDFViewer } from './DocTab'


export function NavTabs({ activeTab, setActiveTab }) {
  const { tabs, setTabs, addTab } = useTabs();

  const [selectedTab, setSelectedTab] = useState(tabs[0]?.value);

  const handleCloseTab = (id) => {
    const index = tabs.findIndex(tab => tab.id === id);
    const newTabs = tabs.filter(tab => tab.id !== id);
    // 默认选中上一个标签页，如果没有上一个标签页，则选中第一个
    const prevTab = index > 0 ? tabs[index - 1].value : newTabs[0]?.value;
    setTabs(newTabs);
    setActiveTab(prevTab);
  };

  const handleTabChange = (tabName) => {
    console.log('tab changed:', tabName);
    setSelectedTab(tabName);
    setActiveTab(tabName);
  };

  return (
    <div>
      <Tabs value={activeTab}>
        <TabsHeader>
          <div className="grid grid-cols-8 gap-2 w-full md:w-1/8">
            {tabs.map(({ value, icon, id, tabType }) => (
              <Tab key={id} value={value} className="w-full md:w-1/8 relative" onClick={() => handleTabChange(value)}>
                <div className="flex justify-start h-full items-center">
                  <div className="flex items-center mr-auto">
                    {React.createElement(icon, { className: "h-5 w-5 mr-2" })}
                    <p className="line-clamp-1 lg:line-clamp-none">{value}</p>
                  </div>
                  {tabType !== TabTypeEnum.Home && (<button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:shadow-md"
                    onClick={() => handleCloseTab(id)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>)}
                </div>
              </Tab>
            ))}
          </div>
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, id, tabBody }) => (
            <TabPanel key={id} value={value}>
              {tabBody}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
