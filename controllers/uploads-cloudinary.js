const path=require('path')
const fs=require('fs')
const { Router,response } = require('express');
const router=Router();
const cloudinary = require('cloudinary').v2
const { subirArchivo } = require('../helpers');
const {Usuario,Producto} = require('../models');


const cargarArchivo = async (req, res = response) => {




    try {
        const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre: pathCompleto
        });
        return pathCompleto
    }
    catch (err) {
        res.status(400).json({
            err
        })
    };

}

const actualizarImagenCloudinary = async (req, res = response) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
          //  modelo.img=await cargarArchivo(req); 
           // await Usuario.findById(id,modelo)
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default: res.status(500).json({ // por si alguien quiere usar una cosa q no es usuario
            msg: 'Se me olvidó validar esto'
        })
    }

    // antes de subir una imagen tengo que borrar
    if(modelo.img){
        const nombreArr=modelo.img.split('/');
        const nombre=nombreArr[nombreArr.length-1];
        const[public_id]=nombre.split('.');
        await cloudinary.uploader.destroy(public_id);
      
    }

    //subir el archivo
    const{tempFilePath}=req.files.archivo;
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath);
    modelo.img=secure_url;
     
    await modelo.save();
   // await Usuario.findByIdAndUpdate(id,modelo);
    res.json(modelo);
}


const mostrarImagen=async(req,res=response)=>{
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
          //  modelo.img=await cargarArchivo(req); 
           // await Usuario.findById(id,modelo)
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default: res.status(500).json({ // por si alguien quiere usar una cosa q no es usuario
            msg: 'Se me olvidó validar esto'
        })
    }

//////////////////////////////////  
     // Limpiar imágenes previas
     if ( modelo.img ) {
        const nombreArr=modelo.img.split('/');
        const nombre=nombreArr[nombreArr.length-1];
        const[public_id]=nombre.split('.');
        
        // Hay que borrar la imagen del servidor
        // const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        // if ( fs.existsSync( pathImagen ) ) {
          return res.send(modelo.img);
        }
    

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}
module.exports = {
    cargarArchivo, actualizarImagenCloudinary,mostrarImagen
}