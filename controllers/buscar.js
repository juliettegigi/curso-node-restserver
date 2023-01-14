const { response } = require('express')
const{ObjectId}=require('mongoose').Types;
const{Categoria,Usuario, Producto}=require('../models');
const colecciones = ['categorias', 'productos', 'roles', 'usuarios'];

const buscarUsuarios=async(termino='',res=response)=>{
   const esMongoID=ObjectId.isValid(termino);
   if(esMongoID){
       const usuario=await Usuario.find({_id:termino,estado:true});
       return res.json({results:(usuario)?[usuario]:[]});
    }

    // tengo que buscar por el término, una palabra...si busco por nombre o correo
   const regex=new RegExp(termino,'i');//insensible
    
    const usuarios=await Usuario.find({
        $or:[{nombre:regex},{correo:regex},{rol:regex}],
        $and:[{estado:true}]
    });
    res.json({
        resultados:usuarios
    })
 


    

}

const buscarCategorias=async(termino,res)=>{
   
    if(ObjectId.isValid(termino)){
        const categoria=await Categoria.find({_id:termino,estado:true});
        const usuario=await Categoria.find({categoria:termino,estado:true});
        return res.json({
            results_c:(categoria)?[...categoria]:[],
            results_u:(usuario)?[...usuario]:[]
        })
    }

    const regex=new RegExp(termino,'i');
    const categoria=await Categoria.find({nombre:regex,estado:true});
    res.json({
        resultados:categoria
    })


    
}



const buscarProductos=async(termino,res)=>{
   
    if(ObjectId.isValid(termino)){
        const producto=await Producto.find({_id:termino,estado:true});
        const usuario=await Producto.find({usuario:termino,estado:true});
        const categoria= await Producto.find({categoria:termino,estado:true});
        return res.json({
            results_p:(producto)?[...producto]:[],
            results_c:(categoria)?[...categoria]:[],
            results_u:(usuario)?[...usuario]:[]
        })
    }



    const regex=new RegExp(termino,'i');
    try{
        const producto=await Producto.find({precio:Number(regex.source),estado:true});
        return res.json({
            cantidad:producto.length,
            resultados:producto
        })
    }catch(error){}

    try{
        const categoria=await Producto.find({disponible:Boolean(regex.source),estado:true});
        return res.json({
            cantidad:categoria.length,
            resultados:categoria
        })
    }catch(error){}

    const categoria=await Producto.find({nombre:regex,estado:true});
  
    res.json({
        cantidad:categoria.length,
        resultados:categoria
    })


}




const buscar =async (req, res = response) => {
    const { coleccion, termino } = req.params;
    if (!colecciones.includes(coleccion)) {
        return res.status(400).json({
            msg: `${coleccion} no pertenece a nuestra DB`,
            coleccionesDB: colecciones
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino,res);

            break;

        case 'productos':
            buscarProductos(termino,res);
            break;
        case 'roles':

            break;
        case 'usuarios':
            buscarUsuarios(termino,res);

            break;

        
    }
  

}

module.exports = {
    buscar
}