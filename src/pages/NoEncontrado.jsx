import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="pagina">
      <h1>Página no encontrada</h1>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" className="boton boton--enlace">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrado
