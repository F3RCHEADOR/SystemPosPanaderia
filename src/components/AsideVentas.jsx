import React, { useState, useEffect } from "react";

function AsideVentas() {
    const [ventasAcumuladas, setVentasAcumuladas] = useState(null);
    const [ultimaApertura, setUltimaApertura] = useState(null);
    const [clientesHoy, setClientesHoy] = useState(null);
    const [pagosHoy, setPagosHoy] = useState(null);
    const [totalGastos, setTotalGastos] = useState(null);
    const [totalVentas, setTotalVentas] = useState(null);
    const [verdaderaVentasAcumuladas, setVerdaderaVentasAcumuladas] = useState(null);
    const [totalCaja, setTotalCaja] = useState(0); // Estado para totalCaja
    const backend = import.meta.env.VITE_BUSINESS_BACKEND;

    // Función para normalizar las fechas
    const normalizeDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    };

    const today = normalizeDate(new Date().toLocaleDateString("es-CO"));

    useEffect(() => {
        // Fetch para Ventas Acumuladas
        fetch(backend + 'api/pagos')
            .then(response => response.json())
            .then(data => {
                // Normalizar la fecha en cada pago
                const ventasHoy = data.filter(pago => normalizeDate(pago.fecha) === today);
                const totalVentasAcumuladas = ventasHoy.reduce((total, pago) => total + Number(pago.valorPago), 0);

                const verdaderaVentasAcumuladas = totalVentasAcumuladas - totalCaja;

                const pagosDelDia = data.filter(pago => normalizeDate(pago.fecha) === today && pago.empresa !== "");
                const ventasDelDia = data.filter(pago => normalizeDate(pago.fecha) === today && pago.empresa === "");
                const totalPagosDelDia = pagosDelDia.reduce((total, pago) => total + Number(pago.valorPago), 0);
                const totalVentasDelDia = ventasDelDia.reduce((total, pago) => total + Number(pago.valorPago), 0);

                setTotalGastos(totalPagosDelDia);
                setTotalVentas(totalVentasDelDia);
                setVentasAcumuladas(totalVentasAcumuladas);
                setVerdaderaVentasAcumuladas(verdaderaVentasAcumuladas);
            })
            .catch(error => console.error('Error fetching ventas acumuladas:', error));

        // Fetch para Clientes Hoy
        fetch(backend + 'api/pagos')
            .then(response => response.json())
            .then(data => {
                const clientesDelDia = data.filter(cliente => normalizeDate(cliente.fecha) === today && cliente.empresa === "");
                setClientesHoy(clientesDelDia.length);
            })
            .catch(error => console.error('Error fetching clientes hoy:', error));

        // Fetch para Última Apertura o Cierre
        fetch(backend + 'api/caja')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const ultimaAperturaData = data[data.length - 1];
                    setUltimaApertura(ultimaAperturaData.hora);

                    // Sumar el total de caja
                    const totalCajaDelDia = data.reduce((total, caja) => total + Number(caja.total), 0);
                    setTotalCaja(totalCajaDelDia);
                }
            })
            .catch(error => console.error('Error fetching última apertura:', error));

        // Fetch para Pagos Hoy
        fetch(backend + 'api/pagos')
            .then(response => response.json())
            .then(data => {
                const pagosDelDia = data.filter(pago => normalizeDate(pago.fecha) === today && pago.empresa !== "");
                setPagosHoy(pagosDelDia.length);
            })
            .catch(error => console.error('Error fetching pagos hoy:', error));

    }, [backend, today, totalCaja]); // Incluye totalCaja en las dependencias

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
