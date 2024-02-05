import { useState } from 'react'
//import "../styles/landing.css";
import LandingPage from '../src/Views/Landing/landing'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../src/Views/Home/home'

function App() {

  // const onSearch = async (query) => {

  //   try {
    
  //   const { data } = await axios(`http://localhost:3001/pokemon?search=pokemon`)
  //   console.log('Respuesta de la solicitud axios:', data);
    
  //   if (data.name || data.id) {
  //     //setCharacters((oldChars) => [...oldChars, data]);
  //   } else {
  //     window.alert('Datos no encontrados');
  //   }

  //   } catch (error) {

  //     console.error('Error al obtener datos:', error);
  //     window.alert('Hubo un error al obtener los datos');
      
  //   }
  // };

  return (
    <>
      <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <LandingPage/> }></Route>
        <Route path="/home" element={<Home  />} />
    </Routes>
    </BrowserRouter>
      </div>
      
    </>
  )
}

export default App;
