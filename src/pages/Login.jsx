import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { data } from 'autoprefixer';


const backend = import.meta.env.VITE_BUSINESS_BACKEND;


const Login = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Efecto para eliminar el token al montar el componente
    useEffect(() => {
        localStorage.removeItem('token'); // Elimina el token
    }, []); // El array vacío asegura que solo se ejecute una vez al montar

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post(backend+'api/usuarios/login', {
                username,
                password,
            });
            console.log('Inicio de sesión exitoso:', response.data);
            console.log(data)
            // Guardar el token y el localId en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('localId', response.data.localId); // Guardar el localId
    
            // Mostrar el toast
            toast.current.show({ severity: "success", summary: 'Sesión Iniciada Con Éxito', life: 3000 });
    
            // Redirigir después de 3 segundos
            setTimeout(() => {
                navigate('/home'); // Redirige a otra ruta
            }, 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error); // Mostrar error del servidor
                toast.current.show({ severity: "error", summary: err.response.data.error, life: 3000 });
            } else {
                setError('Error en la conexión al servidor');
            }
        }
    };
    
    return (
        <>
            <Toast ref={toast} />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded shadow-md w-96">
                    <h2 className="text-xl font-bold mb-6">Iniciar Sesión</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <Button
                            type="submit"
                            label='Iniciar Sesión'
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        />

                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
