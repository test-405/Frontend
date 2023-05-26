// TabsContext.js
import React from 'react';

const TabsContext = React.createContext({
    tabs: [],
    setTabs: () => {},
    addTab: () => {},
});

export default TabsContext;
