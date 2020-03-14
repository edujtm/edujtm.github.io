import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Head from '../components/Head';
import blogStyles from './blog.module.scss';

const BlogPage = () => {

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const blogs = data.allMarkdownRemark.edges.map(edge => {
    const { frontmatter, fields: { slug } } = edge.node;
    return { ...frontmatter, slug };
  });

  const blogList = blogs.map(blog => {
    return (
      <li className={blogStyles.post} key={blog.title}>
        <Link to={`/blog/${blog.slug}`}>
          <h3>{blog.title}</h3>
          <p>{blog.date}</p>
        </Link>
      </li>
    );
  });

  return (
    <Layout>
      <Head title="blog" />
      <h1>Blog</h1>
      <p>lorem ipsum dolom amen eh nois</p>
      <h2>Recent Posts</h2>
      <ol className={blogStyles.posts}>
        {blogList}
      </ol>
    </Layout>
  );
};

export default BlogPage;