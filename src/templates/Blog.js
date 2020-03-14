import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Head from '../components/Head';

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;

const Blog = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;
  return (
    <Layout>
      <Head title={frontmatter.title} />
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </Layout>
  );
};

export default Blog;