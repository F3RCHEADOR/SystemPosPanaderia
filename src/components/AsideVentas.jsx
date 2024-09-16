import React, { useState, useEffect } from "react";

function AsideVentas() {
    const [ventasAcumuladas, setVentasAcumuladas] = useState(null);
    const [ultimaApertura, setUltimaApertura] = useState(null);
    const [clientesHoy, setClientesHoy] = useState(null);
    const [pagosHoy, setPagosHoy] = useState(null);
    const [totalGastos, setTotalGastos] = useState(null);
    const [totalVentas, setTotalVentas] = useState(null);
    const backend = import.meta.env.VITE_BUSINESS_BACKEND;

    // Obtener la fecha de hoy en formato DD/MM/YYYY
    const today = new Date().toLocaleDateString("es-CO", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    console.log(today);

    useEffect(() => {
        // Fetch para Ventas Acumuladas
        fetch(backend + 'api/pagos')
            .then(response => response.json())
            .then(data => {
                // Filtramos los pagos del día de hoy asegurando el formato correcto
                const ventasHoy = data.filter(pago => {
                    const fechaPago = new Date(pago.fecha).toLocaleDateString("es-CO", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    return fechaPago === today;
                });

                // Sumamos los valores de los pagos de hoy
                const totalVentasAcumuladas = ventasHoy.reduce((total, pago) => total + Number(pago.valorPago), 0);
                const pagosDelDia = ventasHoy.filter(pago => pago.empresa !== "");
                const ventasDelDia = ventasHoy.filter(pago => pago.empresa === "");

                const totalPagosDelDia = pagosDelDia.reduce((total, pago) => total + Number(pago.valorPago), 0);
                const totalVentasDelDia = ventasDelDia.reduce((total, pago) => total + Number(pago.valorPago), 0);

                setTotalGastos(totalPagosDelDia);
                setTotalVentas(totalVentasDelDia);
                setVentasAcumuladas(totalVentasAcumuladas);
            })
            .catch(error => console.error('Error fetching ventas acumuladas:', error));

        // Fetch para Última Apertura o Cierre
        fetch(backend + 'api/caja')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const ultimaAperturaData = data[data.length - 1];
                    setUltimaApertura(ultimaAperturaData.hora);
                    console.log('apertura del dia', ultimaAperturaData);
                }
            })
            .catch(error => console.error('Error fetching ultima apertura:', error));

        // Fetch para Clientes Hoy
        fetch(backend + 'api/pagos')
            .then(response => response.json())
            .then(data => {
                const clientesDelDia = data.filter(cliente => {
                    const fechaPago = new Date(cliente.fecha).toLocaleDateString("es-CO", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    return fechaPago === today && cliente.empresa === "";
                });
                setClientesHoy(clientesDelDia.length);
                console.log('Clientes del día', clientesDelDia);
            })
            .catch(error => console.error('Error fetching clientes hoy:', error));

        // Fetch para Pagos Hoy
        fetch(backend + 'api/pagos')
            .then(response => response.json())
            .then(data => {
                const pagosDelDia = data.filter(pago => {
                    const fechaPago = new Date(pago.fecha).toLocaleDateString("es-CO", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    return fechaPago === today && pago.empresa !== "";
                });
                setPagosHoy(pagosDelDia.length);
                console.log('Pagos del día', pagosDelDia);
            })
            .catch(error => console.error('Error fetching pagos hoy:', error));

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
                <p>{ventasAcumuladas !== null ? `$${ventasAcumuladas}` : '- - - - -- - - -'}</p>
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
