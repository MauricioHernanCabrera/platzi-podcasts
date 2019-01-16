export default class extends React.Component {
  render () {
    return <div className="Index">
      
      <img src="/static/platzi-logo.png" alt="Logo de platzi"/>

      <div className="Container">
        <h1>Curso de Next.js</h1>
        <p>Styled JSX</p>
      </div>
      
      {/* Limitado a solo el componente */}
      <style jsx>{`
        {/* h1 {
          color: red;
        } */}
        
        // poder acceder a los estilos de un componente y modificarlo
        {/* div :global(p) {
          color: green;
        } */}

        .Index {
          padding: 30px 0;
        }

        .Container {
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }

        img {
          max-width: 200px;
          display: block;
          margin: 0 auto;
        }

        h1 {
          font-size: 48px;
          font-weight: 300;
        }

        p {
          font-size: 18px;
        }
      `}</style>

      {/* Sin limitaciones */}
      <style jsx global>{`
        body {
          background: #1a2a35;
          color: white;
          font-family: Helvetica;
        }
      `}</style>
    </div>
  }
}