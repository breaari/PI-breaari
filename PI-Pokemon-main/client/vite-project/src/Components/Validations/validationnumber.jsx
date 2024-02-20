export const isNumberValid  = (value) => {
    
    const regex2 = /^\d{1,2}$/
    if (isNaN(value))
    return { valid: false, error: 'El input debe ser un número.' };
    if (!isNaN(value) && !regex2.test(value))
    return { valid: false, error: "El input debe ser menor a tres dígitos."}
    if (!isNaN(value) && regex2.test(value)) {
      return { valid: true, error: 'Input válido.' };
    } else {
      return false; 
    }
  }