import React from 'react';
import Header from '../Header'
import Banner from '../Banner';
import Service from '../Service';
import About from '../About';
import Passion from '../Passion';
import IntroVideoBg from '../IntroVideoBg';

function Home() {
    return (
        <React.Fragment>
            <Header />
            <Banner />
            <Service />
            <About />
            <Passion />
            <IntroVideoBg />
        </React.Fragment>
    );
}

export default Home;
