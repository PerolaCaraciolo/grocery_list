const fs = require("fs");
const FILE_PATH = "./database/listas.json";

class ListaModel {
    static carregarListas() {
        if (!fs.existsSync(FILE_PATH)) return [];
        const data = fs.readFileSync(FILE_PATH);
        return JSON.parse(data);
    }

    static salvarListas(listas) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(listas, null, 2));
    }
}

module.exports = ListaModel;
