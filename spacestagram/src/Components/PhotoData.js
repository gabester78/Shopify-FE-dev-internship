import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoData = () => {

  const [data, setData] = useState([]);
  

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?&api_key=bYvfakGHRLIWCbWchDF6bsB9Fb336Qg5nJ3UUb2G`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("the data was not returned", error);
      });
  }, []);

  console.log("data------>", data);

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}

export default PhotoData;