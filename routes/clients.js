const express = require('express')
const app = express.Router()
const Cliente = require('../models/Cliente')  
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/authorization')
const mailer = require('../controller/mailController')

//app.get('/obtener', auth, async (req, res) => {
app.get('/obtener', async (req, res) => {
	try {
		const clientes = await Cliente.find({})
        res.json({clientes})

	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error obteniendo los datos' })
	}
})

// SINGLE
app.get('/single/:id', async (req, res) => {
			
	try {
		const single = await Cliente.findById(req.params.id) 
		res.json({single})
		

	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error obteniendo los datos del id '+req.params.id+' error: '+error })
	}

})

// CREAR UN cliente
app.post('/crear', async (req, res) => {
	const { 
		nombre,
        atencion,
        correo,
        ruc,
        diasDeEntrega,
        diasDeCredito,
        formasPago,
        direccion,
        telefono
	 } = req.body 
	
	try {

		const ifExist = await Cliente.find( { correo: correo } )

		if(ifExist.length > 0){

			res.status(500).json({
				msg: 'El correo '+correo+' ya existe',
			})	

		}else{

					
			const respuestaDB = await Cliente.create({
				nombre,
				atencion,
				correo,
				ruc,
				diasDeEntrega,
				diasDeCredito,
				formasPago,
				direccion,
				telefono
			})

			
   			res.json({respuestaDB})
			
		}
		
	} catch (error) {
		return res.status(400).json({
			msg: error,
		})
	}
})


// ACTUALIZAR
//app.put('/actualizar', auth, async (req, res) => {
app.put('/actualizar', async (req, res) => {
	const { 
		id,
		nombre,
        atencion,
        correo,
        ruc,
        diasDeEntrega,
        diasDeCredito,
        formasPago,
        direccion,
        telefono
		} = req.body
	try {

		const ifExist = await Cliente.find( { correo: correo, _id: { $ne: id } } )

		if(ifExist.length > 0){

			res.status(500).json({
				msg: 'El correo '+correo+' ya existe',
			})	

		}else{

			const updateCliente = await Cliente.findByIdAndUpdate(id,{
				nombre,
				atencion,
				correo,
				ruc,
				diasDeEntrega,
				diasDeCredito,
				formasPago,
				direccion,
				telefono
			},{new:true})
        	res.json({updateCliente})
		
		}

	} catch (error) {
		res.status(500).json({
			msg: 'Hubo un error actualizando el Cliente',
		})
	}
})

// BORRAR
app.post('/borrar', async (req, res) => {
	const { id } = req.body
	
	try {
		const deleteCliente = await Cliente.findByIdAndRemove({ _id: id })
		res.json(deleteCliente)
	} catch (error) {
		res.status(500).json({
			msg: 'Hubo un error borrando el Cliente '+id,
		})
	}
})


module.exports = app
