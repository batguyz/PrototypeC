import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Link from "gatsby-link";
import Sheet from '../components/sheet'
import Hero from '../components/hero'
import Mls from '../components/mls'


class SweetTemplate extends React.Component {
  render() {
    const sweet = get(this.props, "data.contentfulSweets");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const [author] = get(this, 'props.data.allContentfulPerson.edges')


    return (
      <Layout location={this.props.location} >
      <div style={{ background: "#fff" }}>
        <Helmet title={`${sweet.title} | ${siteTitle}`} />
        <div className="wrapper">
          <h1 className="section-headline">{sweet.title}</h1>
          <p
            style={{
              display: "block"
            }}
          />
          see: <Mls/>
          <Sheet />
          hero <Hero data={author.node} />

          <h4>
            {/* <Link to={sweet.sweets[0].slug}>{sweet.sweets[0].title} </Link> */}
          </h4>
          <div
            dangerouslySetInnerHTML={{
              __html: sweet.content.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
      </Layout>
    );
  }
}

export default SweetTemplate;

export const pageQuery = graphql`
  query SweetPostBySlug($id: String!) {
    contentfulSweets(id: { eq: $id }) {
      title
      slug
      id
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
