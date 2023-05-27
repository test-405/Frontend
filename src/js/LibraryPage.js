import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardFooter, Button, Typography } from "@material-tailwind/react";

const Library = () => {
  let [libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios.get('/api/library')
      .then(response => {
        setLibraries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  libraries = [
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
    {
      "id": "string",
      "topic": "string",
      "desc": "string",
      "is_public": true
    },
  ];
  console.log('libraries', libraries)

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
        {libraries.map(library => (
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
        ))}
      </div>
  );
};

export default Library;
