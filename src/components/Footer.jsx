import React, { useState, useEffect } from 'react';
import FlechaArriba from '../assets/arrowUp.jsx';
import Home from "../assets/hogar.png";
import Inventory from "../assets/inventory.png";
import Productos from "../assets/dairy.png";
import Cash from "../assets/money.png";
import { Link } from 'react-router-dom';

function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Asegurar que siempre comienza en falso en el primer render
  useEffect(() => {
    setIsFooterVisible(false);
  }, []); // Este useEffect se ejecuta solo una vez, al montar el componente

  const toggleFooter = () => {
    setIsFooterVisible(prevState => !prevState);
  };

  return (
    <>
      <button
        id="toggleFooter"
        className={`fixed ${isFooterVisible ? 'bottom-8' : '-bottom-2'} z-50 left-1/2 transform -translate-x-1/2 p-1 m-2  bg-white rounded-full transition-transform ${isFooterVisible ? 'rotate-180' : 'rotate-0'
          }`}
        onClick={toggleFooter}
      >
        <FlechaArriba />
      </button>
      <footer
        id="footer"
        className={`fixed bottom-0 left-0 w-full h-auto select-none bg-blue-50 border-t-8 border-blue-400 transition-all ${isFooterVisible ? 'block' : 'hidden'
          }`}
      >
        <ul className='flex items-center justify-around text-lg font-bold mt-2'>
          <li className='border-l-8 pb-1 border-r-8 px-2 hover:scale-105 duration-200'><Link to={'/'} className='flex flex-row items-center'><img src={Home} className='size-12' /><span>Inicio</span></Link></li>
          <li className='border-l-8 pb-1 border-r-8 px-2 hover:scale-105 duration-200'><Link to={'Second'} className='flex flex-row items-center'><img src={Productos} className='size-12' /><span>Productos</span></Link></li>
          <li className='border-l-8 pb-1 border-r-8 px-2 hover:scale-105 duration-200'><Link to={'Inventories'} className='flex flex-row items-center'><img src={Inventory} className='size-12' /><span>Inventarios</span></Link></li>
          <li className='border-l-8 pb-1 border-r-8 px-2 hover:scale-105 duration-200'><Link to={'Ventas'} className='flex flex-row items-center'><img src={Cash} className='size-12' /><span>Ventas</span></Link></li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
