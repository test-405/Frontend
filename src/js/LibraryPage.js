import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { IconButton, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { QUERY_LIBRARY_URL } from './config';
import { TrashIcon, PencilSquareIcon, CheckCircleIcon, } from '@heroicons/react/24/outline'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextField, Checkbox } from '@mui/material';

const Library = () => {
  const [libraries, setLibraries] = useState([]);
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    axios.get(QUERY_LIBRARY_URL, {
      params: {
        page_num: 1,
        page_size: 1,
      }
    })
      .then(response => {
        response = response.data;
        setLibraries([...response.data, {
          library_id: 1,
          topic: 'test',
          desc: 'test',
          is_public: true,
        }]);
        console.log('libraries', libraries)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setLibraries([...libraries, {
      library_id: 1,
      topic: 'test',
      desc: 'test',
      is_public: true,
    }])
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

  console.log('libraries', libraries)
  return (
    <div className="flex flex-col">
      {libraries.length > 0 ? (
        <Fragment className="left-0 right-10">
          {libraries.map(library => (
            <Card className="my-3">
              {/* <Checkbox defaultChecked={library.is_public} className='h-15 w-15' icon={<EyeSlashIcon />} disabled checkedIcon={<EyeIcon />} /> */}
              <CardBody>
                {(
                  editId === library.library_id ? (
                    <div className='flex justify-center gap-5 flex-col'>
                      <div className='flex items-center justify-between'>
                        <TextField label="主题" variant='outlined' size='small' defaultValue={library.topic} />
                        <Checkbox icon={<VisibilityOff/>} checkedIcon={<Visibility/>} checked={library.is_public}/>
                      </div>
                      <TextField label="描述" variant='outlined' size='medium' defaultValue={library.desc} />
                    </div>
                  ) : (
                    <div className='flex justify-center gap-5 flex-col'>
                      <div className='flex items-center justify-between'>
                        <Typography variant="h6" color="gray">{library.topic}</Typography>
                        <Checkbox icon={<VisibilityOff/>} checkedIcon={<Visibility/>} checked={library.is_public} disabled onClick={<></>/* TODO: add function*/}/>
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
                  }
                  else {
                    setEditId(library.library_id)
                  }
                }}>
                  {editId === library.library_id ?
                    <CheckCircleIcon className="h-5 w-5" />
                    :
                    <PencilSquareIcon className="h-5 w-5" />
                  }
                </IconButton>
                <IconButton variant="text" color="blue-gray" className="rounded-full" onClick={() => handleDelete(library.library_id)}>
                  <TrashIcon className="h-5 w-5" />
                </IconButton>
              </CardFooter>
            </Card>
          ))}
        </Fragment>)
        : (
          <div className="flex center">
            <Typography variant="h6" color="gray">暂无文献</Typography>
          </div>
        )}
    </div>
  );
};

export default Library;
