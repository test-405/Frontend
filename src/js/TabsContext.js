import React, { useContext, createContext, useState, useId } from 'react';
import { DocTab } from './components/DocTab'
import HomePage from './HomePage'
import { PaperPage } from './PaperPage'

import {
    HomeIcon,
    DocumentIcon,
} from "@heroicons/react/24/outline";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
    const [tabs, setTabs] = useState([
        { value: '导航页', icon: HomeIcon, id: useId(), tabType: TabTypeEnum.Home, tabBody: <HomePage /> },
        { value: 'test', icon: DocumentIcon, id: useId(), tabType: TabTypeEnum.Paper, tabBody: <DocTab fileName="test"/> },
        { value: 'paper', icon: DocumentIcon, id: useId(), tabType:  TabTypeEnum.PaperList, tabBody: <PaperPage />}
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
