import jwt from 'jsonwebtoken';

const JWT_SECRET = 'FFF1102'; // Debes usar una clave segura aquí

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Obtener el token del encabezado

    if (!token) return res.sendStatus(401); // No autorizado si no hay token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Prohibido si el token no es válido
        req.user = user; // Almacena el usuario en la solicitud
        next(); // Pasa al siguiente middleware o ruta
    });
};

export default authenticateToken;
