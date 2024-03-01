import React from 'react';
import Select from 'react-select';
import useTypes from '../../Hooks/useTypes';
import '../Filter/Filter.css';

export const FilterOptions = ({ onFilter, arrayPoke }) => {
    const pokemonTypes = useTypes();
    const optionsTypes = pokemonTypes.map(type => ({
        value: type.name,
        label: type.name,
    }));

    const handleChange = (selectedOption) => {
      
      if (selectedOption) {
        onFilter(selectedOption.value);
    } else {
        // Si no hay ninguna opción seleccionada, envía un valor especial al onFilter
        onFilter(); // Envía una cadena vacía como valor para indicar que se ha eliminado el filtro
    }
    };

    return (
        <div className='select-container'>
            <Select
                className='select-types'
                
                options={optionsTypes}
                onChange={handleChange}
                placeholder="Types"
                isClearable = { true }
                isSearchable = { true }
            />
        </div>
    );
};

export const FilterOrigin = ({ onFilterOrigin, filteredPoke }) => {
  const options = [
      { value: 'API', label: 'Original' },
      { value: 'Data Base', label: 'My Pokemons' }
  ];

  const handleChange = (selectedOption) => {
    if(selectedOption) {
        onFilterOrigin(selectedOption.value)
    } else {
        onFilterOrigin(filteredPoke)
    }

  };

  return (
      <div className='origin-container'>
          
          <Select
              options={options}
              onChange={handleChange}
              placeholder="Origin"
              isClearable = { true }
              isSearchable = { true }
          />
      </div>
  );
};
