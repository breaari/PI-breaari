export const isValidType = async (selectedOption) => {
    try {
        if (!selectedOption || selectedOption.value === undefined) {
            return { valid: false, error: '* Selecciona al menos un tipo' };
        } else {
            return { valid: true, error: '* Tipo válido' };
        }
    } catch (error) {
        return { valid: false, error: '* Error al validar el tipo' };
    }
};
