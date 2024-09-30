// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA
const clientSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true,'El nombre es obligatorio']
		},
		atencion:{
			type: String,
			required: false,
		},
		correo: {
			type: String,
			required: [true,'El correo es obligatorio'],
			match: [/\S+@\S+\.\S+/, 'Correo inválido' ],
		},
		ruc:{
			type: String,
			required: false,
		},
		diasDeEntrega:{
			type: String,
			required: false,
		},
		diasDeCredito:{
			type: String,
			required: false,
		},
		formasPago:{
			type: String,
			required: false,
		},
		direccion: {
			type: String,
			required: false,
		},
		telefono: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true, 
	}
)

// 3. MODELO
const Cliente = mongoose.model('Cliente', clientSchema)

// 4. EXPORTACIÓN
module.exports = Cliente
