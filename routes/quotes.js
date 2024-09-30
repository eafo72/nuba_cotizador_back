const express = require("express");
const app = express.Router();
const Cotizaciones = require("../models/Cotizacion");

// LISTA
app.get("/obtener", async (req, res) => {
  try {
    const cotizaciones = await Cotizaciones.find(
      {},
      {
        cliente: 1,
        proformaNum:1,
        proyecto:1,
        atencion: 1,
        diasDeEntrega: 1,
        diasDeCredito: 1,
        formasPago: 1,
        vigencia: 1,
        descripcion: 1,
        observaciones: 1,
        subtotal:1,
        porcentaje:1,
        descuento:1,
        iva:1,
        total:1
      }
    );

    res.json({ cotizaciones });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error obteniendo los datos " + error });
  }
});

// SINGLE
app.get("/single/:id", async (req, res) => {
  try {
    const single = await Cotizaciones.findById(req.params.id);
    res.json({ single });
  } catch (error) {
    res.status(500).json({
      msg:
        "Hubo un error obteniendo los datos del id " +
        req.params.id +
        " error: " +
        error,
    });
  }
});

//CREAR
app.post("/crear", async (req, res) => {
  const {
    cliente,
    proformaNum,
    proyecto,
    atencion,
    diasDeEntrega,
    diasDeCredito,
    formasPago,
    vigencia,
    descripcion,
    observaciones,
    subtotal,
    porcentaje,
    descuento,
    iva,
    total
  } = req.body;

  try {
    const respuestaDB = await Cotizaciones.create({
      cliente,
      proformaNum,
      proyecto,
      atencion,
      diasDeEntrega,
      diasDeCredito,
      formasPago,
      vigencia,
      descripcion,
      observaciones,
      subtotal,
      porcentaje,
      descuento,
      iva,
      total
    });

    res.json({ respuestaDB });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

// ACTUALIZAR
app.put("/actualizar", async (req, res) => {
  const {
    id,
    cliente,
    proformaNum,
    proyecto,
    atencion,
    diasDeEntrega,
    diasDeCredito,
    formasPago,
    vigencia,
    descripcion,
    observaciones,
    subtotal,
    porcentaje,
    descuento,
    iva,
    total
  } = req.body;
  try {
    const updateCotizacion = await Cotizaciones.findByIdAndUpdate(
      id,
      {
        cliente,
        proformaNum,
        proyecto,
        atencion,
        diasDeEntrega,
        diasDeCredito,
        formasPago,
        vigencia,
        descripcion,
        observaciones,
        subtotal,
        porcentaje,
        descuento,
        iva,
        total
      },
      { new: true }
    );
    res.json({ updateCotizacion });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error actualizando la Cotizacion",
    });
  }
});

// BORRAR
app.post("/borrar", async (req, res) => {
  const { id } = req.body;

  try {
    const deleteCotizacion = await Cotizaciones.findByIdAndRemove({ _id: id });
    res.json(deleteCotizacion);
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error borrando la Cotizacion " + id,
    });
  }
});

module.exports = app;
