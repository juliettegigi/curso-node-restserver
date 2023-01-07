const {response}=require('express');
const {validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const Usuario = require('../models/usuario');


const usuariosGet= async(req, res=response) =>{
 // const {q,nombre,apikey}=req.query;  
 const {limite=5,desde=0}=req.query;  // desde 6 y limite 2 , me devolvió user7 y user8 
 const query={estado:true};
 const [usuarios,total]=await Promise.all([Usuario.find(query).limit(limite).skip(desde),
                         Usuario.countDocuments(query)]);
  res.json({total,usuarios});
  };

const usuariosPut= async(req, res=response) =>{
  const {id}=req.params;
  const{_id,password,google,correo,...resto}=req.body;
  if(password){
    const salt=bcryptjs.genSaltSync();
    resto.password=bcryptjs.hashSync(password,salt);
  }
  const usuario=await Usuario.findByIdAndUpdate(id,resto);
  res.json({msg:'put API -controlador',usuario});
};

const usuariosPost=async(req, res=response) =>{
  
  const {nombre,correo,password,rol}=req.body;// nos van a pasar al usuario
  const usuario= new Usuario({nombre,correo,password,rol});
  console.log(usuario);
  const salt=bcryptjs.genSaltSync();
  usuario.password=bcryptjs.hashSync(password,salt);
  await usuario.save();
 
  res.json({msg:'post API-controlador',
            usuario});
};

const usuariosDelete=async(req, res=response) =>{
  const {id}=req.params;
 // const uid=req.uid;
  //fisicamente lo borramos
  //const usuario =await Usuario.findByIdAndDelete(id);
  const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});
  const usuarioAutenticado=req.usuario;
  res.json({usuario,usuarioAutenticado
    //,uid
  });
};  

const usuariosPatch=(req, res=response) =>{
    res.json({msg:'patch API-controlador'});
  };


module.exports={
    usuariosDelete,usuariosGet,usuariosPost,usuariosPut,usuariosPatch
}