require('dotenv').config();
const express = require('express');
const cors = require('cors')

class Server{

    constructor(){
        this.usuariosPath='/api/usuarios'
        this.app = express();
        this.puerto=process.env.PORT || 8080;
        this.middlewares();
        this.routes();  // este método configura las rutas
        this.listen();
        //middlewares
       
    }

    middlewares(){
        //directorio pública
        this.app.use(express.static('public'));
        //parseo y lectura del body
        this.app.use(express.json());
        //cors
        this.app.use(cors());
    }

    routes(){
     this.app.use(this.usuariosPath,require('../routes/usuarios')); 

    }

    listen(){
        this.app.listen(this.puerto,()=>{
            console.log('server corriendo en el puerto:', this.puerto);
        })
    }


}

module.exports=Server;
