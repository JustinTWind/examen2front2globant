import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import RegistroComidas from "./pages/RegistroComidas.jsx";
import CuidadoNutricional from "./pages/CuidadoNutricional.jsx";
import AcercaDe from "./pages/AcercaDe.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

const STORAGE_KEY = "nutritrack_registros";

function App() {
  const [registros, setRegistros] = useState(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (!guardados) return [];

    try {
      return JSON.parse(guardados);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
  }, [registros]);

  const ultimoRegistro = useMemo(
    () => (registros.length > 0 ? registros[registros.length - 1] : null),
    [registros],
  );

  const guardarRegistro = (nuevoRegistro) => {
    setRegistros((prev) => [...prev, nuevoRegistro]);
  };

  const limpiarRegistros = () => {
    setRegistros([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="app">
      <Menu registros={registros} />
      <main className="contenido">
        <Routes>
          <Route
            path="/"
            element={<RegistroComidas onGuardarRegistro={guardarRegistro} />}
          />
          <Route
            path="/cuidado-nutricional"
            element={
              <CuidadoNutricional
                registros={registros}
                ultimoRegistro={ultimoRegistro}
                onLimpiarRegistros={limpiarRegistros}
              />
            }
          />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
