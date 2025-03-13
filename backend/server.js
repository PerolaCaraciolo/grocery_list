const express = require("express");
const cors = require("cors");
const listaRoutes = require("./routes/listaRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/listas", listaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
