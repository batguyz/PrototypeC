import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Link from 'gatsby-link'
import Mls from '../components/mls'
import Sheet from '../components/sheet'

class BoardTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBoards')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    console.log(post.mainContent.childContentfulRichText.html)

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className="wrapper">
            <div
              dangerouslySetInnerHTML={{
                __html: post.mainContent.childContentfulRichText.html,
              }}
            />
            <Sheet />
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            />

            {post.sweets !== null && (
              <div>
                <h1>Candy</h1>
                {post.sweets.map((item, x) => (
                  <li key={x}>{item.title}</li>
                ))}
              </div>
            )}

            {post.childBoards !== null && (
              <div>
                <h1>Board</h1>
                <h2>
                  {post.childBoards.map((item, i) => (
                    <li key={i}>
                      <Link key={i} to={`/board/${item.slug}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </h2>
              </div>
            )}
            <h1>MLS Statistics</h1>
            {post.mlsStatistics !== null && (
              <div>
                <h2>
                  {post.mlsStatistics.map((mlsitem, x) => (
                    <li key={x}>
                      <Link key={x} to={`/board/${mlsitem.slug}`}>
                        {mlsitem.title}
                      </Link>
                    </li>
                  ))}
                </h2>
              </div>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BoardTemplate

export const pageQuery = graphql`
  query BoardPostBySlug($id: String!) {
    contentfulBoards(id: { eq: $id }) {
      title
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
        id
        slug
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      childBoards {
        title
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
`
