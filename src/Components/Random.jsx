import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Axios from 'axios';


const Random = () => {
  const [gif, setGif] = useState('');

  const fetchData = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    // console.log(process.env.REACT_APP_API_KEY);
    const result = await Axios(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`, {
      params: {
        // limit: "5"
      }
    });
    // console.log(result);
    setGif(result.data.data);
    const imageSrc = result.data.data.images.fixed_height.url;
      // console.log(result.data.data.images);
    setGif(imageSrc);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClick = () => {
    fetchData();
  }

  return (
    <div>
    <h1>Random</h1>
    <Container className="col text-center" fluid>
      <img src={gif} alt="Random GIF"/>
      <br />
      <br />
      <Button variant="warning" onClick={handleClick}>Randomize!</Button>
    </Container>
    </div>
  )
}

export default Random