import { Link } from "react-router-dom";
import { calcularRecomendaciones } from "../utils/recomendaciones.js";

export function DetalleNutricional({ registro, mostrarBotonVolver = true }) {
  const recomendaciones = calcularRecomendaciones(registro);

  return (
    <>
      <p className="saludo">Hola, {registro.nombre}.</p>

      <h2>Resumen del registro</h2>
      <dl className="resumen">
        <dt>Nombre</dt>
        <dd>{registro.nombre}</dd>
        <dt>Correo</dt>
        <dd>{registro.correo}</dd>
        <dt>Edad</dt>
        <dd>{registro.edad}</dd>
        <dt>Peso</dt>
        <dd>{registro.peso} kg</dd>
        <dt>Fecha</dt>
        <dd>{registro.fecha}</dd>
        <dt>Tipo de comida</dt>
        <dd>{registro.tipoComida}</dd>
        <dt>Descripción</dt>
        <dd>{registro.descripcion}</dd>
        <dt>Calorías</dt>
        <dd>{registro.calorias}</dd>
        <dt>Vasos de agua</dt>
        <dd>{registro.vasosAgua}</dd>
        <dt>Actividad física</dt>
        <dd>{registro.actividadFisica}</dd>
      </dl>

      <h2>Recomendaciones</h2>
      {recomendaciones.length === 0 ? (
        <p>Las recomendaciones se calcularán a partir de tus datos.</p>
      ) : (
        <ul className="recomendaciones">
          {recomendaciones.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ul>
      )}

      {mostrarBotonVolver ? (
        <Link to="/" className="boton boton--enlace">
          Nuevo registro
        </Link>
      ) : null}
    </>
  );
}

export default DetalleNutricional;
