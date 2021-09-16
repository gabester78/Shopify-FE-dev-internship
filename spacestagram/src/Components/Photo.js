import React from "react";

const Photo = (props) => {

    return (
        <article>

            <header>
                <h1>Spacestagram</h1>
                <p>Made possible by Nasa's Astronomy Picture of the Day API</p>
            </header>

            <section>
                <img src={props.data.url} alt="Nasa's Astronomy view of the day"/>
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