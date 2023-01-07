const mongoose=require('mongoose')
const usuariosSchema = new mongoose.Schema({
    nombre:String,
    email:String,
    password:String
  });