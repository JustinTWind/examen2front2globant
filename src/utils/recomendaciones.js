export function calcularRecomendaciones(registro) {
  const recomendaciones = [];
  const edad = Number(registro.edad);
  const calorias = Number(registro.calorias);
  const vasosAgua = Number(registro.vasosAgua);
  const peso = Number(registro.peso);

  if (vasosAgua < 8) {
    recomendaciones.push(
      `Tu consumo de agua está por debajo del objetivo recomendado. Te faltan ${8 - vasosAgua} vasos para llegar a 8 al día.`,
    );
  } else {
    recomendaciones.push(
      "Tu hidratación está en un rango adecuado. Mantén este hábito para apoyar tu energía y digestión.",
    );
  }

  if (calorias > 2500) {
    recomendaciones.push(
      "Tu ingesta calórica estimada supera el rango habitual. Considera reducir porciones y priorizar alimentos más nutritivos.",
    );
  } else if (calorias < 1200) {
    recomendaciones.push(
      "La cantidad de calorías del día está por debajo de lo recomendable. Intenta incluir más alimentos energéticos y balanceados.",
    );
  } else {
    recomendaciones.push(
      "Tu consumo calórico se encuentra dentro de un rango más equilibrado. Mantén la variedad de nutrientes.",
    );
  }

  if (registro.actividadFisica === "No") {
    recomendaciones.push(
      "Como no realizaste actividad física, te recomendaría caminar o hacer ejercicio moderado al menos 30 minutos diarios.",
    );
  } else {
    recomendaciones.push(
      "Gracias por mover tu cuerpo. Seguir con actividad física te ayudará a mantener un buen equilibrio energético.",
    );
  }

  if (edad > 60) {
    recomendaciones.push(
      "Como tienes más de 60 años, prioriza una dieta rica en fibra, proteína y calcio para cuidar tu salud ósea y muscular.",
    );
  } else if (edad < 12) {
    recomendaciones.push(
      "Como eres menor de 12 años, es importante mantener desayunos completos y variedad de frutas y verduras en el día.",
    );
  }

  if (peso > 90 && calorias > 2200) {
    recomendaciones.push(
      "Tu peso y la ingesta calórica sugerida pueden requerir revisar las porciones para mantener un equilibrio más saludable.",
    );
  }

  return recomendaciones.slice(0, 5);
}
