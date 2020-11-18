const fs = require('fs');
const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    const parentFolder = path.dirname(node.fileAbsolutePath).split(path.sep).pop();

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // I'm using the parent folder as the language code
    // This is a hack, but i'll leave it at that until 
    // I know any better
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
              lang
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

  // The available languages are being defined by the locales
  // subfolders, which is kind of a hack
  const localesPath = path.join(__dirname, '/locales');
  const langs = fs.readdirSync(localesPath);

  // Creating pagination pages for blog posts 
  const posts = res.data.allMarkdownRemark.edges;
  const POSTS_PER_PAGES = 10;

  // Create all paths for different locales and pagination
  for (const lang of langs) {
    const localePosts = posts.filter((edge) => edge.node.fields.lang == lang);
    const numPages = Math.ceil(localePosts.length / POSTS_PER_PAGES);

    Array.from({ length: numPages }).forEach((_, i) => {
      const prefix = lang === 'en' ? '' : lang;
      createPage({
        path: i === 0 ? `${prefix}/blog` : `${prefix}/blog/${i + 1}`,
        component: blogListTemplate, 
        context: {
          limit: POSTS_PER_PAGES,
          skip: i * POSTS_PER_PAGES,
          numPages,
          currentPage: i + 1,
          lang,
        }
      });
    });
  }

  // Creating pages for each blog post
  posts.forEach((edge) => {
    const { slug, lang } = edge.node.fields;
    const prefix = lang === 'en' ? '' : lang;

    createPage({
      component: blogTemplate,
      path: `${prefix}/blog/${slug}`,
      context: {
        slug,
        lang
      }
    })
  });
};
