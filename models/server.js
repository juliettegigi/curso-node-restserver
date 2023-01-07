require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.usuariosPath='/api/usuarios';
        this.authPath='/api/auth';
        //conectar a db
        this.conectarDB();
        this.app = express();
        this.puerto=process.env.PORT || 8080;
        //middlewares
        this.middlewares();
        this.routes();  // este método configura las rutas
        this.listen();
        
       
    }

    async conectarDB(){
        await dbConnection(); 
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
     this.app.use(this.authPath,require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.puerto,()=>{
            console.log('server corriendo en el puerto:', this.puerto);
        })
    }


}

module.exports=Server;