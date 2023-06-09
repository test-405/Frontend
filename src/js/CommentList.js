import React, { useState, useEffect } from 'react';
import { ADD_COMMENT_URL, QUERY_COMMENT_URL, DELETE_COMMENT_URL } from './config';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
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

import { LinkIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function CommentList({ paper_id }) {
  const [comments, setComments] = useState([]);
  const [openStatus, setOpenStatus] = useState({});   // map from comment_id to open status
  const [reloadComments, setReloadComments] = useState(false);  // reload comments when this is true

  const handleOpen = (comment_id) => {
    setOpenStatus((prevStatus) => ({
      ...prevStatus,
      [comment_id]: !prevStatus[comment_id],
    }));
  };

  const fetchComments = async () => {
    const token = Cookies.get('authToken');
    axios.get(QUERY_COMMENT_URL, {
      params: {
        page_num: 1,
        page_size: 10,
        paper_id: paper_id,
      },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        response = response.data;
        console.log(response.data.comments)
        setComments([...response.data.comments]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (reloadComments) {
      fetchComments();
      setReloadComments(false);
    }
  }, [reloadComments]);

  // new comment
  const [newComment, setNewComment] = useState(null);

  const handleAddComment = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await axios.post(ADD_COMMENT_URL, {
            content: newComment,
            paper_id: paper_id,
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        if (response.status === 200 && response.data['code'] === 0) {
          console.log('添加评论成功');
          console.log(response);

          setNewComment('');
          setReloadComments(true);
        } else {
          console.log('添加评论失败');
          console.log(response);
        }
    } catch (error) {
        console.log("添加评论成失败");
        console.error(error);
    }
  }
  // end new comment

  // delete comment
  const handleDeleteComment = (comment_id) => async (e) => {
    e.stopPropagation();
    try {
        const token = Cookies.get('authToken');
        const delete_url = DELETE_COMMENT_URL + `/${comment_id}`
        const response = await axios.delete(delete_url, {
          withCredentials: true,
          headers: {
              Authorization: `Bearer ${token}`,
          },
        }
        );

        if (response.status === 200 && response.data.code === 0) {
          console.log('删除评论成功');

          setReloadComments(true);
        } else {
          console.log('删除评论失败');
          console.log(response);
        }
    } catch (error) {
        console.log("删除评论失败");
        console.error(error);
    }
  }

  // end delete comment

  return (

    <Card className="grow flex relative" id="wanrui">
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
                      {comment.username}
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
            <ListItemSuffix>
              {
                openStatus[comment.comment_id] && 
                comment.is_yours && 
                (
                <div onClick={handleDeleteComment(comment.comment_id)}>
                  <TrashIcon className='top-10 right-0 w-6 h-6'>
                  </TrashIcon>
                </div>
                )
              }
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      <div className="static w-full">
        <CardFooter style={{ position: 'fixed', bottom: 0, width: "20%" }}>
          <Textarea variant="static" placeholder="Your Comment" rows={8} value={newComment} required onChange={(e) => { setNewComment(e.target.value) }}/>
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
              <Button size="sm" className="rounded-md" disabled={!newComment || newComment.length == 0} onClick={handleAddComment}>
                Post Comment
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}