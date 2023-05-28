import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardFooter, Button, Typography } from "@material-tailwind/react";
import { LIBRARY_URL } from './config';

const Library = () => {
  const [libraries, setLibraries] = useState([]);
  // console.log('libraries', libraries)
  useEffect(() => {
    axios.get(LIBRARY_URL, {
      params: {
        page_num: 1,
        page_size: 1,
      }})
      .then(response => {
        response = response.data;
        console.log(response)
        console.log('data', response.data)
        setLibraries(response.data);
        console.log('libraries', libraries)
      })
      .catch(error => {
        console.error(error);
      });
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

  return (
      <div className="grid grid-cols-4 gap-4 grow auto-cols-max auto-rows-max">
        { libraries > 0 ? libraries.map(library => (
          <div>
          <Card key={library.id} className="mb-4">
            <CardBody>
              <Typography variant="h6" color="gray">{library.topic}</Typography>
              <Typography variant="paragraph" color="gray">{library.desc}</Typography>
            </CardBody>
            <CardFooter>
              <Button color="red" onClick={() => handleDelete(library.id)}>删除</Button>
            </CardFooter>
          </Card>
          </div>
        )) : (
          <div className="flex center">
            <Typography variant="h6" color="gray">暂无文献</Typography>
          </div>
        )}
      </div>
  );
};

export default Library;
