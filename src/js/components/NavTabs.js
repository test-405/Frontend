import React, { useState, useId } from "react";
import {
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import {
    // HomeIcon,
    // DocumentIcon,
} from "@heroicons/react/24/outline";

import TabsContext from "../TabsContext";

import {
    XMarkIcon
} from "@heroicons/react/20/solid";
export function NavTabs() {
    const { tabs, setTabs } = React.useContext(TabsContext);
    // tabs.push({ value: 'cha', icon: XMarkIcon, id: useId(),})
    const [activeTab, setActiveTab] = useState('主页');
  
    const handleCloseTab = (id) => {
      const index = tabs.findIndex(tab => tab.id === id);
      const newTabs = tabs.filter(tab => tab.id !== id);
      // 默认选中上一个标签页，如果没有上一个标签页，则选中第一个
      const prevTab = index > 0 ? tabs[index - 1].value : newTabs[0]?.value;
      setTabs(newTabs);
      setActiveTab(prevTab);
    };
  
    return (
      <Tabs value={activeTab}>
        <TabsHeader>
          <div className="grid grid-cols-8 gap-2 w-full md:w-1/8">
            {tabs.map(({ value, icon, id }) => (
              <Tab key={id} value={value} className="w-full md:w-1/8 relative">
                <div className="flex justify-start h-full items-center">
                  <div className="flex items-center mr-auto">
                  {React.createElement(icon, { className: "h-5 w-5 mr-2" })}
                  { value }
                  </div>
                  {value !== '主页' && (<button 
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
      </Tabs>
    );
  }
  