import React from 'react';
import Navbar from './navbar';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';


function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero/>
      <Features/>
    </div>
  );
}

export default Home;