import React, { useState } from 'react';

function ContadorBilletes() {
  const [billetes, setBilletes] = useState({
    100000: 0,
    50000: 0,
    20000: 0,
    10000: 0,
    5000: 0,
    2000: 0,
    1000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0
  });

  const handleChange = (denominacion, valor) => {
    setBilletes((prevBilletes) => ({
      ...prevBilletes,
      [denominacion]: parseInt(valor, 10) || 0
    }));
  };

  const total = Object.keys(billetes).reduce(
    (acc, denom) => acc + billetes[denom] * denom,
    0
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Apertura de Caja</h2>
      <div className="space-y-4">
        {Object.keys(billetes)
          .sort((a, b) => b - a) // Ordena las denominaciones de mayor a menor
          .map((denominacion) => (
            <div key={denominacion} className="flex items-center justify-between">
              <label className="text-lg font-medium">
                ${denominacion}
              </label>
              <input
                type="number"
                value={billetes[denominacion]}
                onChange={(e) => handleChange(denominacion, e.target.value)}
                className="w-20 p-2 border rounded-lg text-right"
                min="0"
              />
            </div>
          ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl font-bold">Total: ${total}</p>
      </div>
      <div className="mt-4 text-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default ContadorBilletes;
