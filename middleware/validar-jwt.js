const Usuario = require('../models/usuario');
const { response, request } = require('express')
const jwt=require('jsonwebtoken')
const validarJWT=async(req=request,res=response,next)=>{
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }
    try { const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);      
       const usuario= await Usuario.findById(uid);
       if(!usuario)
          return res.status(401).json({msg:'token no válido - user no existe en DB'});
       if(!usuario.estado)
         return res.status(401).json({msg:'token no válido - user con estado false'});
       req.usuario=usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:'token no valido'})
        
    }
    console.log(token);

}


module.exports={
    validarJWT
}