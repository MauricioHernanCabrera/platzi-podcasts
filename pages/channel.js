import 'isomorphic-fetch'
import React, { Component } from 'react'
import Layout from './../components/Layout'
import ChannelGrid from './../components/ChannelGrid'
// import PodcastList from './../components/PodcastList'
import PodcastListWithClick from './../components/PodcastListWithClick'
import Error from './_error'
import PodcastPlayer from './../components/PodcastPlayer'

export default class extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     openPodcast: null
  //   }
  // }
  state = {
    openPodcast: null
  }

  static async getInitialProps({ res, query: { id }}) {
    try {
      const [reqChannel, reqAudio, reqSeries] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${id}`),
        fetch(`https://api.audioboom.com/channels/${id}/audio_clips`),
        fetch(`https://api.audioboom.com/channels/${id}/child_channels`)
      ])

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status
        return {
          channel: null,
          podcasts: null,
          channels: null,
          statusCode: reqChannel.status
        }
      }
      if (reqAudio.status >= 400) {
        res.statusCode = reqAudio.status
        return {
          channel: null,
          podcasts: null,
          channels: null,
          statusCode: reqAudio.status
        }
      }
      if (reqSeries.status >= 400) {
        res.statusCode = reqSeries.status
        return {
          channel: null,
          podcasts: null,
          channels: null,
          statusCode: reqSeries.status
        }
      }
  
      const [
        { body: { channel } },
        { body: { audio_clips: podcasts } },
        { body: { channels } }
      ] = await Promise.all([
        reqChannel.json(),
        reqAudio.json(),
        reqSeries.json()
      ])
  
      return {
        channel,
        podcasts,
        channels,
        statusCode: 200
      }
    } catch (error) {
      console.log(error)
      res.statusCode = 503

      return {
        channel: null,
        podcasts: null,
        channels: null,
        statusCode: 503
      }
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render () {
    const { channel, podcasts, channels, statusCode } = this.props
    const { openPodcast } = this.state

    if (statusCode !== 200) {
      return (
        <Error statusCode={statusCode} />
      )
    }

    return (
      <Layout title={`Podcasts - Channel: ${channel.title}`}>

        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

        { openPodcast && 
          <PodcastPlayer clip={openPodcast} onClose={this.closePodcast}/>
        }

        <h1>{channel.title}</h1>

        <h2>Series</h2>
        <ChannelGrid channels={channels}/>

        <h2>Ultimos Podcasts</h2>
        <PodcastListWithClick podcasts={podcasts} onClickPodcast={this.openPodcast}/>


        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 30%;
            background-size: cover;
            background-color: #aaa;
          }

          h1 {
            font-weight: 600;
            padding: 0 15px;
            margin: 15px 0;
          }

          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
          }

          h1, h2 {
            text-align: center;
          }

        `}</style>
      </Layout>
    )
  }
}