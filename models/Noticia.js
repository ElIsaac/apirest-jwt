const { Schema, model } = require("mongoose");


const NoticiaSchema = new Schema(
  {

    titulo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    autor: {
      type: String,
      required: true
    },
    id_autor: {
      type: String,
      required: true
    },
    fecha: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);


module.exports = model("Noticia", NoticiaSchema);