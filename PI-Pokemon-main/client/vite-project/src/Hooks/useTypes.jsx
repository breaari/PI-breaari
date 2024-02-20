import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getAllTypes } from "../redux/pokeSlice";

const useTypes = () => {
    const types = useSelector((state) => state.pokemon.allTypes);
    const dispatch = useDispatch();
    const URL = `http://localhost:3001/types`;

    useEffect(() => {
        const getData = async () => {
            try {
                const responseBackEnd = await axios.get(URL);
                // Mapear los tipos para asegurarnos de que tengan el formato correcto
                const formattedTypes = responseBackEnd.data.map((type) => ({
                    id: type.id,
                    name: type.name,
                }));

                dispatch(getAllTypes(formattedTypes));
            } catch (error) {
                console.error("Algo falló en la petición a mi BackEnd types");
            }
        };

        getData();
    }, [dispatch, URL]);

    return types;
};

export default useTypes;


