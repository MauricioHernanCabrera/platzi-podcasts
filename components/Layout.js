import React, { Component } from 'react'
import { Link } from './../routes'
import Head from 'next/head'

export default class Layout extends Component {
  render () {
    const { children, title } = this.props
    
    return (
      <div>
        <Head>
          <title>{ title }</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta charSet="UTF-8"/>
        </Head>
        
        <header>
          <Link route="index">
            <a>Podcasts</a>
          </Link>
        </header>

        { children }
        
        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
          }
          header a {
            color: #fff;
            text-decoration: none;
          }
        `}</style>

        <style jsx global>{`
          body {
            background: white;
            margin: 0;
            font-family: system-ui;
            text-align: center;
          }

          
        `}</style>
      </div>
    )
  }
}