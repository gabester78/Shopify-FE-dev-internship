import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpaceShuttle } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    return (
        <footer>
            <p>©2021 Gabriel Romero</p>
            <FontAwesomeIcon id="shuttle" icon={faSpaceShuttle} />
        </footer>
    )

}

export default Footer