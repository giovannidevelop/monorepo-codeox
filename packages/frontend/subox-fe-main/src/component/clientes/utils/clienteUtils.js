  // Valida que el RUT tenga dígito verificador correcto
export const validarRutChileno = (rutCompleto) => {
    const rut = rutCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();
    const cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
  
    if (!/^\d+$/.test(cuerpo)) return false;
  
    let suma = 0;
    let multiplo = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
  
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
  
    return dv === dvEsperado;
  };
  
  // Formato visible del RUT: 12.345.678-9
  export const formatearRutParaMostrar = (rut) => {
    const limpio = rut.replace(/\D/g, "");
    if (limpio.length < 2) return limpio;
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
  };
  
  // Limpia RUT para guardar: 123456789
  export const formatearRutParaGuardar = (rut) => rut.replace(/\D/g, "");
  
  export const validarCliente = (form) => {
    const errores = {};
  
    if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  
    if (!form.rut.trim()) {
      errores.rut = "El RUT es obligatorio.";
    } else if (!validarRutChileno(form.rut)) {
      errores.rut = "RUT inválido. Ej: 12.345.678-9";
    }
  
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errores.email = "Correo inválido.";
    if (form.telefono && !/^\d{8,9}$/.test(form.telefono)) errores.telefono = "Teléfono debe tener 8 o 9 dígitos.";
  
    return errores;
  };
  
  export const formatearCliente = (form) => ({
    ...form,
    rut: formatearRutParaGuardar(form.rut),
    telefono: form.telefono.replace(/\D/g, ""),
    email: form.email.trim().toLowerCase()
  });
  