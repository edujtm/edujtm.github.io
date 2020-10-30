import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Head from '../components/Head';
import blogStyles from '../styles/pages/blog.module.scss';

const getTagsText = (blog) => {
  if (!blog || !blog.tags) return ""; 

  const tagsText = blog.tags.join(' - ');
  return tagsText;
};

const BlogList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {
          fields: [frontmatter___date]
          order: DESC
        } 
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
              tags
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
          <p>{blog.date} | {getTagsText(blog)}</p>
        </Link>
      </li>
    );
  });

  return (
    <Layout>
      <Head title="blog" />
      <h1>Blog</h1>
      <p>Small posts about computer science stuff that I found useful.</p>
      <h2>Recent Posts</h2>
      <ol className={blogStyles.posts}>
        {blogList}
      </ol>
    </Layout>
  );
};

export default BlogList;
