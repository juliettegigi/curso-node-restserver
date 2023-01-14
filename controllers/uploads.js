const path=require('path')
const fs=require('fs')
const { response } = require('express');
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

const actualizarImagen = async (req, res = response) => {
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
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }
     
    const nombre=await subirArchivo(req.files,undefined,coleccion);
    modelo.img=nombre;
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

  
    if(modelo.img){
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }
     
    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}
module.exports = {
    cargarArchivo, actualizarImagen,mostrarImagen
}