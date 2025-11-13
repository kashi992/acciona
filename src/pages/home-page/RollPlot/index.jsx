import React from "react";
import { Link } from "react-router-dom";
const RollPlot = () => {
    return (
        <div className="heroWrap">
             <iframe className="flex flex-1" src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/12_11_ALIGNMENT ROLL PLOT.pdf" frameborder="0"></iframe>
                  <Link to='/home'
                            className="backButton cursor-pointer absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                        >
                         Main Menu 
                        </Link>
        </div>
    );
};

export default RollPlot;
