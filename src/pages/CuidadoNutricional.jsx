import { Link, useLocation, useNavigate } from "react-router-dom";
import DetalleNutricional from "../components/DetalleNutricional.jsx";

function CuidadoNutricional({
  registros = [],
  ultimoRegistro = null,
  onLimpiarRegistros,
}) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const registroActivo = state || ultimoRegistro;

  if (!registroActivo) {
    return (
      <section className="pagina pagina--cuidado">
        <h1>Cuidado nutricional</h1>
        <p>Aún no hay un registro guardado.</p>
        <button
          type="button"
          className="boton boton--enlace"
          onClick={() => navigate("/")}
        >
          Ir al formulario
        </button>
      </section>
    );
  }

  const registrosGuardados =
    registros.length > 0 ? registros : [registroActivo];

  return (
    <section className="pagina pagina--cuidado">
      <h1>Cuidado nutricional</h1>

      {registrosGuardados.length > 1 ? (
        <div className="historial">
          <h2>Historial de registros</h2>
          <ul className="lista-registros">
            {registrosGuardados.map((registro, index) => (
              <li key={`${registro.correo}-${registro.fecha}-${index}`}>
                <Link to="/cuidado-nutricional" state={registro}>
                  {registro.nombre} · {registro.fecha}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <DetalleNutricional registro={registroActivo} />

      <button
        type="button"
        className="boton boton--secundario"
        onClick={() => {
          onLimpiarRegistros?.();
          navigate("/");
        }}
      >
        Limpiar registros
      </button>
    </section>
  );
}

export default CuidadoNutricional;
