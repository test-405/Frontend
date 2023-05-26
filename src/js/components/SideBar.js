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
    // PresentationChartBarIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { XMarkIcon } from "@heroicons/react/20/solid";
import TabsContext from "../TabsContext";
import { useId } from "react";

export function SideBar() {
  const { width, ref } = useResizeDetector();
  const [showText, setShowText] = useState(true);
  useEffect(() => {
    if (width < 250) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  }, [width]);

  return (
    <Card ref={ref} className="static top-0 left-0 h-screen w-1/5 xs-4 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          {showText && 'Dashboard'}
        </ListItem>
      </List>
    </Card>
  );
}
