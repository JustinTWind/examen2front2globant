import { NavLink } from "react-router-dom";

function Menu({ registros = [] }) {
  const tieneRegistros = registros.length > 0;

  return (
    <header className="menu">
      <NavLink to="/" className="menu__logo" end>
        <img
          src="/diet.png"
          alt="Logo de NutriTrack"
          className="menu__logo-imagen"
        />
        <span>NutriTrack</span>
      </NavLink>
      <nav className="menu__nav" aria-label="Navegación principal">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu__enlace menu__enlace--activo" : "menu__enlace"
          }
          end
        >
          Registro
        </NavLink>

        <NavLink
          to={tieneRegistros ? "/cuidado-nutricional" : "#"}
          className={({ isActive }) =>
            isActive ? "menu__enlace menu__enlace--activo" : "menu__enlace"
          }
          onClick={(evento) => {
            if (!tieneRegistros) {
              evento.preventDefault();
            }
          }}
          end
        >
          Cuidado nutricional
        </NavLink>

        <NavLink
          to="/acerca-de"
          className={({ isActive }) =>
            isActive ? "menu__enlace menu__enlace--activo" : "menu__enlace"
          }
        >
          Acerca de
        </NavLink>
      </nav>
    </header>
  );
}

export default Menu;
