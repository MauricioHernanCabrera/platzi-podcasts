import Layout from './../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

export default class extends React.Component {

  static async getInitialProps({ query: { id }}) {
    const [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${id}`),
      fetch(`https://api.audioboom.com/channels/${id}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${id}/child_channels`)
    ])

    const [
      { body: { channel } },
      { body: { audio_clips: audioClips } },
      { body: { channels } }
    ] = await Promise.all([
      reqChannel.json(),
      reqAudio.json(),
      reqSeries.json()
    ])

    return {
      channel,
      audioClips,
      channels
    }
  }

  render() {
    const { channel, audioClips, channels } = this.props

    return <Layout title={`Podcasts - Channel: ${channel.title}`}>

      <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

      <h1>{channel.title}</h1>

      <h2>Series</h2>
      <ChannelGrid channels={channels}/>

      <h2>Ultimos Podcasts</h2>
      <PodcastList audioClips={audioClips} />


      <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 30%;
          background-position: 50% 50%;
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
  }
}