import 'isomorphic-fetch'

export default class extends React.Component {
  static async getInitialProps () {
    let req = await fetch('https://api.audioboom.com/channels/recommended')
    let { body: channels } = await req.json()
    return { channels }
  }

  render () {
    const { channels } = this.props

    console.log(channels)

    return <div>
      <header>Podcasts</header>
      
      <div className="channels">
        { channels.map((channel) => 
          <div
            className="channel"
            key={channel.id}>
            <img src={channel.urls.logo_image.original} alt={`Imagen de ${channel.title}`}/>
            <h2>{channel.title}</h2>
          </div>
        )}
      </div>
      
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