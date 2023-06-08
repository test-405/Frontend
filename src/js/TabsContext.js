import React, { useContext, createContext, useState, useId } from 'react';
import { DocTab } from './components/DocTab'
import HomePage from './HomePage'
import { PaperPage } from './PaperPage'

import {
    HomeIcon,
    DocumentIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
    const [tabs, setTabs] = useState([
        { value: '导航页', icon: HomeIcon, id: '0', tabType: TabTypeEnum.Home, tabBody: <HomePage /> },
        { value: 'test', icon: DocumentIcon, id: 'paper:0', tabType: TabTypeEnum.Paper, tabBody: <DocTab fileName="test"/> },
        { value: 'paper', icon: BuildingLibraryIcon, id: 'library:0', tabType:  TabTypeEnum.PaperList, tabBody: <PaperPage library_id={1} />}
    ]);

    const addTab = (newTab) => {
        setTabs(oldTabs => [...oldTabs, newTab]);
    }
    
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <TabsContext.Provider value={{ tabs, setTabs, addTab, activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
}

export const useTabs = () => {
    return useContext(TabsContext);
}

export const TabTypeEnum = Object.freeze({
  Home: 0,
  Library: 1,
  Paper: 2,
  PaperList: 3,
})
