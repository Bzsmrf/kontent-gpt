import React from "react";
import "./howtouse.css"; // Import the CSS file for styling

const HowToUse = () => {
    return (
        <div className="how-to-use-container">
            <h1>How to use</h1>
            <div className="video-container">
                <video controls>
                    <source src="your-video-file.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default HowToUse;
