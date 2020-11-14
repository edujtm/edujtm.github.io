const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    const parentFolder = path.dirname(node.fileAbsolutePath).split(path.sep).pop();

    console.log(`Slug: ${slug}`);
    console.log(`Parent folder: ${parentFolder}`)

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // I'm using the parent folder as the language code
    createNodeField({
      node,
      name: 'lang',
      value: parentFolder,
    });
  }
};

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('./src/templates/Blog.js');
  const blogListTemplate = path.resolve('./src/templates/BlogList.js');

  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (res.errors) {
    reporter.panicOnBuild('Error while running GraphQL queries to generate blog pages');
    return;
  }

  // Creating pagination pages for blog posts 
  const posts = res.data.allMarkdownRemark.edges;
  const POSTS_PER_PAGES = 10;
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGES);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogListTemplate, 
      context: {
        limit: POSTS_PER_PAGES,
        skip: i * POSTS_PER_PAGES,
        numPages,
        currentPage: i + 1,
      }
    });
  });

  // Creating pages for each blog post
  posts.forEach((edge) => {
    const { slug } = edge.node.fields;

    createPage({
      component: blogTemplate,
      path: `/blog/${slug}`,
      context: {
        slug
      }
    })
  });
};
