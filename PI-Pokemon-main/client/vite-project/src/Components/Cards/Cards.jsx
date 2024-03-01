import React, { useMemo, useEffect } from 'react'
import Card from '../Card/Card'
import "../Cards/Cards.css"
import { useState } from 'react'
import "../Cards/Cards.css"
import { FilterOptions, FilterOrigin } from '../Filter/Filter'
import SortOptions from '../Sorts/Sorts'
import { useDispatch, useSelector } from 'react-redux'
import { setRenderData, setHistory, setType
} from "../../redux/pokeSlice"

const Cards = ({ arrayPoke }) => {

const dispatch = useDispatch();
// Estado para almacenar lo que habría que renderizar
const renderData = useSelector((state)=>state.pokemon.renderData)
const history = useSelector((state)=>state.pokemon.historyRenderData)
const selectedType = useSelector((state)=> state.pokemon.selectedType)

useEffect(() => {
  dispatch(setRenderData(arrayPoke));
  setNumberPage(1)
}, [arrayPoke]);

useEffect(() => {
  // Aquí actualizas renderData basado en el estado más reciente
  dispatch(setHistory(renderData))
  setNumberPage(1)
}, [renderData]);

console.log("renderData:", renderData)
console.log("arrayPoke:", arrayPoke)

const [numberPage, setNumberPage] = useState(1);
const ITEMS_PER_PAGE = 12;
const endIndex = numberPage * ITEMS_PER_PAGE
const startIndex = endIndex - ITEMS_PER_PAGE

const nextPageHandler = () => {
  setNumberPage(numberPage+1)
};

const prevPageHandler = () => {
  setNumberPage(numberPage-1)
};

const goToPageHandler = (pageNumber) => {
  setNumberPage(pageNumber);
};


// Función para filtrar los pokemons según el tipo seleccionado
const filteredPoke = useMemo(() => {
  if (!selectedType) return arrayPoke;
  return renderData.filter(poke => poke.types?.includes(selectedType));
}, [setRenderData, selectedType]);

useEffect(() => {
  dispatch(setRenderData(filteredPoke));
  dispatch(setHistory(filteredPoke))
  setNumberPage(1)
}, [filteredPoke]);

// Cálculo del número total de páginas
const totalPages = Math.ceil(renderData.length / ITEMS_PER_PAGE);

// Función para obtener los pokemons a mostrar en la página actual
const pokemons = renderData.slice(startIndex, endIndex);

const CardsRender = (data) => {
  return data.map((poke) => <Card poke={poke} key={poke.id} />);
};

 const onFilter = (type)=> {
  console.log("Type:", type)
  dispatch(setType(type));
}
console.log("selectedType:", selectedType)

const onFilterOrigin = (value) => {
  let arrayFilteredByOrigin = [filteredPoke];

  if (value === "API") {
    arrayFilteredByOrigin = filteredPoke.filter((poke) => typeof poke.id === 'number');
  } else if (value === "Data Base") {
    arrayFilteredByOrigin = filteredPoke.filter((poke) => isNaN(poke.id));
  } else {
    // Si no se selecciona ningún origen, muestra todos los pokemons
    arrayFilteredByOrigin = filteredPoke;
  }
  // Actualiza el estado renderData con los pokemons filtrados por origen
  dispatch(setRenderData(arrayFilteredByOrigin));
  dispatch(setHistory(arrayFilteredByOrigin))
  setNumberPage(1)
};

const onSortChange = (value) => {

  let arraySort = [...renderData]; // Creamos una copia de los datos para no modificar el original

    switch (value) {
      case "nameAZ":
        arraySort.sort((a, b) => a.name.localeCompare(b.name)); // Ordena de A a Z según el nombre
        break;
      case "nameZA":
        arraySort.sort((a, b) => b.name.localeCompare(a.name)); // Ordena de Z a A según el nombre
        break;
      case "lessAttack":
        arraySort.sort((a, b) => a.attack - b.attack); // Ordena de menor a mayor según el ataque
        break;
      case "greatestAttack":
        arraySort.sort((a, b) => b.attack - a.attack); // Ordena de mayor a menor según el ataque
        break;
      case "reset":
        arraySort.sort((a, b) => {
          // Si el ID de a no es un número pero el de b sí, a va primero
          if (isNaN(a.id) && !isNaN(b.id)) {
            return -1;
          }
          // Si el ID de b no es un número pero el de a sí, b va primero
          else if (!isNaN(a.id) && isNaN(b.id)) {
            return 1;
          }
          // Si ambos IDs son números, los ordenamos de menor a mayor
          else if (!isNaN(a.id) && !isNaN(b.id)) {
            return parseInt(a.id) - parseInt(b.id);
          }
          // Si ninguno de los IDs es un número, los ordenamos alfabéticamente por nombre
          else {
            return a.name.localeCompare(b.name);
          }
        });
        break;
      default:
        break;
    }

    dispatch(setRenderData(arraySort));
    dispatch(setHistory(renderData))
    setNumberPage(1)

 };

  return (
    <div className='container'>
      <div className='filter-container'>
        <div className="filter-options">
          <FilterOptions onFilter= { onFilter }/>
        </div>
        <div className = "filter-origin">
          <FilterOrigin onFilterOrigin = { onFilterOrigin }/>
        </div>
        <div className="sort-options">
          <SortOptions onSortChange={onSortChange}/>
        </div>
      </div>
      <div className='pagination'>
        <button onClick={ prevPageHandler } disabled = { numberPage === 1}> Back </button>
          <div className="page-buttons">
            {/* Botones para cada página */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPageHandler(index + 1)}
                className={numberPage === index + 1 ? 'active' : ''}
                disabled={numberPage === index + 1}
              >
                {index + 1}
              </button>
          ))}
     </div>
        <button onClick={ nextPageHandler } disabled = { numberPage === totalPages }> Next </button>
     </div>
        <div className= "cards-container">
          {CardsRender(pokemons)}
        </div>
    </div>
  )
}

export default Cards