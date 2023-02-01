const express =  require('express');
const cors = require('cors');
const db =  require('../db/connection');
const path = require('path');
class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.dbConnection();
        //Middelwares
        this.middelware();
        //Rutas de mi aplicacion
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Se conecto a la base de datos')
        } catch (error) {
            throw new Error(error)
        }
    }
    middelware(){
        //CORS
        this.app.use(cors());
        //Cabeceras
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        

     

        //Lectura y paseo del body
        this.app.use(express.json());

        //Directorio public
        this.app.use(express.static('public'));

        this.app.get('*',(req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        }) 
    }

    routes(){         
        
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;