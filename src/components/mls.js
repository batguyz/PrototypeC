import React from "react"
import { StaticQuery, graphql } from "gatsby"
import get from 'lodash/get'

class Table extends React.Component {
    state = {}

    render() {
        const data = this.props.table.allContentfulBoards.edges
        console.log('data-wa',data)


        const itemList = data.map(item => {
            console.log('test',item.node.title)
            return (
                <div>
                    <p>{item.node.title}</p>
                </div>
            )
           
        })
        return(
            <div>
                <h1>{itemList}</h1>
               
            </div>
        )

    }
}

export default () => (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
          allContentfulBoards {
            edges {
              node {
                title
              }
            }
          }
        }
      `}
      render={data => (
        <header>
          <h1>{data.site.siteMetadata.title}</h1>
          <Table table={data} />
        </header>
      )}
    />
  )