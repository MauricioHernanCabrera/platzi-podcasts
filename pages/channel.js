import 'isomorphic-fetch'

export default class extends React.Component {
  static async getInitialProps ({ query: { id }}) {
    const [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${id}`),
      fetch(`https://api.audioboom.com/channels/${id}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${id}/child_channels`)
    ])

    const [
      { body: { channel }},
      { body: { audio_clips: audioClips }},
      { body: { channels: series }}
    ] = await Promise.all([
      reqChannel.json(),
      reqAudio.json(),
      reqSeries.json()
    ])
    
    return {
      channel,
      audioClips,
      series
    }
  }
  
  render () {
    const {
      channel,
      audioClips,
      series
    } = this.props
    console.log(this.props)

    return <div>
      <header>Podcasts</header>
      
      <h1>{channel.title}</h1>
      {
        audioClips.map((clip) => {
          return <div key={clip.id}>{clip.title}</div>
        })
      }

      <h2>Ultimos podcasts</h2>
      {
        series.map((serie) => {
          return <div key={serie.id}>{serie.title}</div>
        })
      }


      {/* <div className="channels">
        {channels.map((channel) =>
          <Link href={`/channel?id=${channel.id}`} prefetch key={channel.id}>
            <a className="channel">
              <img src={channel.urls.logo_image.original} alt={`Imagen de ${channel.title}`} />
              <h2>{channel.title}</h2>
            </a>
          </Link>
        )}
      </div> */}

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
        }
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
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

      {/* Sin limitaciones */}
      <style jsx global>{`
        body {
          background: white;
          margin: 0;
          font-family: system-ui;
          text-align: center;
        }
      `}</style>
    </div>
  }
}