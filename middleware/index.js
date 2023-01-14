const validarCampos = require('../middleware/validar-campos');
const validarJWT = require('../middleware/validar-jwt');
const validarRoles=require('../middleware/validar-roles')
const validarCategoria=require('../middleware/validar-categorias')
const validarProducto=require('../middleware/validar-producto')
const validarArchivo=require('../middleware/validar-archivo')

module.exports={
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarProducto,
    ...validarCategoria,
    ...validarArchivo
}