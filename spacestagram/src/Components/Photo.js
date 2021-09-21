import React, {useState} from "react";
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';


const Photo = (props) => {

    const [likeText, setLikeText] = useState(false)
    const [likeButton, setLikeButton] = useState("Like")

    const changeLike = () => {
        if (likeText){
            setLikeText(false)
            setLikeButton("Like")
        } else {
            setLikeText(true)
            setLikeButton("Liked")
        }
    }

    const [shareButton, setShareButton] = useState("Copy URL")
    const [shareURL, setShareURL] = useState({
        value: "https://shopify-fe-dev-internship-npp295qd0-gabester78.vercel.app/",
        copied: false,
    })

    const changeShare = () => {
        setShareButton("Copied")
    }

    return (
        <article>

            <section className="dataImage">
                {props.data.media_type === 'image' ? <img src={props.data.url} alt="Nasa's Astronomy view of the day"/> :
                <ReactPlayer url={props.data.url} width={'100%'} controls={true} style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px", overflow:"hidden", boxShadow: "0px 0px 20px #676767"}}/>}
            </section>
            
            <section className="dataDetails">
                <div>
                    <h3>{props.data.title}</h3>
                    <time>{props.data.date}</time>
                </div>
                {props.data.copyright && (
                    <h5>Copyright by: {props.data.copyright}</h5>
                    //Inline If with Logical && Operator since not every photo may contain a copyright
                )}
                <p>{props.data.explanation}</p>
                
                <article className="interactionContainer">

                    <div onClick={changeLike}>
                        <FontAwesomeIcon id="icons" icon={faHeart} />
                        <p>{likeButton}</p>
                    </div>

                    <CopyToClipboard onCopy={() => setShareURL({copied: true})} text={shareURL.value}>
                    <div onClick={changeShare} className="blue"> 
                        <FontAwesomeIcon id="icons" icon={faShare} />
                        <p>{shareButton}</p>
                        
                    </div>
                    </CopyToClipboard>
                    
                </article>

            </section>

        </article>
  );
}

export default Photo;