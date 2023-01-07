const {Router}=require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const{validarCampos,validarJWT,tieneRole}=require('../middleware')

const router=Router();
const Role=require('../models/role')

        
router.get('/', usuariosGet);
router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(rol=>esRoleValido(rol,1)),
    validarCampos
], usuariosPut);
router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe tener mínimo 6 letras').isLength({min:6}),
   // check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom(esRoleValido),
   check('correo').custom(emailExiste),
    validarCampos
] ,usuariosPost);
router.delete('/:id',[
    validarJWT,
   // esAdmminRole,
   tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos],
    usuariosDelete);  
router.patch('/',usuariosPatch);



module.exports=router;