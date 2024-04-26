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
                    url="https://youtu.be/tGSBVagQdeM"
                    width="300px"
                    height="300px"
                    controls
                /> : <ReactPlayer
                    url="https://youtu.be/tGSBVagQdeM"
                    controls
                />}

            </div>
        </div >
    );
};

export default HowToUse;
