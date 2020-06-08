const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

////////////////////////son los datos que se guardaran en mongodb
const UsuarioSchema = new Schema({
  nombre: {
     type: String, 
     required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  contrasenia: {
     type: String, 
     required: true 
  },
  fecha: { 
    type: Date, 
    default: Date.now 
  }
});

////////////////////Es un metodo para encriptar la contraseña(se antes de usar el modelo)//////
UsuarioSchema.methods.encriptar = async contrasenia => {
  const salt = await bcrypt.genSalt(10);////gen salt(10) es el parametro que se da para que tan fuerte sara la encriptacion
  return await bcrypt.hash(contrasenia, salt);
};

/////////////////////este metodo es para encriptar la contraseña del inicio de sesion 
/////////////y compararla con la contraseña encriptada original
UsuarioSchema.methods.matchPassword = async function(contrasenia) {
  return await bcrypt.compare(contrasenia, this.contrasenia);
};

module.exports = model("Usuario", UsuarioSchema);
