import React from "react";
import ReactPlayer from 'react-player'

const Photo = (props) => {

    return (
        <article>

            <section className="dataImage">
                {props.data.media_type === 'image' && (
                    <img src={props.data.url} alt="Nasa's Astronomy view of the day"/>
                )}

                {props.data.media_type === 'video' && (
                    <ReactPlayer url={props.data.url} width={'100%'} controls={true} style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px", overflow:"hidden"}}/>
                )}
            </section>
            
            <section className="dataDetails">
                <div>
                    <h3>{props.data.title}</h3>
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