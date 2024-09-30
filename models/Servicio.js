// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const serviceSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true,'El nombre es obligatorio']
		},
		descripcion: {
			type: String,
			required: false,
		},
		precio: {
			type: Number,
			required: false,
		},
		imagen: {
			type: String,
			required: false,
		}
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Servicio = mongoose.model('Servicio', serviceSchema)

// 4. EXPORTACIÓN
module.exports = Servicio
