const {request, response } = require('express');
const{Categoria,Usuario}=require('../models');

//get - paginado- total - populate(es un método de mongoose q cuando imprimamos, va a aparecer toda la info del user)
const obtenerCategorias = async (req, res = response) => {
    let{limite,desde}=req.query;
    Number(desde);
    desde--;

    const[categorias,total]=await Promise.all(
        [Categoria.find({estado:true}).populate('usuario','nombre').limit(Number(limite)).skip(desde),
        Categoria.count({estado:true}),
        ]);

    res.json({ msg: 'Get/categorías', total,categorias });
};

//
const obtenerCategoria= async (req=request, res = response) => {
    const categoria=req.categoria;
    
    const usuario=await Usuario.findById(categoria.usuario);
    res.json({ msg: 'GetId/categorías',categoria,usuario:usuario.nombre});
};

//crear categoría
const crearCategoria = async (req, res = response) => {
    
    const nombre=req.body.nombre.toUpperCase();
    const categoriaDB=await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoría ${nombre}, ya existe`
        })

    }

    //generar la data a guardar
    const data={
        nombre,
        usuario:req.usuario._id
    }
    const categoria=new Categoria(data);
    await categoria.save();
    res.status(201).json({ msg: 'Post/categorías',categoria });
};

//put 
const actualizarCategoria = async (req, res = response) => {
    try{
    const{_id,usuario,estado,...resto}=req.body;
   
     resto.usuario=req.usuario._id; // le asigno el usuario del token    
      resto.nombre=resto.nombre.toUpperCase();
    
   await Categoria.updateOne(req.categoria,resto);
    res.json({ msg: 'Put/categorías',categoria:req.categoria });
    }
    catch(error){res.json({
        error})}

};

//delete
const borrarCategoria = async (req, res = response) => {
   
   
    const nuevo={estado:false}; 
    await Categoria.updateOne(req.categoria,nuevo)  ;
    res.json({ msg: 'Delete/categorías', categoria:req.categoria });
};

module.exports = { crearCategoria,obtenerCategoria,obtenerCategorias,borrarCategoria,actualizarCategoria}     