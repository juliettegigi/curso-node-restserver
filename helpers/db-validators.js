const Role=require('../models/role')
const Usuario = require('../models/usuario'); 

const esRoleValido=async(rol='',n)=>{
    if(n && rol==='')return;
    const existeRol=await Role.findOne({rol});
    if(!existeRol)
      throw new Error(`El rol ${rol} no está registrado en la DB`);
   }


const emailExiste=async(correo='')=>{
    const existeEmail=await Usuario.findOne({correo});
    if(existeEmail)
      throw new Error(`El correo ${correo} ya está registrado`)
}

const existeUsuarioPorID=async(id)=>{
    const existeID=await Usuario.findById(id);
    if(!existeID)
      throw new Error(`No hay registro del id(${id}) ingresado`)
}

module.exports= { esRoleValido, emailExiste,existeUsuarioPorID}   