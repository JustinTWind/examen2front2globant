import CartaPresentacion from "../components/Cartapresentación";

function AcercaDe() {
  return (
    <>
      <CartaPresentacion
        mostrarTitulo
        nombreUsuario="Justin Londono Cárdenas"
        githubLink="https://github.com/JustinTWind"
        githubName="JustinTWind"
        githubAvatar="https://avatars.githubusercontent.com/u/121695585?v=4"
        descripcionUsuario="NodeJS Semi-Senior developer, trabajando con NestJS, MongoDB y con diferentes microservicios"
      />
      <CartaPresentacion
        nombreUsuario="Daniel Moreno Casas"
        githubLink="https://github.com/DanielKsas"
        githubName="DanielKsas"
        githubAvatar="https://avatars.githubusercontent.com/u/213628063?v=4"
        descripcionUsuario="Estudiante del Cesde, con conocimiento en Java, SalesForce MC, HTML, CSS, JavaScript y Spring Boot"
      />
    </>
  );
}

export default AcercaDe;
