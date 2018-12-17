const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const boardPost = path.resolve('./src/templates/boards.js')
    const sweetsPost = path.resolve('./src/templates/sweets.js')

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulBoards {
              edges {
                node {
                  title
                  id
                  slug
                  mainContent {
                    childContentfulRichText {
                      html
                    }
                  }
                  mlsStatistics {
                    title
                    slug
                  }
                  samtoo {
                    title
                  }
                  sweets {
                    title
                    slug
                    content {
                      childMarkdownRemark {
                        html
                      }
                    }
                  }
                  childBoards {
                    title
                    id
                    slug
                    mainContent {
                      content {
                        content {
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
            allContentfulSweets {
              edges {
                node {
                  title
                  slug
                  id
                  content {
                    childMarkdownRemark {
                      html
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })

        const boards = result.data.allContentfulBoards.edges
        boards.forEach((board, index) => {
          createPage({
            path: `/board/${board.node.slug}/`,
            component: boardPost,
            context: {
              id: board.node.id,
              slug: board.node.slug,
            },
          })
        })

        const sweets = result.data.allContentfulSweets.edges
        sweets.forEach((sweet, index) => {
          createPage({
            path: `/sweet/${sweet.node.slug}/`,
            component: sweetsPost,
            context: {
              id: sweet.node.id,
              slug: sweet.node.slug,
            },
          })
        })
      })
    )
  })
}
