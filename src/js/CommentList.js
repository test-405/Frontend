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
} from "@material-tailwind/react";

export default function CommentList() {
  const [comments, setComments] = useState([]);
  // const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get(QUERY_COMMENT_URL, {
      params: {
        page_num: 1,
        page_size: 10,  // from 1 to 10 展示多个libraries
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
    <Card className="w-96">
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.comment_id}>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {comment.content}
              </Typography>
              <Typography variant="h6" color="blue-gray">
                {comment.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {comment.time}
              </Typography>
            </div>
          </ListItem>
        ))}
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Candice Wu
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Software Engineer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>

      </List>
    </Card>
  );
}