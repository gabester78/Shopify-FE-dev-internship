import React from "react";

const Photo = (props) => {

    return (
        <article>

            <img src={props.data.url} alt="Nasa's Astronomy view of the day"/>
            
            <section>
                <div>
                    <h2>{props.data.title}</h2>
                    <time dateTime={props.data.date}>{props.data.date}</time>
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