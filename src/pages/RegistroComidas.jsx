import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";

const estadoInicial = {
  nombre: "",
  correo: "",
  edad: "",
  peso: "",
  fecha: "",
  tipoComida: "",
  descripcion: "",
  calorias: "",
  vasosAgua: "",
  actividadFisica: "",
};

const validarNombre = (nombre) => {
  if (!nombre.trim()) {
    return "El nombre es obligatorio.";
  }
  if (nombre.trim().length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }
  if (!/^\p{L}+(?: \p{L}+)*$/u.test(nombre.trim())) {
    return "El nombre solo puede contener letras y espacios.";
  }
  return "";
};

const validarCorreo = (correo) => {
  if (!correo.trim()) {
    return "El correo electrónico es obligatorio.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
    return "El correo electrónico no tiene un formato válido.";
  }
  return "";
};

const validarEdad = (edad) => {
  if (edad === "" || edad === null || edad === undefined) {
    return "La edad es obligatoria.";
  }
  const edadNumero = Number(edad);
  if (!Number.isInteger(edadNumero) || edadNumero < 5 || edadNumero > 100) {
    return "La edad debe ser un número entre 5 y 100.";
  }
  return "";
};

const validarPeso = (peso) => {
  if (peso === "" || peso === null || peso === undefined) {
    return "El peso es obligatorio.";
  }
  const pesoNumero = Number(peso);
  if (Number.isNaN(pesoNumero) || pesoNumero < 20 || pesoNumero > 300) {
    return "El peso debe estar entre 20 y 300 kg.";
  }
  return "";
};

const validarFecha = (fecha) => {
  if (!fecha) {
    return "La fecha es obligatoria.";
  }
  const fechaRegistro = new Date(`${fecha}T00:00:00`);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (Number.isNaN(fechaRegistro.getTime())) {
    return "La fecha no es válida.";
  }

  if (fechaRegistro > hoy) {
    return "La fecha no puede ser posterior al día de hoy.";
  }
  return "";
};

const validarTipoComida = (tipoComida) => {
  if (!tipoComida) {
    return "Debes seleccionar un tipo de comida.";
  }
  return "";
};

const validarDescripcion = (descripcion) => {
  if (!descripcion.trim()) {
    return "La descripción es obligatoria.";
  }
  const longitud = descripcion.trim().length;
  if (longitud < 10 || longitud > 200) {
    return "La descripción debe tener entre 10 y 200 caracteres.";
  }
  return "";
};

const validarCalorias = (calorias) => {
  if (calorias === "" || calorias === null || calorias === undefined) {
    return "Las calorías son obligatorias.";
  }
  const caloriasNumero = Number(calorias);
  if (
    !Number.isInteger(caloriasNumero) ||
    caloriasNumero < 100 ||
    caloriasNumero > 6000
  ) {
    return "Las calorías deben ser un número entero entre 100 y 6000.";
  }
  return "";
};

const validarVasosAgua = (vasosAgua) => {
  if (vasosAgua === "" || vasosAgua === null || vasosAgua === undefined) {
    return "La cantidad de vasos de agua es obligatoria.";
  }
  const vasosNumero = Number(vasosAgua);
  if (!Number.isInteger(vasosNumero) || vasosNumero < 0 || vasosNumero > 20) {
    return "Los vasos de agua deben ser un número entero entre 0 y 20.";
  }
  return "";
};

const validarActividadFisica = (actividadFisica) => {
  if (!actividadFisica) {
    return "Debes indicar si realizaste actividad física.";
  }
  if (actividadFisica !== "Sí" && actividadFisica !== "No") {
    return "La actividad física debe ser Sí o No.";
  }
  return "";
};

const validadores = {
  nombre: validarNombre,
  correo: validarCorreo,
  edad: validarEdad,
  peso: validarPeso,
  fecha: validarFecha,
  tipoComida: validarTipoComida,
  descripcion: validarDescripcion,
  calorias: validarCalorias,
  vasosAgua: validarVasosAgua,
  actividadFisica: validarActividadFisica,
};

function RegistroComidas({ onGuardarRegistro }) {
  const navigate = useNavigate();
  const formularioRef = useRef(null);
  const [formulario, setFormulario] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  // Helper para ejecutar la validación individual
  const validarCampo = (name, value) => {
    const funcionValidar = validadores[name];
    return funcionValidar ? funcionValidar(value) : "";
  };

  // Validación en tiempo real al escribir (onChange)
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setFormulario((previo) => ({ ...previo, [name]: value }));

    const errorActual = validarCampo(name, value);
    setErrores((previo) => ({ ...previo, [name]: errorActual }));
  };

  // Validación al salir del campo (onBlur)
  const manejarBlur = (evento) => {
    const { name, value } = evento.target;
    const errorActual = validarCampo(name, value);
    setErrores((previo) => ({ ...previo, [name]: errorActual }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const nuevosErrores = {};

    Object.keys(validadores).forEach((campo) => {
      nuevosErrores[campo] = validarCampo(campo, formulario[campo]);
    });

    const erroresFiltrados = Object.fromEntries(
      Object.entries(nuevosErrores).filter(([, mensaje]) => mensaje),
    );

    setErrores(erroresFiltrados);

    if (Object.keys(erroresFiltrados).length > 0) {
      const primerCampo = Object.keys(erroresFiltrados)[0];
      const elemento = formularioRef.current?.querySelector(
        primerCampo === "actividadFisica" ? "#actividad-si" : `#${primerCampo}`,
      );
      elemento?.focus();
      elemento?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    onGuardarRegistro?.(formulario);
    navigate("/cuidado-nutricional", { state: formulario });
  };

  return (
    <section className="pagina">
      <h1>Registro de comidas del día</h1>
      <p className="pagina__intro">
        Completa los 10 campos para registrar lo que consumiste. Todos son
        obligatorios.
      </p>

      <form
        ref={formularioRef}
        className="formulario"
        onSubmit={manejarEnvio}
        noValidate
      >
        <CampoFormulario
          id="nombre"
          etiqueta="Nombre completo"
          error={errores.nombre}
        >
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formulario.nombre}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "nombre-error" : undefined}
          />
        </CampoFormulario>

        <CampoFormulario
          id="correo"
          etiqueta="Correo electrónico"
          error={errores.correo}
        >
          <input
            id="correo"
            name="correo"
            type="email"
            value={formulario.correo}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "correo-error" : undefined}
          />
        </CampoFormulario>

        <CampoFormulario id="edad" etiqueta="Edad" error={errores.edad}>
          <input
            id="edad"
            name="edad"
            type="number"
            value={formulario.edad}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.edad)}
            aria-describedby={errores.edad ? "edad-error" : undefined}
          />
        </CampoFormulario>

        <CampoFormulario
          id="peso"
          etiqueta="Peso en kilogramos"
          error={errores.peso}
        >
          <input
            id="peso"
            name="peso"
            type="number"
            step="0.1"
            value={formulario.peso}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.peso)}
            aria-describedby={errores.peso ? "peso-error" : undefined}
          />
        </CampoFormulario>

        <CampoFormulario
          id="fecha"
          etiqueta="Fecha del registro"
          error={errores.fecha}
        >
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={formulario.fecha}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.fecha)}
            aria-describedby={errores.fecha ? "fecha-error" : undefined}
          />
        </CampoFormulario>

        <CampoFormulario
          id="tipoComida"
          etiqueta="Tipo de comida principal"
          error={errores.tipoComida}
        >
          <select
            id="tipoComida"
            name="tipoComida"
            value={formulario.tipoComida}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.tipoComida)}
            aria-describedby={
              errores.tipoComida ? "tipoComida-error" : undefined
            }
          >
            <option value="">Selecciona una opción</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
            <option value="Cena">Cena</option>
            <option value="Refrigerio">Refrigerio</option>
          </select>
        </CampoFormulario>

        <CampoFormulario
          id="descripcion"
          etiqueta="Descripción de los alimentos"
          error={errores.descripcion}
        >
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            value={formulario.descripcion}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.descripcion)}
            aria-describedby={
              errores.descripcion ? "descripcion-error" : undefined
            }
          />
        </CampoFormulario>

        <CampoFormulario
          id="calorias"
          etiqueta="Calorías estimadas del día"
          error={errores.calorias}
        >
          <input
            id="calorias"
            name="calorias"
            type="number"
            value={formulario.calorias}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.calorias)}
            aria-describedby={errores.calorias ? "calorias-error" : undefined}
          />
        </CampoFormulario>

        <CampoFormulario
          id="vasosAgua"
          etiqueta="Vasos de agua consumidos"
          error={errores.vasosAgua}
        >
          <input
            id="vasosAgua"
            name="vasosAgua"
            type="number"
            value={formulario.vasosAgua}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            aria-invalid={Boolean(errores.vasosAgua)}
            aria-describedby={errores.vasosAgua ? "vasosAgua-error" : undefined}
          />
        </CampoFormulario>

        <fieldset
          className={`campo ${errores.actividadFisica ? "campo--error" : ""}`}
          aria-describedby={
            errores.actividadFisica ? "actividadFisica-error" : undefined
          }
        >
          <legend>¿Realizó actividad física?</legend>
          <div className="campo__radios">
            <label htmlFor="actividad-si">
              <input
                id="actividad-si"
                type="radio"
                name="actividadFisica"
                value="Sí"
                checked={formulario.actividadFisica === "Sí"}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                aria-invalid={Boolean(errores.actividadFisica)}
              />
              Sí
            </label>
            <label htmlFor="actividad-no">
              <input
                id="actividad-no"
                type="radio"
                name="actividadFisica"
                value="No"
                checked={formulario.actividadFisica === "No"}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                aria-invalid={Boolean(errores.actividadFisica)}
              />
              No
            </label>
          </div>
          {errores.actividadFisica ? (
            <p className="campo__error" id="actividadFisica-error" role="alert">
              {errores.actividadFisica}
            </p>
          ) : null}
        </fieldset>

        <button type="submit" className="boton">
          Enviar registro
        </button>
      </form>
    </section>
  );
}

export default RegistroComidas;