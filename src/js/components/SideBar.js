import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import TabsContext from "../TabsContext";
import { useId } from "react";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";

export function SideBar({ handleTabClick }) {
  const { width, ref } = useResizeDetector();
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (width < 125) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  }, [width]);

  return (
        <Card ref={ref} className="top-0 left-0 h-screen w-1/6 xs-4 p-4 shadow-xl shadow-blue-gray-900/5">
          <List>
            <ListItem onClick={()=>handleTabClick('主页')}>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              {showText && '主页'}
            </ListItem>
            <ListItem onClick={()=>handleTabClick('文献库')}>
              <ListItemPrefix>
                <BookOpenIcon className="h-5 w-5" />
              </ListItemPrefix>
              {showText && '文献库'}
            </ListItem>
          </List>
        </Card>
  );
}
