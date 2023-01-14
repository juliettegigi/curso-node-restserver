const {Router}=require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middleware');
const{coleccionesPermitidas}=require('../helpers')
const { cargarArchivo } = require('../controllers/uploads');
const { actualizarImagenCloudinary,mostrarImagen } = require('../controllers/uploads-cloudinary');


const router=Router();

router.post('/',validarArchivoSubir,cargarArchivo);
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

module.exports=router;