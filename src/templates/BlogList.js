import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Head from '../components/Head';
import PaginationFooter from '../components/PaginationFooter';
import blogStyles from '../styles/pages/blog.module.scss';

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
      limit: $limit
      skip: $skip
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
`

const getTagsText = (blog) => {
  if (!blog || !blog.tags) return ""; 

  const tagsText = blog.tags.join(' - ');
  return tagsText;
};

const BlogList = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
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
      <PaginationFooter 
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  );
};

export default BlogList;
