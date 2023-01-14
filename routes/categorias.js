const {Router}=require('express');
const { check } = require('express-validator');
const { crearCategoria,  obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT,tieneRole } = require('../middleware');
const { validarCampos } = require('../middleware/validar-campos');
const{existeCategoria}=require('../middleware/validar-categorias')

const router=Router();
// Obtener todas las categorías - público get url/api/categorias
router.get("/",obtenerCategorias);
// Obtener una categoría por id- pública
 router.get("/:id",[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
    ],obtenerCategoria);
//     check('id'.custom(existeCategoria))
// ],obtenerCategoria);
//Crear categoría - privado - cualquier persona con token válido
router.post('/',[    
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
],crearCategoria);
//actualizar-privado-cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    //check('estado','El estado debe ser true o false').isBoolean().isEmpty(),
    validarCampos
],actualizarCategoria);
//Borrar una categoria-ADMIN
router.delete('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    tieneRole('ADMIN_ROLE'),
    validarCampos
],borrarCategoria)

module.exports=router;