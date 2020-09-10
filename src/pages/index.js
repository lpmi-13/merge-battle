import React from "react"
import { LazyImage } from 'react-lazy-images';
import { StaticQuery, graphql } from 'gatsby';

import Layout from "../components/layout"
import SEO from "../components/seo"

const users = ['lpmi-13', 'purcell'];

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Comparing PR counts</h1>
    <p>...only in unique repos not owned by the PR authors</p>
    <p>(was previously a more extensive comparison, but this works for now)</p>

    <div>
      {users.map(user => (
          <LazyImage
              key={user}
              alt="github avatar" 
              src={`https://github.com/${user}.png?size=40`}
              placeholder={({ ref }) => (
                <img ref={ref} src={`https://github.com/github.png?size=40`} alt={"github avatar"} />
              )}
              actual={({ imageProps }) => <img {...imageProps} />}
            />
          )
        )
      }
    </div>
    <StaticQuery
      query={graphql`
        query MyQuery {
          dataJson {
            prs {
              author
              date_time
              repo
            }
          }
        }
      `}
      render={data => (
        data.dataJson.prs.map(item => <div key={item.repo}>author: {item.author} url: {item.repo}</div>)
      )}
    />
  </Layout>
)

export default IndexPage
