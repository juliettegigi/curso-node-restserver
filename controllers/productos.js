const { response,request } = require("express");
const { Producto } = require("../models");
const{existeCategoria}=require("../middleware/validar-categorias")

const obtenerProductos=async(req=request,res=response)=>{
    const{limite,hasta}=req.query;
    const query={estado:true};
    const [total,productos]=await Promise.all([Producto.count(query),Producto.find(query).populate
        ('categoria','nombre').populate('usuario','nombre').limit(limite).skip(hasta)]);
    
    res.json({
        msg:"getProductos",
        total,
        productos
    })
   

}

const obtenerProducto=async(req=request,res=response)=>{
    const{id}=req.params;
    const producto=request.producto;
    res.json({
        msg:"obtener/get-Producto",
        producto
    })

}

const crearProducto = async (req=request,res=response) => {
    const {estado,usuario,...datos}=req.body;
    datos.nombre=datos.nombre.toUpperCase();
   
    const existeProducto= await Producto.findOne({nombre:datos.nombre})
    if(existeProducto){
       return res.status(400).json({
            producto:datos.producto,
            msg:"El producto ya existe"
        });
       
    }
    
//     try{
       
//     await existeCategoria(datos.categoria);
// }
//     catch(err){
//         return res.status(400).json({
//             msg:"La categoría ingresada no existe en la DB"
//         });
        
//     }
    datos.usuario=req.usuario._id;
    const producto=new Producto(datos);
    await producto.save();
    res.json({
        msg:"crear/Post-Productos",
        producto
    })
}

const actualizarProducto = async (req=request,res=response) => {
    const{id}=req.params;
    const{_id,usuario,estado,...data}=req.body;
    if(data.nombre){
        data.nombre=data.nombre.toUpperCase();
    }
    data.usuario=req.usuario._id;
    const producto=await Producto.findByIdAndUpdate(id,data).populate('usuario','nombre').populate('categoria','nombre')
    res.json({
        msg:"actualizar/Put-Productos",
        producto
    })
}

const borrarProducto=async(req=request,res=response)=> {
   
    const producto=await Producto.updateOne(req.producto,{estado:false});
    res.json({
        msg:"delete/delete-Productos",
        producto
    })
}

module.exports={
    obtenerProductos,obtenerProducto,crearProducto,actualizarProducto,borrarProducto
}
