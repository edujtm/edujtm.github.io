import React from "react"
import { Link } from 'gatsby';

import Layout from "../components/Layout";
import Head from "../components/Head";
import LottieFile from "../components/LottieFile";

import indexStyles from '../styles/pages/index.module.scss';

// Animations
import campDude from  "../animations/camp-guy.json";
import campFire from "../animations/fire-crackling-in-a-campfire.json";

const IndexPage = () => {
    return (
    <Layout>
      <Head title="Home" /> 
      <h1>Hello.</h1>
      <h2>I'm <Link to="/about">Eduardo Macedo</Link>, this is where I sit down and share my thoughts about Coding topics. </h2>
      <h2>Hopefully I'll be able to share useful information to the world, the same way it did for me. </h2>
      <div className={indexStyles.animationContainer}>
        <LottieFile 
          className={indexStyles.dudeAnimation}
          animationData={campDude}
          autoplay
        />
        <LottieFile 
          className={indexStyles.campFireAnimation}
          animationData={campFire}
          autoplay
        />
      </div>
    </Layout>
  )
};

export default IndexPage;
