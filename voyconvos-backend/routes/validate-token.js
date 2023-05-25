import jwt from 'jsonwebtoken';
const { Jwt } = jwt;

const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];

    if(headerToken !=undefined && headerToken.startsWith('Bearer '))
    {
        //tiene token
        try 
        {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken);
            jwt.verify(bearerToken, process.env.SECRET_KEY || "")
            next() 
        } catch (error) {
            res.status(401).json({ msg: 'Token no valido'});
        }

    }else{
        res.status(401).json({ msg: 'Acceso denegado'});
    }

}
export default validateToken;