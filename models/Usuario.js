// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const userSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true,'El nombre es obligatorio']
		},
		tipo: {
			type: String,
			required: [true,'El tipo de usuario es obligatorio']
		},
		correo: {
			type: String,
			required: [true,'El correo es obligatorio'],
			match: [/\S+@\S+\.\S+/, 'Correo inválido' ],
		},
		password:{
			type: String,
			required: [true,'El password es obligatorio']
		},
		direccion: {
			type: String,
			required: false,
		},
		telefono: {
			type: String,
			required: false,
		},
		estatus: {
			type: String,
			required: false,
		},
		codigo: {
			type: String,
			required: false,
		},
		cargo: {
			type: String,
			required: false,
		},
		alcance: {
			type: String,
			required: false,
		},
		descuentoAutorizado: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Usuario = mongoose.model('Usuario', userSchema)

// 4. EXPORTACIÓN
module.exports = Usuario

