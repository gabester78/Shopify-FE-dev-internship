import React, { useState, useEffect } from "react";
import axios from "axios";
import Photo from "./Photo"

const PhotoData = (props) => {

  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var formattedMonth = month < 10 ? '0' + month : '' + month

    return year + '-' + formattedMonth + '-' + date;
  }

  const getYesterdayDate = () => {

    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var formattedMonth = month < 10 ? '0' + month : '' + month

    return year + '-' + formattedMonth + '-' + date;
  }


  const [singleImageData, setSingleImageData] = useState([]);
  const [defaultDay, setDefaultDay] = useState(true)

  const [imageDay, setImageDay] = useState("")
  const [newSingleImageData, setNewSingleImageData] = useState([]);
  const [singleDay, setSingleDay] = useState(false)
  
  const [startDate, setStartDate] = useState(getYesterdayDate)
  const [endDate, setEndDate] = useState("")
  const [multipleImageData, setMultipleImageData] = useState([])
  const [switchDisplayType, setSwitchDisplayType] = useState(false)

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?&api_key=bYvfakGHRLIWCbWchDF6bsB9Fb336Qg5nJ3UUb2G`
      )
      .then((response) => {
        setSingleImageData(response.data)
      })
      .catch((error) => {
        console.log("the data was not returned", error)
      });
  }, [imageDay])

  const fetchDayRange = (e) =>{
    setSwitchDisplayType(true)
    setDefaultDay(false)
    e.preventDefault();
    axios
    .get(
      `https://api.nasa.gov/planetary/apod?&start_date=${startDate}&end_date=${endDate}&api_key=bYvfakGHRLIWCbWchDF6bsB9Fb336Qg5nJ3UUb2G`
      )
      .then((response) => {
        setMultipleImageData(response.data)
      })
      .catch((error) => {
        console.log("the data was not returned", error)
      });
  }

  const fetchSingleDay = (e) =>{
    setSwitchDisplayType(false)
    setDefaultDay(false)
    setSingleDay(true)
    e.preventDefault();
    axios
    .get(
      `https://api.nasa.gov/planetary/apod?&date=${imageDay}&api_key=bYvfakGHRLIWCbWchDF6bsB9Fb336Qg5nJ3UUb2G`
      )
      .then((response) => {
        setNewSingleImageData(response.data)
      })
      .catch((error) => {
        console.log("the data was not returned", error)
      });
  }

  return (
    <main>

      <header>

          <h1>Spacestagram</h1>
          <p>Nasa's Astronomy Picture of the Day API</p>

      </header>

      <article className="datesContainer">

          <label htmlFor="imageDate">Choose a previous date to view</label>
          <input type="date" id="imageDate" max={getCurrentDate()} onChange={(e) => setImageDay(e.target.value)}></input>
          <button onClick={fetchSingleDay}>Submit date</button>
          <p className="divider">Or choose a range of dates to view</p>

          <div className="rangeContainer">
            <label htmlFor="imageStartDate">Choose a start date</label>
            <input className="startDate" type="date" id="imageStartDate" max={getYesterdayDate()} onChange={(e) => setStartDate(e.target.value)}></input>
            <label htmlFor="imageEndDate">Choose a end date</label>
            <input type="date" id="imageEndDate" max={getCurrentDate()} onChange={(e) => setEndDate(e.target.value)}></input>
            <button onClick={fetchDayRange}>Submit range of dates</button>
          </div>

      </article>

      {defaultDay && (<Photo data={singleImageData}/>)}
      {/* Displays current day's image */}

      {singleDay && (<Photo data={newSingleImageData}/>)}
      {/* Displays selected day image */}

      {switchDisplayType && (multipleImageData.map((day, index) => {
        return (
        <Photo key={index} data={day} />
        )
        }))
      }
      {/* Displays images from range of dates */}

    </main>
  )
}

export default PhotoData;