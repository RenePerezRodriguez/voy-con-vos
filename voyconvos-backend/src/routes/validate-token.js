import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const headerToken = req.headers['authorization'];

  if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
    try {
      const bearerToken = headerToken.slice(7);
      console.log(bearerToken);
      jwt.verify(bearerToken, process.env.SECRET_KEY || 'default_secret_key');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token no válido' });
    }
  } else {
    res.status(401).json({ message: 'Acceso denegado' });
  }
};

export default validateToken;
