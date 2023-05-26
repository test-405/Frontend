import React, { useContext } from 'react';
import TabsContext from '../TabsContext';

function DocTab(value) {
  const { tabs, setTabs, addTab } = useContext(TabsContext);

  addTab({ value: value })
  return (
    // add a doc tab
    <div></div>
  );
}

export default DocTab;
