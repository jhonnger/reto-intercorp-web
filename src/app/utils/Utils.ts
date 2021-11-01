
export const esFechaActualOAnterior = (fecha: Date) => {
  let hoy: Date;

  hoy = new Date();

  return fecha.getTime() <= hoy.getTime();
};


export const calcularEdadAnios = (fecha: Date) => {
  let hoy: Date, anioHoy, mesHoy, diaHoy;
  let anioNac, mesNac, diaNac;
  let anios, meses;
  let fechaNac;

  meses = 0;
  hoy = new Date();
  fechaNac = new Date(fecha.getTime());
  anioHoy = hoy.getFullYear();
  mesHoy = hoy.getMonth() + 1;
  diaHoy = hoy.getDate();

  fechaNac.setDate(fechaNac.getDate() + 1);

  anioNac = fechaNac.getFullYear();
  mesNac = fechaNac.getMonth() + 1;
  diaNac = fechaNac.getDate();

  anios = (anioHoy + 1900) - anioNac;
  if (mesHoy < mesNac) {
    anios--;
  }
  if ((mesNac === mesHoy) && (diaHoy < diaNac)) {
    anios--;
  }
  if (anios >= 1900) {
    anios -= 1900;
  }

  if (mesHoy > mesNac && diaNac > diaHoy) {
    meses = mesHoy - mesNac - 1;
  } else if (mesHoy > mesNac) {
    meses = mesHoy - mesNac;
  }

  if (mesHoy < mesNac && diaNac <= diaHoy) {
    meses = 12 - (mesNac - mesHoy);
  } else if (mesHoy < mesNac) {
    meses = 12 - (mesNac - mesHoy + 1);
  }

  if (mesHoy === mesNac && diaNac > diaHoy) {
    meses = 11;
  }
  if (anioHoy < anioNac || (anioHoy === anioNac && mesHoy < mesNac)) {
    anios = 0;
    meses = 0;
  }

  return {anios, meses, format: `${anios} años ${meses} meses`};
};
