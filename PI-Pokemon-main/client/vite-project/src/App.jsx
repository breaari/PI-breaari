import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "../src/App.css";
import LandingPage from '../src/Views/Landing/landing';
import Home from '../src/Views/Home/home';
import Create from "../src/Views/Create/create";
import Detail from './Views/Detail/detail';
import { useEffect, useState } from 'react';
import bulbasaurTransition from '../src/assets/bulbasaurTransition.gif'

function App() {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000); // Mostrar el video de transición durante 3 segundos

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className= 'app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={(
              // <TransitionGroup>
              //   {showTransition && (
              //     <CSSTransition key="transition" classNames="transition" timeout={3000}>

              //     </CSSTransition>
              //   )}
              //   <CSSTransition key="landing" classNames="fade" timeout={500}>
                  <LandingPage />
            //     </CSSTransition>
            //   </TransitionGroup>
            )}/>
            <Route path="/home" element={(
            //   <TransitionGroup>
            //     <CSSTransition key="home" classNames="fade" timeout={2000}>
                  <Home />
            //     </CSSTransition>
            //   </TransitionGroup>
            )}/>
            <Route path="/create" element={(
              // <TransitionGroup>
              //   <CSSTransition key="create" classNames="fade" timeout={2000}>
                  <Create />
            //     </CSSTransition>
            //   </TransitionGroup>
            )}/>
            <Route path="/detail/:id" element={(
              // <TransitionGroup>
              //   <CSSTransition key="detail" classNames="fade" timeout={2000}>
                  <Detail />
            //     </CSSTransition>
            //   </TransitionGroup>
            )}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
