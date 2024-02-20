import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../redux/pokeSlice";
import axios from "axios";

const useHome = () => {

    // guarda el estado global de all pokemons en una variable
    const arrayPokemons = useSelector((state)=>state.pokemon.allPokemons)

    const dispatch = useDispatch()
    const URL = `http://localhost:3001/pokemon`

    // realiza una petición a mi backend y envía esa información a mi estado global
    useEffect(() => {

        const getData = async() => {
            try {

                const responseBackEnd = await axios.get(`${URL}`)
                dispatch(getAllPokemons(responseBackEnd.data))
                
            } catch (error) {

                console.error("Algo falló en la petición a mi BackEnd")
                
            }
        }

        getData()

    }, [dispatch])

return arrayPokemons;

}

export default useHome;