import {
  Card,
  Typography,
  CardFooter,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
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
    <Card ref={ref} className="top-0 left-0 h-screen w-1/6 xs-4 p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col">
      <List className="flex-grow">
        <ListItem onClick={() => handleTabClick('主页')}>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          {showText && '主页'}
        </ListItem>
        <ListItem onClick={() => handleTabClick('文献库')}>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          {showText && '文献库'}
        </ListItem>
      </List>
      <List>
        <ListItem className="mb-0" onClick={() => handleTabClick('用户设置')}>
          <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="https://q.qlogo.cn/g?b=qq&nk=272786724&s=100" />
            </ListItemPrefix>
          {showText && '用户设置'}
        </ListItem>
        <ListItem className="mb-0">
        </ListItem>
        <ListItem className="mb-0">
        </ListItem>
      </List>
    </Card>
  );
}
