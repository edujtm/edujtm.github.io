import React from "react"
import { Link } from 'gatsby';

import Layout from "../components/Layout";
import Head from "../components/Head";

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" /> 
      <h1>Hello.</h1>
      <h2>I'm <Link to="/about">Eduardo Macedo</Link>, this is where I sit down and share my thoughts about Coding topics. </h2>
      <h2>Hopefully I'll be able to share useful information to the world, the same way it did for me. </h2>
    </Layout>
  )
};

export default IndexPage;