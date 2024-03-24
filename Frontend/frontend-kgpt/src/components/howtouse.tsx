import React from "react";
import "./howtouse.css"; // Import the CSS file for styling
import ReactPlayer from "react-player";

const isMobile = window.innerWidth <= 768;
const HowToUse = () => {
    return (
        <div className="how-to-use-container">
            <h1>How to use</h1>
            <div>
                {isMobile ? <ReactPlayer
                    url="https://www.youtube.com/watch?v=6-qId41pN50"
                    width="300px"
                    height="300px"
                    controls
                /> : <ReactPlayer
                    url="https://www.youtube.com/watch?v=6-qId41pN50"
                    controls
                />}

            </div>
        </div >
    );
};

export default HowToUse;
