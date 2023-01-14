const {Router}=require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, borrarProducto, actualizarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos,tieneRole, existeCategoria, existeProducto } = require('../middleware');


const router=Router();

router.get("/",obtenerProductos);
router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').notEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],
crearProducto);

router.delete('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    tieneRole('ADMIN_ROLE'),
    validarCampos
],
borrarProducto);

router.put('/:id',[
    validarJWT,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    //check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],actualizarProducto);



module.exports=router;