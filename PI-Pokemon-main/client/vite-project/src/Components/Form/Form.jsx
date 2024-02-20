import React, { useEffect, useState } from 'react';
import "../Form/Form.css";
import axios from 'axios';
import useTypes from '../../Hooks/useTypes';
import { isNameValid } from '../Validations/validationName';
import { isImageValid } from '../Validations/validationImage';
import { isNumberValid } from '../Validations/validationnumber';
import Select from 'react-select'

const CreateForm = () => {
  const [input, setInput] = useState({
    name: undefined,
    image: undefined,
    hp: undefined,
    attack: undefined,
    defense: undefined,
    speed: undefined,
    height: undefined,
    weight: undefined,
    types: undefined
   });

  const [selectTypes, setSelectTypes] = useState([]);
  const pokemonTypes = useTypes();
  const [inputError, setInputError] = useState({

    name: { valid: false, error: '' },
    image: { valid: false, error: '' },
    hp: { valid: false, error: '' },
    attack: { valid: false, error: '' },
    defense: { valid: false, error: '' },
    speed: { valid: false, error: '' },
    height: { valid: false, error: '' },
    weight: { valid: false, error: '' },

});
  const handleTypeChange = (selectedOptions) => {
  
    if (selectedOptions.length > 2) {
      // Si se seleccionan más de 2 tipos, mostrar un mensaje de error o tomar alguna otra acción
      window.alert('Por favor, selecciona como máximo dos tipos.');
      return;
    }
    if (selectedOptions.length === 1 || selectedOptions.length === 2) {

      let selectedTypes;
    if (selectedOptions.length === 1) {
        selectedTypes = selectedOptions[0].value;
    } else if (selectedOptions.length === 2) {
        selectedTypes = selectedOptions.map(option => option.value).join(' / ');
    }
    console.log("selectedTypes:", selectedTypes)
    setSelectTypes(selectedTypes);

    
    setInput(prevInput => ({
      ...prevInput,
      types: selectedTypes
    }));
    }
      }   

  const handleChange = async(e) => {
  
    const { name, value } = e.target;

        // Validar el nombre en tiempo real solo para el input de name
    if (name === 'name') {
      const { valid, error } = await isNameValid(value);
      setInputError(inputError => ({
        ...inputError, name: { valid, error }})),
        setInput(prevInput => ({...prevInput, [name]: value
        }))};

    if (name === 'image') {
      const { valid, error } = await isImageValid(value);
      setInputError(inputError => ({
        ...inputError, image: { valid, error }})),
        setInput(prevInput => ({...prevInput, [name]: value
      }))};

      if (name === 'hp') {
        const { valid, error } = isNumberValid(value);
        setInputError(inputError => ({
          ...inputError, hp: { valid, error }})),
          setInput(prevInput => ({...prevInput, [name]: value
        }))};
      if (name === 'attack') {
          const { valid, error } = isNumberValid(value);
          setInputError(inputError => ({
            ...inputError, attack: { valid, error }})),
            setInput(prevInput => ({...prevInput, [name]: value
          }))};
      if (name === 'defense') {
          const { valid, error } = isNumberValid(value);
          setInputError(inputError => ({
            ...inputError, defense: { valid, error }})),
            setInput(prevInput => ({...prevInput, [name]: value
          }))};
      if (name === 'speed') {
          const { valid, error } = isNumberValid(value);
          setInputError(inputError => ({
            ...inputError, speed: { valid, error }})),
            setInput(prevInput => ({...prevInput, [name]: value
          }))};
    if (name === 'height') {
          const { valid, error } = isNumberValid(value);
          setInputError(inputError => ({
            ...inputError, height: { valid, error }})),
            setInput(prevInput => ({...prevInput, [name]: value
          }))};
      if (name === 'weight') {
          const { valid, error } = isNumberValid(value);
          setInputError(inputError => ({
            ...inputError, weight: { valid, error }})),
            setInput(prevInput => ({...prevInput, [name]: value
          }))};
    }

    
console.log("input:", input)
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Verificar si hay algún campo con valid: false
  const isValid = Object.values(inputError).every(field => field.valid);

  if (!isValid) {
    // Mostrar mensaje de error
    window.alert('Por favor, complete todos los campos correctamente antes de enviar.');
    return;
  }

  try {

    const responseBack = await axios.post("http://localhost:3001/pokemons", input, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseBack.status === 200) {
      // Mostrar mensaje de éxito
      window.alert('Pokemón creado correctamente!');
      // Redirigir al home u otra página
      window.location.href = '/home'; // Cambia '/home' por la URL deseada
    } else {
      console.error('Error al enviar datos al servidor', responseBack.data);
    }
  } catch (error) {
    console.error('Error de red', error);
  }
};

  const optionsTypes = pokemonTypes.map(type => (
    { value: type.id, label: type.name}
  ));

  console.log("inputError:", inputError)

  return (
    <div className= 'form-container' >
      <form className= 'form-create' onSubmit={handleSubmit}>
        <div className="column-input">
          <h1 className= 'text'>Create your Pokémon!</h1>
          <input className='inputt' name='name' value={input.name} onChange={handleChange} placeholder= '  Name'></input>
          <input className='inputt' name='image' value={input.image} onChange={handleChange} placeholder='  Image'></input>
          <input className='inputt' name='hp' value={input.hp} onChange={handleChange} placeholder='  HP'></input>
          <input className='inputt' name='attack' value={input.attack} onChange={handleChange} placeholder='  Attack'></input>
          <input className='inputt' name='defense' value={input.defense} onChange={handleChange} placeholder='  Defense'></input>
          <input className='inputt' name='speed' value={input.speed} onChange={handleChange} placeholder='  Speed'></input>
          <input className='inputt' name='height' value={input.height} onChange={handleChange} placeholder='  Height'></input>
          <input className='inputt' name='weight' value={input.weight} onChange={handleChange} placeholder='  Weight'></input>
          <Select className= 'select-types' name= "types" isMulti menuPlacement= 'auto' options = {optionsTypes} onChange={ handleTypeChange} value ={ optionsTypes.id } placeholder= '  Types'></Select>
          <button className='create-pokemon' type="submit">Create</button>
        </div>
        <div className='column-error'>
          {inputError.name && <p className={`error ${inputError.name.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.name.error}</p>}
          {inputError.image && <p className={`error ${inputError.image.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.image.error}</p>}
          {inputError.hp && <p className={`error ${inputError.hp.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.hp.error}</p>}
          {inputError.attack && <p className={`error ${inputError.attack.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.attack.error}</p>}
          {inputError.defense && <p className={`error ${inputError.defense.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.defense.error}</p>}
          {inputError.speed && <p className={`error ${inputError.speed.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.speed.error}</p>}
          {inputError.height && <p className={`error ${inputError.height.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.height.error}</p>}
          {inputError.weight && <p className={`error ${inputError.weight.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.weight.error}</p>}
          
    </div>
    </form>
    </div>
  );
}

export default CreateForm;
