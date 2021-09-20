import React from "react";
import ReactPlayer from 'react-player'

const Photo = (props) => {
    
    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var formattedMonth =  month < 10 ? '0' + month : '' + month

        return year + '-' + formattedMonth + '-' + date;
    }

    return (
        <article>

            <section className="dataImage">
                {props.data.media_type === 'image' && (
                    <img src={props.data.url} alt="Nasa's Astronomy view of the day"/>
                )}

                {props.data.media_type === 'video' && (
                    <ReactPlayer url={props.data.url} width={'100%'} controls={true} style={{marginBottom:"-20px"}}/>  
                )}
            </section>
            
            <section className="dataDetails">
                <div>
                    <h2>{props.data.title}</h2>
                    <time>{props.data.date}</time>
                </div>
                {props.data.copyright && (
                    <h3>Copyright by: {props.data.copyright}</h3>
                    //Inline If with Logical && Operator since not every photo may contain a copyright
                )}

                <p>{props.data.explanation}</p>
                <button>Like</button>
            </section>

        </article>
  );
}

export default Photo;