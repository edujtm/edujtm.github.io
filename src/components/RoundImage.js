import React from "react";
import Img from "gatsby-image";

import layoutStyles from "../styles/components/RoundImage.module.scss";

const RoundImage = ({ fixed, alt }) => {
  return (
    <div>
    <Img 
      className={layoutStyles.roundImage} 
      fixed={fixed} 
      alt={alt} 
    />
    </div>
  );
};

export default RoundImage;
