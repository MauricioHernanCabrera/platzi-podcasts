import React, { Component } from 'react'
import { Link } from './../routes'
import slug from './../helpers/slug'

export default class PodcastList extends Component {
  render () {
    const { podcasts } = this.props
    
    return (
      <div className="Podcast">
        {
          podcasts.map(podcast => (
            <Link
              route="podcast"
              key={podcast.id}
              params={{
                slugChannel: slug(podcast.channel.title),
                idChannel: podcast.channel.id,
                slug: slug(podcast.title),
                id: podcast.id
              }}
            >
              <a className="Podcast">
                <img
                  src={podcast.urls.post_image.original}
                  alt={podcast.title}
                />
                <h2>{podcast.title}</h2>
                {/* <p>
                  {slug(podcast.channel.title)})
                  {podcast.channel.id})
                  {slug(podcast.title)})
                  {podcast.id})
                </p> */}
              </a>
            </Link>
          ))
        }

        <style jsx>{`
          .Podcast {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }

          a.Podcast {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }

          .Podcast img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
            width: 100%;
          }

          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}