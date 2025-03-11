document.addEventListener("DOMContentLoaded", carregarDetalhes);

function carregarDetalhes() {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let index = localStorage.getItem("listaSelecionada");

    if (index === null || !listasSalvas[index]) {
        alert("Lista não encontrada.");
        window.location.href = "historico-listas.html";
        return;
    }

    let lista = listasSalvas[index];
    document.getElementById("tituloLista").innerText = lista.nome;

    let listaUl = document.getElementById("itensLista");
    // let mensagemListaVazia = document.getElementById("mensagemListaVazia");
    listaUl.innerHTML = "";

    // if (lista.itens.length === 0) {
    //     mensagemListaVazia.style.display = "block"; // Exibe a mensagem se não houver itens
    // } else {
    //     mensagemListaVazia.style.display = "none"; // Oculta a mensagem se houver itens
    //     lista.itens.forEach(item => {
    //         let li = document.createElement("li");
    //         li.innerHTML = `${item.quantidade}x ${item.nome} - R$${item.preco}`;
    //         listaUl.appendChild(li);
    //     });
    // }

    lista.itens.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `${item.quantidade}x ${item.nome} - R$${item.preco}`;
        listaUl.appendChild(li);
    });
}

function duplicarLista() {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let index = localStorage.getItem("listaSelecionada");

    if (!listasSalvas[index]) return;

    let novaLista = { 
        ...listasSalvas[index], 
        nome: listasSalvas[index].nome + " (Cópia)", 
        data: new Date().toLocaleDateString("pt-BR") 
    };

    listasSalvas.push(novaLista);
    localStorage.setItem("historicoListas", JSON.stringify(listasSalvas));

    alert("Lista duplicada com sucesso!");
    window.location.href = "historico-listas.html";
}

function excluirLista() {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let index = localStorage.getItem("listaSelecionada");

    if (!listasSalvas[index]) return;

    listasSalvas.splice(index, 1);
    localStorage.setItem("historicoListas", JSON.stringify(listasSalvas));

    alert("Lista excluída com sucesso!");
    window.location.href = "historico-listas.html";
}

function editarLista() {
    alert("Função de edição ainda não implementada!");
    // No futuro, permitir AQUI que o usuário edite os itens da lista
}
