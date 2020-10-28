import React, { useEffect, createRef } from "react"
import { Link } from 'gatsby';
import lottie from 'lottie-web';

import Layout from "../components/Layout";
import Head from "../components/Head";

import indexStyles from './index.module.scss';

// Animations
import campDude from  "../animations/camp-guy.json";
import campFire from "../animations/fire-crackling-in-a-campfire.json";

const IndexPage = () => {
  let dudeContainer = createRef();
  let campContainer = createRef();

  useEffect(() => {
    const dudeAnim = lottie.loadAnimation({
      container: dudeContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: campDude
    });

    const campAnim = lottie.loadAnimation({
      container: campContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: campFire
    });

    return () => {
      dudeAnim.destroy();
      campAnim.destroy();
    };
  }, [dudeContainer, campContainer]);

  return (
    <Layout>
      <Head title="Home" /> 
      <h1>Hello.</h1>
      <h2>I'm <Link to="/about">Eduardo Macedo</Link>, this is where I sit down and share my thoughts about Coding topics. </h2>
      <h2>Hopefully I'll be able to share useful information to the world, the same way it did for me. </h2>
      <div className={indexStyles.animationContainer}>
        <div className={indexStyles.dudeAnimation} ref={dudeContainer} />
        <div className={indexStyles.campFireAnimation} ref={campContainer} />
      </div>
    </Layout>
  )
};

export default IndexPage;
