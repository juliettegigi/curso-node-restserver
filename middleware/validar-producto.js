const { response,request} = require("express");
const Producto = require("../models/producto");


const existeProducto=async(id)=>{
 
   
   
    const producto=await Producto.findById(id).populate('categoria','nombre').populate('usuario','nombre');
  
    if(!producto){
        throw new Error("el producto no se encuentra en la base de datos");
        
    }

    if(producto.estado===false){
        throw new Error("el producto está eliminado");
        
    }

    request.producto=producto;
  
   
   
}

module.exports={
    existeProducto
}