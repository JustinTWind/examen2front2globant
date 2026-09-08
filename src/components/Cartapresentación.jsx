function CartaPresentacion({
  nombreUsuario,
  githubLink,
  githubName,
  githubAvatar,
  descripcionUsuario,
}) {
  return (
    <section className="pagina pagina--acerca">
      <h1>Acerca de</h1>
      <img className="avatar" alt="Avatar del programador" src={githubAvatar} />
      <dl className="resumen">
        <dt>Nombre completo</dt>
        <dd>{nombreUsuario}</dd>
        <dt>Grupo y programa</dt>
        <dd>Front-end II - CESDE</dd>
        <dt>Institución</dt>
        <dd>CESDE</dd>
        <dt>Año</dt>
        <dd>2026</dd>
        <dt>GitHub</dt>
        <dd>
          <a href={githubLink} target="_blank" rel="noreferrer">
            {githubName}
          </a>
        </dd>
      </dl>
      <p>{descripcionUsuario}</p>
    </section>
  );
}

export default CartaPresentacion;
