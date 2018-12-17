import React from "react";
import { StaticQuery, graphql } from "gatsby"


class Sheet extends React.Component {
  state = {}

  render() {
      const data = this.props.sheet.allLettersCsv.edges
      console.log('data-wa',data)


      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>ASCII Value</th>
              </tr>
            </thead>
            {data !== undefined && (
              <tbody>
                {data.map((row, i) => (
                  <tr key={`${row.node.value} ${i}`}>
                    <td>{row.node.letter}</td>
                    <td>{row.node.value}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )
    

  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query CsvQuery {
        site {
          siteMetadata {
            title
          }
        }
        allLettersCsv {
          edges {
            node {
              letter
              value
            }
          }
        }
      }
    `}
    render={data => (
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
        <Sheet sheet={data} />
      </header>
    )}
  />
)