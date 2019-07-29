import React from 'react';
import Header from './components/Header'
import Banner from './components/Banner';
import Service from './components/Service';
import About from './components/About';
import Passion from './components/Passion';
import IntroVideoBg from './components/IntroVideoBg';

function App() {
  return (
    <React.Fragment>
      <Header/>
      <Banner/>
      <Service/>
      <About/>
      <Passion/>
      <IntroVideoBg/>
    </React.Fragment>            
  );
}

export default App;
