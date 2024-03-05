import React, { useEffect, useState } from 'react';
import "../Form/Form.css";
import axios from 'axios';
import useTypes from '../../Hooks/useTypes';
import { isNameValid } from '../Validations/validationName';
import { isImageValid } from '../Validations/validationImage';
import { isNumberValid } from '../Validations/validationnumber';
import Select from 'react-select'
import { isValidType } from '../Validations/validationTypes';

const CreateForm = () => {
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: ""
   });

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
    types: { valid: false, error: '' },

});

  console.log("inputError:", inputError)
  
  const handleTypeChange = async (selectedOptions) => {
    // Valida las opciones seleccionadas
    const { valid, error } = await isValidType(selectedOptions);
  
    // Actualiza el estado de error
    setInputError((prevInputError) => ({
      ...prevInputError,
      types: { valid, error }
    }));
  
    // Actualiza el estado de input solo si las opciones son válidas
    if (valid) {
      setInput((prevInput) => ({
        ...prevInput,
        types: selectedOptions.value
      }));
    }
  };

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
    window.alert('Pokemón creado correctamente!');
    
  } catch (error) {
    window.alert('Error al crear Pokemon')
  }
};

  const optionsTypes = pokemonTypes.map(type => (
    { value: type.id, label: type.name}
  ));

  return (
    <div className= 'form-container' >
      <form className= 'form-create' onSubmit={handleSubmit}>
        
          <h1 className= 'text'>Create your own Pokémon!</h1>

          
          <input className='inputt-name' name='name' value={input.name} onChange={handleChange} placeholder= '  Name'></input>
          {inputError.name && <p className={`error ${inputError.name.valid ? 'valid-error' : 'invalid-error'} names`}>{inputError.name.error}</p>}
      
          <div className='container-container'>
          <div className='container-1'>
          <input className='inputt-image' name='image' value={input.image} onChange={handleChange} placeholder='  Image'></input>
          {inputError.image && <p className={`error ${inputError.image.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.image.error}</p>}
          <input className='inputt-hp' name='hp' value={input.hp} onChange={handleChange} placeholder='  HP'></input>
          {inputError.hp && <p className={`error ${inputError.hp.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.hp.error}</p>}
          <input className='inputt-attack' name='attack' value={input.attack} onChange={handleChange} placeholder='  Attack'></input>
          {inputError.attack && <p className={`error ${inputError.attack.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.attack.error}</p>}
          <input className='inputt-defense' name='defense' value={input.defense} onChange={handleChange} placeholder='  Defense'></input>
          {inputError.defense && <p className={`error ${inputError.defense.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.defense.error}</p>}
          </div>
          <div className='container-2'>
          <input className='inputt-speed' name='speed' value={input.speed} onChange={handleChange} placeholder='  Speed'></input>
          {inputError.speed && <p className={`error ${inputError.speed.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.speed.error}</p>}
          <input className='inputt-height' name='height' value={input.height} onChange={handleChange} placeholder='  Height'></input>
          {inputError.height && <p className={`error ${inputError.height.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.height.error}</p>}
          <input className='inputt-weight' name='weight' value={input.weight} onChange={handleChange} placeholder='  Weight'></input>
          {inputError.weight && <p className={`error ${inputError.weight.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.weight.error}</p>}
          <Select className= 'select-types33' name= "types" menuPlacement= 'auto' options = {optionsTypes} onChange={ handleTypeChange} value ={ optionsTypes.id } placeholder= '  Types'></Select>
          {inputError.types && <p className={`error ${inputError.types.valid ? 'valid-error' : 'invalid-error'}`}>{inputError.types.error}</p>}
          </div>
          </div>
          <button className='create-pokemon' type="submit">Create!</button>
         
          
 
    </form>
    </div>
  );
}

export default CreateForm;
