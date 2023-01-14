require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload=require('express-fileupload')

class Server{

    constructor(){

        this.paths={
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads'

        }
   
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
        // file uploads
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

    }

    routes(){
     this.app.use(this.paths.usuarios,require('../routes/usuarios')); 
     this.app.use(this.paths.auth,require('../routes/auth'));
     this.app.use(this.paths.categorias,require('../routes/categorias'));
     this.app.use(this.paths.productos,require('../routes/productos'));
     this.app.use(this.paths.buscar,require('../routes/buscar'));
     this.app.use(this.paths.uploads,require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.puerto,()=>{
            console.log('server corriendo en el puerto:', this.puerto);
        })
    }


}

module.exports=Server;