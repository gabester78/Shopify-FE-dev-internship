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

  const [imageDay, setImageDay] = useState("")
  const [singleImageData, setSingleImageData] = useState([]);

  
  const [startDate, setStartDate] = useState(getYesterdayDate)
  const [endDate, setEndDate] = useState("")
  const [multipleImageData, setMultipleImageData] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?&date=${imageDay}&api_key=bYvfakGHRLIWCbWchDF6bsB9Fb336Qg5nJ3UUb2G`
      )
      .then((response) => {
        setSingleImageData(response.data)
      })
      .catch((error) => {
        console.log("the data was not returned", error)
      });
  }, [imageDay])

  // console.log("data", startDate, endDate)

  const fetchDayRange = (e) =>{
    setOpen(true)
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

  return (
    <main>

      <header>

        <section>
          <h1>Spacestagram</h1>
          <p>Made possible by Nasa's Astronomy Picture of the Day API</p>
        </section>

        <section>

          
            <div>
                <label htmlFor="imageDate">Choose a previous date to view</label>
                <input type="date" id="imageDate" max={getCurrentDate()} onChange={(e) => setImageDay(e.target.value)} onClick={() => setOpen(false)}></input>
            </div>

          <div>
            <div>
              <label htmlFor="imageStartDate">Choose a start date</label>
              <input type="date" id="imageStartDate" max={getYesterdayDate()} onChange={(e) => setStartDate(e.target.value)}></input>
            </div>


            <div>
              <label htmlFor="imageEndDate">Choose a end date</label>
              <input type="date" id="imageEndDate" max={getCurrentDate()} onChange={(e) => setEndDate(e.target.value)}></input>
            </div>

            <button type="submit" onClick={fetchDayRange}>Submit range of dates</button>
          </div>


        </section>
      </header>

      {open ? multipleImageData.map((day, index) => {
        return (
        <Photo key={index} data={day} />
        )
        }) : <Photo data={singleImageData}/>}

      {/* {multipleImageData === null && (
        <Photo data={singleImageData}/>
      )}

      {multipleImageData && (multipleImageData.map((day, index) => {

        return (
         <Photo key={index} data={day} />
        )
        })
      )}  */}

      
     
      
    </main>
  )
}

export default PhotoData;