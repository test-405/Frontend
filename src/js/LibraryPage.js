import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { IconButton, Typography, Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { QUERY_LIBRARY_URL } from './config';
import { TrashIcon, PencilSquareIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextField, Checkbox } from '@mui/material';

import AddLibrary from "./components/AddLibrary";

export const LibraryPage = () => {
  const [libraries, setLibraries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newTopic, setNewTopic] = useState(null);
  const [newDesc, setNewDesc] = useState(null);
  const [newIsPublic, setNewIsPublic] = useState(null);
  const [showNoLibrary, setShowNoLibrary] = useState(true);

  useEffect(() => {
    axios.get(QUERY_LIBRARY_URL, {
      params: {
        page_num: 1,
        page_size: 10,  // from 1 to 10 展示多个libraries
      }
    })
      .then(response => {
        response = response.data;
        // add a new library to libraries
        setLibraries([...response.data.libraries]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // setLibraries([...libraries, {
    //   library_id: 1,
    //   topic: 'test',
    //   desc: 'test',
    //   is_public: true,
    // }])
  }, []);


  const handleDelete = (id) => {
    axios.delete(`/api/library/${id}`)
      .then(response => {
        setLibraries(libraries.filter(library => library.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = (id) => {
    // first find the library with the id
    const library = libraries.find(library => library.id === id);
    // find the differences between the library and the new library
    // if there is no difference, then do nothing
    // if there is difference, then update the library
    let newLibrary = {};
    if (library.topic !== newTopic) {
      newLibrary.topic = newTopic;
    }
    if (library.desc !== newDesc) {
      newLibrary.desc = newDesc;
    }
    if (library.is_public !== newIsPublic) {
      newLibrary.is_public = newIsPublic;
    }
    if (newTopic || newDesc || newIsPublic) {
      axios.put(`/api/library/${id}`, newLibrary)
        .then(response => {
          setLibraries(libraries.map(library => {
            if (library.id === id) {
              library.topic = newTopic;
              library.desc = newDesc;
              library.is_public = newIsPublic;
            }
            return library;
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      {libraries.length > 0 ? (
        <div className="flex flex-col">
          <Fragment>
            {libraries.map(library => (
              <Card className="my-3">
                <CardBody>
                  {(
                    editId === library.library_id ? (
                      <div className='flex justify-center gap-5 flex-col'>
                        <div className='flex items-center justify-between'>
                          <TextField label="主题" variant='outlined' size='small' defaultValue={library.topic} onChange={(e) => {
                            setNewTopic(e.target.value)
                          }} />
                          <Checkbox icon={<VisibilityOff />} checkedIcon={<Visibility />} checked={newIsPublic} onChange={
                            () => {
                              setNewIsPublic(!newIsPublic)
                            }
                          } />
                        </div>
                        <TextField label="描述" variant='outlined' size='medium' defaultValue={library.desc} onChange={(e) => {
                          setNewDesc(e.target.value)
                        }} />
                      </div>
                    ) : (
                      <div className='flex justify-center gap-5 flex-col'>
                        <div className='flex items-center justify-between'>
                          <Typography variant="h6" color="gray" as="a"
                            href="javascript:void(0)" onClick={() => { console.log('clicked') }}>{library.topic}</Typography>
                          <Checkbox icon={<VisibilityOff />} checkedIcon={<Visibility />} checked={library.is_public} disabled />
                        </div>
                        <Typography variant="paragraph" color="gray">{library.desc}</Typography>
                      </div>
                    )
                  )}
                </CardBody>
                <CardFooter className="flex items-center justify-between">
                  <IconButton variant="text" color="blue-gray" className="rounded-full" onClick={() => {
                    if (editId === library.library_id) {
                      setEditId(null)
                      console.log('clear')
                      console.log(newTopic)
                      console.log(newDesc)
                      console.log(newIsPublic)
                      setNewTopic(null)
                      setNewDesc(null)
                      setNewIsPublic(null)
                    }
                    else {
                      setEditId(library.library_id)
                      setNewTopic(library.topic)
                      setNewDesc(library.desc)
                      setNewIsPublic(library.is_public)
                      console.log('set editting')
                      console.log(newTopic)
                      console.log(newDesc)
                      console.log(newIsPublic)
                    }
                  }}>
                    {editId === library.library_id ?
                      <XMarkIcon className="h-5 w-5" />
                      :
                      <PencilSquareIcon className="h-5 w-5" />
                    }
                  </IconButton>
                  {
                    editId === library.library_id ?
                      <IconButton variant="text" color="blue-gray" className="rounded-full" onClick={() => {
                        setEditId(null)
                        handleEdit(library.library_id)
                      }}>
                        <CheckCircleIcon className="h-5 w-5" />
                      </IconButton>
                      :
                      <IconButton variant="text" color="blue-gray" className="rounded-full" onClick={() => { handleDelete(library.library_id) }}>
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                  }
                </CardFooter>
              </Card>
            ))}
          </Fragment>
        </div>)
        : (
          <div>{
            showNoLibrary ?
              <Card className="mt-6 w-96">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    暂无文献库
                  </Typography>
                  <Typography>
                    您可以创建一个文献库，或者向其他人申请加入他们的文献库。
                  </Typography>
                </CardBody>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => { setShowNoLibrary(false); }}>关闭</Button>
                </CardFooter>
              </Card>
              : null}
          </div>
        )}
      < AddLibrary className="right-0" />
    </div>
  );
};

