const express = require("express");
const ListaController = require("../controllers/ListaController");

const router = express.Router();

router.get("/", ListaController.getListas);
router.post("/", ListaController.postLista);
router.delete("/:id", ListaController.deleteLista);

module.exports = router;
