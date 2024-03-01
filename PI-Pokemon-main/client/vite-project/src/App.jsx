import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "../src/App.css";
import LandingPage from '../src/Views/Landing/landing';
import Home from '../src/Views/Home/home';
import Create from "../src/Views/Create/create";
import Detail from './Views/Detail/detail';

function App() {
  // const [loadingProgress, setLoadingProgress] = useState(0);

  // useEffect(() => {
  //   const totalTime = 5000; // Tiempo total de carga en milisegundos
  //   const steps = 100; // Número de pasos
  //   const interval = totalTime / steps; // Intervalo entre pasos

  //   const simulateLoading = () => {
  //     let currentProgress = 0;
  //     const timer = setInterval(() => {
  //       currentProgress += 1;
  //       setLoadingProgress((prevProgress) => {
  //         return currentProgress >= steps ? 100 : prevProgress + 1;
  //       });
  //     }, interval);

  //     // Simula la carga completa después de totalTime
  //     setTimeout(() => {
  //       clearInterval(timer);
  //     }, totalTime);
  //   };

  //   simulateLoading();

  //   // Limpia el temporizador al desmontar el componente
  //   return () => clearInterval(interval);
  // }, []);

 const [ state, setState ] = useState(false)

  if (!state) {


    
  }

 

  return (
    <>
      <div className= 'app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={(
              <div>
               

                      <LandingPage />
                      

                      </div>
                 
            )}/>
            <Route path="/home" element={(
              // <TransitionGroup>
              //   <CSSTransition key="home" classNames="fade" timeout={500}>
              //     <div>
              //       {loadingProgress < 100 ? (
              //         <div>Loading... {loadingProgress}%</div>
              //       ) : (
                      <Home />
              //       )}
              //     </div>
              //   </CSSTransition>
              // </TransitionGroup>
            )}/>
            <Route path="/create" element={(
              <Create />
            )}/>
            <Route path="/detail/:id" element={(
              <Detail />
            )}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
