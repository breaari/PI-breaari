import axios from 'axios';

// Función para validar la existencia de una imagen en la web
export const isImageValid = async (name) => {
  
  try {
    // Realizar una solicitud GET a la URL de la imagen
    const response = await axios.get(name);
    const regex = /.(gif|jpeg|jpg|png)$/i;
    // validar regex
    if (!regex.test(name)) {
      return { valid: false, error: '* URL inválida' };
    }
    
    // Si la solicitud es exitosa (código de estado 200), la imagen existe
    if (response.status === 200) {
      return { valid: true, error: '* Imagen válida' };
    } else {
      // Si el código de estado no es 200, la imagen no existe
      return { valid: false, error: '* La imagen no existe en la web.' };
    }
  } catch (error) {
    // Si hay un error al realizar la solicitud, asumir que la imagen no existe
    console.error('Error al verificar la imagen:', error);
    return { valid: false, error: '* Error al verificar la imagen.' };
  }
};