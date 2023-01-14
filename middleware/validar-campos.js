const {validationResult}=require('express-validator')

const validarCampos=(req,res,next)=>{
    const errors=validationResult(req);
    //acá tenemos todos los errores de la request
    if(!errors.isEmpty())
       return res.status(400).json(errors);
    next();// `para q pase al siguiente middleware    
}

module.exports={validarCampos}