import React from "react"
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from "../components/Layout";
import Head from "../components/Head";
import LottieFile from "../components/LottieFile";

import indexStyles from '../styles/pages/index.module.scss';

// Animations
import campDude from  "../animations/camp-guy.json";
import campFire from "../animations/fire-crackling-in-a-campfire.json";

const IndexPage = () => {
  const { t } = useTranslation('home');

  return (
    <Layout>
      <Head title="Home" /> 
      <h1>{t("hello")}</h1>
      <h2>{t('i-am')} <Link to="/about">Eduardo Macedo</Link>, {t('my-place')} </h2>
      <h2>{t('my-goal')}</h2>
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
