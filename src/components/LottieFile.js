import React, { createRef, useEffect } from "react";

import lottie from "lottie-web";


const LottieFile = ({ className, animationData, autoplay }) => {
    const animationContainer = createRef(); 

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: animationContainer.current,  
            renderer: "svg",
            loop: true,
            autoplay,
            animationData,
        });

        return () => { animation.destroy() };
    }, [animationContainer, animationData, autoplay]);

    return (
        <div className={className} ref={animationContainer}>
        </div> 
    )
};

LottieFile.defaultProps = {
    autoplay: false,
}

export default LottieFile;
