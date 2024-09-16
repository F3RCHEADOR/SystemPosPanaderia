import React, { useState, useEffect, useMemo } from "react";

function AsideVentas() {
    const [ventasAcumuladas, setVentasAcumuladas] = useState(null);
    const [ultimaApertura, setUltimaApertura] = useState(null);
    const [clientesHoy, setClientesHoy] = useState(null);
    const [pagosHoy, setPagosHoy] = useState(null);
    const [totalGastos, setTotalGastos] = useState(null);
    const [totalVentas, setTotalVentas] = useState(null);
    const [totalCaja, setTotalCaja] = useState(null);
    const backend = import.meta.env.VITE_BUSINESS_BACKEND;

    // Función para normalizar las fechas
    const normalizeDate = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split("/");
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    };

    const today = normalizeDate(new Date().toLocaleDateString("es-CO"));

    const verdaderaVentasAcumuladas = useMemo(() => {
        return totalVentas !== null && totalCaja !== null
            ? totalVentas - totalCaja
            : null;
    }, [totalVentas, totalCaja]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pagosResponse, cajaResponse] = await Promise.all([
                    fetch(backend + 'api/pagos'),
                    fetch(backend + 'api/caja')
                ]);

                const pagosData = await pagosResponse.json();
                const cajaData = await cajaResponse.json();

                if (!Array.isArray(pagosData) || !Array.isArray(cajaData)) {
                    throw new Error("Datos inválidos");
                }

                // Calcular totalVentas y totalGastos
                const ventasHoy = pagosData.filter(pago => normalizeDate(pago.fecha) === today);
                const totalVentasAcumuladas = ventasHoy.reduce((total, pago) => total + Number(pago.valorPago), 0);

                const gastosHoy = pagosData.filter(pago => normalizeDate(pago.fecha) === today && pago.empresa !== "");
                const ventasDelDia = pagosData.filter(pago => normalizeDate(pago.fecha) === today && pago.empresa === "");
                const totalGastosHoy = gastosHoy.reduce((total, pago) => total + Number(pago.valorPago), 0);
                const totalVentasHoy = ventasDelDia.reduce((total, pago) => total + Number(pago.valorPago), 0);

                setTotalGastos(totalGastosHoy);
                setTotalVentas(totalVentasHoy);
                setVentasAcumuladas(totalVentasAcumuladas);

                // Manejar aperturas
                const aperturasDelDia = cajaData.filter(caja => normalizeDate(caja.fecha) === today && caja.tipoCaja === 'apertura');
                
                if (aperturasDelDia.length > 0) {
                    const primeraAperturaDelDia = aperturasDelDia.sort((a, b) => new Date(a.fecha + ' ' + a.hora) - new Date(b.fecha + ' ' + b.hora))[0];
                    
                    if (primeraAperturaDelDia) {
                        setTotalCaja(primeraAperturaDelDia.totalCaja);
                        setUltimaApertura(primeraAperturaDelDia.hora);
                    } else {
                        console.warn('No se encontró apertura para el día');
                    }
                } else {
                    console.warn('No hay aperturas para el día');
                }

                // Calcular clientesHoy y pagosHoy
                const clientesHoyData = pagosData.filter(cliente => normalizeDate(cliente.fecha) === today && cliente.empresa === "");
                const pagosHoyData = pagosData.filter(pago => normalizeDate(pago.fecha) === today && pago.empresa !== "");

                setClientesHoy(clientesHoyData.length);
                setPagosHoy(pagosHoyData.length);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [backend, today]);

    return (
        <aside className='fixed h-full w-56 bg-white border-r-4 flex flex-col items-center justify-evenly text-center'>
            <div className='p-2 border-2 rounded-xl w-48'>
                <h2 className='font-semibold text-lg'>Ventas Acumuladas</h2>
                <p>{totalVentas !== null ? `$${totalVentas}` : '- - - - -- - - -'}</p>
            </div>
            <div className='p-2 border-2 rounded-xl w-48 h-20'>
                <h2 className='font-semibold text-lg'>Gastos Acumulados</h2>
                <p>{totalGastos !== null ? totalGastos : '- - - - -- - - -'}</p>
            </div>
            <div className='p-2 border-2 rounded-xl w-48 h-20'>
                <h2 className='font-semibold text-lg'>Venta Total</h2>
                <p>{verdaderaVentasAcumuladas !== null ? `$${verdaderaVentasAcumuladas}` : '- - - - -- - - -'}</p>
            </div>
            <div className='p-2 border-2 rounded-xl w-48 h-20'>
                <h2 className='font-semibold text-lg'>Última Apertura</h2>
                <p>{ultimaApertura !== null ? ultimaApertura : '- - - - -- - - -'}</p>
            </div>
            <div className='p-2 border-2 rounded-xl w-48 h-20'>
                <h2 className='font-semibold text-lg'>Clientes Hoy</h2>
                <p>{clientesHoy !== null ? clientesHoy : '- - - - -- - - -'}</p>
            </div>
            <div className='p-2 border-2 rounded-xl w-48 h-20'>
                <h2 className='font-semibold text-lg'>Pagos Hoy</h2>
                <p>{pagosHoy !== null ? pagosHoy : '- - - - -- - - -'}</p>
            </div>
        </aside>
    );
}

export default AsideVentas;
