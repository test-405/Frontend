import React, { useContext, createContext, useState, useId } from 'react';
import { PDFViewer } from './components/DocTab'
import HomePage from './HomePage'

import {
    HomeIcon,
    DocumentIcon,
} from "@heroicons/react/24/outline";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
    const [tabs, setTabs] = useState([
        { value: '导航页', icon: HomeIcon, id: useId(), tabType: TabTypeEnum.Home, tabBody: <HomePage /> },
        { value: 'test', icon: DocumentIcon, id: useId(), tabType: TabTypeEnum.Paper, tabBody: <PDFViewer fileName="test"/> },
    ]);

    const addTab = (newTab) => {
        setTabs(oldTabs => [...oldTabs, newTab]);
    }

    return (
        <TabsContext.Provider value={{ tabs, setTabs, addTab }}>
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
})
