const { response,request} = require("express");
const Categoria = require("../models/categoria");


const existeCategoria=async(id)=>{
 
   
    if(!id)
    return;
    const categoria=await Categoria.findById(id).populate('usuario','nombre');
  
    if(!categoria){
        throw new Error("La categoria no se encuentra en la base de datos");
        
    }

    if(categoria.estado===false){
        throw new Error("el producto está eliminado");
        
    }

    request.categoria=categoria;
  
   
   
}

module.exports={
    existeCategoria
}