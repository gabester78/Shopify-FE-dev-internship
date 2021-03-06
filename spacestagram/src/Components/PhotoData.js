import React, { useState, useEffect } from "react";
import axios from "axios";
import Photo from "./Photo";
import Footer from "./Footer";

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
  const [dateError, setDateError] = useState(false) 

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
    if (startDate > endDate){
      setDateError(true)
    } else {
    setDateError(false)
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

        <section className="singeDateContainer">
          <label htmlFor="imageDate">Choose a previous date to view</label>
          <input className="singeDateInput" type="date" id="imageDate" max={getCurrentDate()} onChange={(e) => setImageDay(e.target.value)}/>
          <button className="blue" onClick={fetchSingleDay}>Submit date</button>
        </section>

          <p className="divider">Or choose a range of dates to view</p>

        <section className="rangeContainer">
          <label htmlFor="imageStartDate">Choose a start date</label>
          <input className="startDate rangeDate" type="date" id="imageStartDate" max={getYesterdayDate()} onChange={(e) => setStartDate(e.target.value)} />
          <label htmlFor="imageEndDate">Choose a end date</label>
          <input className="rangeDate" type="date" id="imageEndDate" max={getCurrentDate()} onChange={(e) => setEndDate(e.target.value)} />
              
          <div>
            <button className="blue" onClick={fetchDayRange}>Submit range of dates</button>
            {dateError && (
              <div className="errorContainer">
                <p id="errorMessage">The start date can not be higher than the end date.</p>
              </div>)
            }
          </div>
        </section>

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

      <Footer />
    </main>
  )
}

export default PhotoData;