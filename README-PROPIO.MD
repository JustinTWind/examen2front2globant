# NutriTrack

## Datos del estudiante

- **Nombre de los estudiantes:** Justin Londoño Cárdenas y Daniel Moreno Casas
- **Grupo:** Grupo Dual Globant

## Github page - https://justintwind.github.io/examen2front2globant/

## Descripción de la aplicación

NutriTrack es una aplicación web desarrollada con React para registrar y consultar información diaria relacionada con la alimentación y los hábitos saludables. La aplicación permite ingresar los datos personales del usuario, registrar una comida, consultar un resumen nutricional y recibir recomendaciones según la información registrada.

El formulario cuenta con validación en tiempo real mientras se escribe y también valida los campos cuando el usuario sale de ellos. Los registros se conservan durante la sesión del navegador mediante `sessionStorage`.

## Instalación y ejecución

### Requisitos

- Node.js instalado.
- npm instalado.

### Pasos

1. Clonar o descargar el proyecto.
2. Abrir una terminal en la carpeta raíz del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir en el navegador la URL indicada por Vite, normalmente `http://localhost:5173`.

## Campos y reglas de validación

1. **Nombre completo (`nombre`):** es obligatorio, debe tener mínimo 3 caracteres y solo puede contener letras y espacios.
2. **Correo electrónico (`correo`):** es obligatorio y debe tener un formato válido, por ejemplo: `usuario@dominio.com`.
3. **Edad (`edad`):** es obligatoria, debe ser un número entero entre 5 y 100.
4. **Peso en kilogramos (`peso`):** es obligatorio y debe estar entre 20 y 300 kg.
5. **Fecha del registro (`fecha`):** es obligatoria, debe ser una fecha válida y no puede ser posterior al día actual.
6. **Tipo de comida principal (`tipoComida`):** es obligatorio y debe seleccionar una opción: desayuno, almuerzo, cena o refrigerio.
7. **Descripción de los alimentos (`descripcion`):** es obligatoria y debe tener entre 10 y 200 caracteres.
8. **Calorías estimadas del día (`calorias`):** son obligatorias y deben ser un número entero entre 100 y 6000.
9. **Vasos de agua consumidos (`vasosAgua`):** son obligatorios y deben ser un número entero entre 0 y 20.
10. **Actividad física (`actividadFisica`):** es obligatorio seleccionar una opción válida: `Sí` o `No`.

## Validación del formulario

Los mensajes de error aparecen o desaparecen en tiempo real mediante `onChange` y también se muestran al salir de un campo mediante `onBlur`. El formulario no se envía hasta que todos los campos cumplen sus reglas de validación.
