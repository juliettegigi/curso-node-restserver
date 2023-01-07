const esAdmminRole=(req,res=response,next)=>{
     if(!req.usuario)
        return res.status(500).json({
         msg:"Se quiere verificar el role sin validar el token 1ro"
        })
    const {rol,nombre}=req.usuario;
    if(rol!='ADMIN_ROLE')
       return res.status(401).json({
        msg:`${nombre} no es administrador- No puede hacer esto`
       })   
    
    next();
}



const tieneRole=(...roles)=>{
    

   
    return(req,res=response,next)=>{
        if(!roles.includes(req.usuario.rol))
        return res.status(401).json({
         msg:`El  usuario no tiene el rol ${roles} necesario para acceder a la petición`
        })   ;
        next();
    }


}
module.exports={esAdmminRole,tieneRole}