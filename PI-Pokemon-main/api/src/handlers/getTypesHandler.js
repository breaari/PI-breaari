const { getTypes } = require("../controllers/getTypes")

const getTypeHandler = async (req, res) => {
    try {
        const response = await getTypes();
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(404).json( { error: "Error al obtener los tipos"})
    }
}

module.exports = { getTypeHandler }
