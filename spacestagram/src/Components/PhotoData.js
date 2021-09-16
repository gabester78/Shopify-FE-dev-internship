import React, { useState, useEffect } from "react";
import axios from "axios";
import Photo from "./Photo"

const PhotoData = () => {

  const [data, setData] = useState([]);
  // const [photoDate, setPhotoDate] = useState('1990-09-16')
  // date=${photoDate}&

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=bYvfakGHRLIWCbWchDF6bsB9Fb336Qg5nJ3UUb2G`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("the data was not returned", error);
      });
  }, []);

  return (
    <main>

      <header>
        <h1>Spacestagram</h1>
        <p>Made possible by Nasa's Astronomy Picture of the Day API</p>
      </header>

      <Photo data={data}/>
      
    </main>
  );
}

export default PhotoData;