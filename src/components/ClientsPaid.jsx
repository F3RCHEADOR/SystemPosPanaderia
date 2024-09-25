import React, { useEffect, useState } from 'react';
import Cliente from '../assets/client.png';
import Factura from '../assets/bill.png';
import InfoSellOrPaid from './InfoSellOrPaid';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backend = import.meta.env.VITE_BUSINESS_BACKEND;

const ClientsPaid = () => {
  const [pagos, setPagos] = useState([]);
  const [selectedPago, setSelectedPago] = useState(null); // Para almacenar el cliente o factura seleccionada

  // Fetch para obtener los pagos
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(backend + 'api/pagos');
        const data = await response.json();
        setPagos(data); // Asume que el JSON es un array de clientes
        console.log(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  // Obtén la fecha actual en formato Date para la comparación
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  const today = getTodayDate();

  // Función para convertir fecha de formato DD/MM/YYYY a un objeto Date
  const convertToDate = (fechaString) => {
    const [day, month, year] = fechaString.split('/').map(Number);
    return new Date(year, month - 1, day); // Crear objeto Date a partir de la fecha en formato DD/MM/YYYY
  };

  // Filtra los pagos por fecha actual y por empresa vacía o con valor
  const pagosSinEmpresa = pagos.filter(pago => (pago.empresa === '' || !pago.empresa) && convertToDate(pago.fecha).toDateString() === new Date().toDateString());
  const pagosConEmpresa = pagos.filter(pago => pago.empresa && convertToDate(pago.fecha).toDateString() === new Date().toDateString());


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} absolute right-2 top-1/2 z-20 transform translate-y-1/2 w-[20px] h-[17px] bg-gray-700 flex items-center justify-center m-auto rounded-full  cursor-pointer`}
        style={{ ...style }}
        onClick={onClick}
      >
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} absolute left-2 top-1/2  z-20 transform translate-y-1/2  w-[20px] h-[17px]  bg-gray-700 flex items-center justify-center m-auto rounded-full  cursor-pointer`}
        style={{ ...style }}
        onClick={onClick}
      >
       
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    focusOnSelect: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 6,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Función para manejar la selección de un cliente o factura
  const handlePagoClick = (pago) => {
    setSelectedPago(pago); // Almacena el cliente o factura seleccionada
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedPago(null); // Cierra el modal al poner selectedPago en null
  };

  return (
    <div className="w-full mx-auto max-h-3/4 text-center relative z-10">
      <h1 className="my-2.5 bg-blue-200 text-center text-xl xl:text-2xl font-bold">Clientes (Hoy)</h1>
      <Slider {...sliderSettings}>
        {pagosSinEmpresa.map((pago, index) => (
          <div
            key={pago.codigo}
            className="bg-blue-50 border-4 group w-3/4 h-auto hover:bg-gray-50 p-2 xl:p-4 cursor-pointer"
            onClick={() => handlePagoClick(pago)} // Selecciona el cliente cuando se haga clic
          >
            <h1 className='text-center bg-purple-100 m-1 text-lg font-bold group-hover:bg-purple-200 transition-all'>
              Cliente: {index + 1}
            </h1>
            <img src={Cliente} alt="cliente" className="group-hover:scale-110 mx-auto mb-4 mt-2 size-24 transition-all" />
            <div className="rounded-lg border-r-4 border-l-4 shadow-xl p-1 group-hover:shadow-purple-200 group-hover:bg-purple-50 text-center">
              <p className='flex items-center justify-between group-hover:font-semibold transition-all'>
                Hora: <span>{pago.hora}</span>
              </p>
              <p className='flex items-center justify-between group-hover:font-semibold transition-all bg-green-200'>
                Venta: <span>{pago.valorPago}</span>
              </p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Pasa el pago seleccionado a InfoSellOrPaid */}
      {selectedPago && <InfoSellOrPaid info={selectedPago} onClose={handleCloseModal} />}

      <h1 className="bg-red-200 text-center text-xl xl:text-2xl font-bold mt-8">Pagos (Hoy)</h1>
      <Slider {...sliderSettings}>
        {pagosConEmpresa.map((pago, index) => (
          <div
            key={pago.codigo}
            className="bg-red-50 border-4 group w-3/4 h-auto hover:bg-gray-50 p-2 xl:p-4 cursor-pointer"
            onClick={() => handlePagoClick(pago)} // Selecciona la factura cuando se haga clic
          >
            <h1 className='text-center bg-purple-100 m-1 text-lg font-bold group-hover:bg-purple-200 transition-all'>
              Factura: {index + 1}
            </h1>
            <img src={Factura} alt="factura" className="group-hover:scale-110 mx-auto mb-4 mt-2 size-24 transition-all" />
            <div className="rounded-lg border-r-4 border-l-4 shadow-xl p-1 group-hover:shadow-purple-200 group-hover:bg-purple-50 text-center">
              <p className='flex items-center justify-between group-hover:font-semibold transition-all'>
                Hora: <span>{pago.hora}</span>
              </p>
              <p className='flex items-center justify-between group-hover:font-semibold transition-all bg-green-200'>
                Venta: <span>{pago.valorPago}</span>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ClientsPaid;
