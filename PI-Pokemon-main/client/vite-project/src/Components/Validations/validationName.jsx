import axios from 'axios';

// Función para validar el nombre
export const isNameValid = async (name) => {
  // Validar que el nombre solo contenga letras
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(name)) {
    return { valid: false, error: '* El nombre solo puede contener letras.' };
  }

  // Validar que el nombre tenga entre 2 y 15 caracteres
  if (name.length < 2 || name.length > 15) {
    return { valid: false, error: '* Debe tener entre 2 y 15 caracteres.'};
  }

  try {
    // Consultar si el nombre ya existe
    const response = await axios.get(`http://localhost:3001/pokemon/name/${name}`);
  
    // Si no hay errores en la solicitud, el nombre no está disponible
    return { valid: false, error: '* Nombre no válido' };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Si el código de estado es 404, el nombre no existe y está disponible
      return { valid: true, error: '* Nombre válido' };
    } else {
      // Si hay otro error, devolver un mensaje de error genérico
      console.error('Error al verificar el nombre:', error);
      return { valid: false, error: '* Error al verificar el nombre.' };
    }
  }
};