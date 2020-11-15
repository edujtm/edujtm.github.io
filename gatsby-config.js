/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Edu's coding fireplace",
    author: 'Eduardo Macedo',
    url: "https://www.edujtm.me",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
        ignore: [`${__dirname}/content/non-published/**`]
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: 'ignore'
            }
          }
        ]
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        path: `${__dirname}/locales`,
        languages: [`en`, `pt`],
        defaultLanguage: `en`,
        i18nextOptions: {
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          {
            matchPath: '/:lang?/blog/:pageId?',
            getLanguageFromPath: true
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Zilla Slab', 'Noticia Text']
        }
      }
    }
  ]
}
