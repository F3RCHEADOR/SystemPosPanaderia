import React, { useState } from 'react';
import FlechaArriba from '../assets/arrowUp.jsx';
import Home from '../assets/Home.jsx';
import { Link } from 'react-router-dom';


function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const toggleFooter = () => {
    setIsFooterVisible(!isFooterVisible);
  };

  return (
    <>
      <button
        id="toggleFooter"
        className={`fixed ${isFooterVisible ? 'bottom-20' : '-bottom-2'} left-1/2 transform -translate-x-1/2 p-1 m-2 bg-white rounded-full transition-transform ${isFooterVisible ? 'rotate-180' : 'rotate-0'
          }`}
        onClick={toggleFooter}
      >
        <FlechaArriba />
      </button>
      <footer
        id="footer"
        className={`fixed bottom-0 left-0 w-full h-24 bg-blue-100 border-t-8 border-blue-300 transition-all ${isFooterVisible ? 'block' : 'hidden'
          }`}
      >
        <article className='flex my-2 items-center justify-around font-bold'>
          <Link to='/Second' className=' rounded-2xl border-4 bg-purple-300 border-purple-500 w-56 h-auto flex flex-col items-center justify-center hover:scale-110 duration-100'>
            <span>Crear Producto</span>
          </Link>
          <Link to='/' className='flex flex-col rounded-2xl border-4 bg-green-300 border-green-400 w-56 h-auto items-center justify-center hover:scale-110 duration-100'><Home /><span>Inicio</span></Link>
          <Link to='/Inventories' className=' rounded-2xl border-4 bg-red-300 border-red-400 w-56 h-auto flex items-center justify-center hover:scale-110 duration-100'><span>Inventarios</span></Link>
        </article>
      </footer>
    </>
  );
}

export default Footer;
