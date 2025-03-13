const ListaModel = require("../models/ListaModel");

class ListaController {
    static getListas(req, res) {
        res.json(ListaModel.carregarListas());
    }

    static postLista(req, res) {
        let listas = ListaModel.carregarListas();
        const novaLista = {
            id: Date.now(),
            nome: req.body.nome,
            itens: req.body.itens
        };
        listas.push(novaLista);
        ListaModel.salvarListas(listas);
        res.status(201).json(novaLista);
    }

    static deleteLista(req, res) {
        let listas = ListaModel.carregarListas();
        listas = listas.filter(lista => lista.id !== parseInt(req.params.id));
        ListaModel.salvarListas(listas);
        res.json({ message: "Lista excluída com sucesso!" });
    }
}

module.exports = ListaController;
