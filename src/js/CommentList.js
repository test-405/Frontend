import React, { useState, useEffect } from 'react';
import { QUERY_COMMENT_URL } from './config';
import axios from 'axios';

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  CardFooter,
  Button,
  Fragment,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Textarea,
  IconButton
} from "@material-tailwind/react";

import { Divider } from '@mui/material';

import { LinkIcon } from '@heroicons/react/24/outline'

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [openStatus, setOpenStatus] = useState({});   // map from comment_id to open status

  const handleOpen = (comment_id) => {
    setOpenStatus((prevStatus) => ({
      ...prevStatus,
      [comment_id]: !prevStatus[comment_id],
    }));
  };

  useEffect(() => {
    axios.get(QUERY_COMMENT_URL, {
      params: {
        page_num: 1,
        page_size: 10,  // from 1 to 10
        paper_id: 1, //FIXME 这个参数应从library入口传入
      }
    })
      .then(response => {
        response = response.data;
        console.log(response.data.comments)
        setComments([...response.data.comments, {
          comment_id: 1,
          content: 'test_content',
          time: 'test_time',
          username: 'test_user',
          // is_markdown: true,
        }]);
        // console.log('comments', comments)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setComments([...comments, {
      comment_id: 1,
      content: 'test_content',
      time: 'test_time',
      // is_markdown: true,
    }])
  }, []);

  return (

    <Card className="grow flex relative">
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.comment_id}>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="https://q.qlogo.cn/g?b=qq&nk=272786724&s=100" />
            </ListItemPrefix>
            <div>

              <Accordion open={openStatus[comment.comment_id]}>
                <AccordionHeader onClick={() => handleOpen(comment.comment_id)} className="grow">
                  <div className='flex flex-col justify-between grow'>
                    <Typography variant="h6" color="blue-gray">
                      {comment.username}12312413541345124
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {comment.time}
                    </Typography>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {comment.content}
                </AccordionBody>
              </Accordion>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="static w-full">
        <CardFooter style={{ position: 'fixed', bottom: 0, width: "20%" }}>
          <Textarea variant="static" placeholder="Your Comment" rows={8} />
          <div className="w-full flex justify-between py-1.5">
            <IconButton variant="text" color="blue-gray" size="sm">
              <LinkIcon strokeWidth={2} className="w-4 h-4" />
            </IconButton>
            <div className="flex gap-2">
              <Button
                size="sm"
                color="red"
                variant="text"
                className="rounded-md"
              >
                Cancel
              </Button>
              <Button size="sm" className="rounded-md">Post Comment</Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}