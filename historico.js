document.addEventListener("DOMContentLoaded", carregarListas);

function carregarListas() {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let listaUl = document.getElementById("listasSalvas");
    let mensagemNenhumaLista = document.getElementById("nenhumaListaMsg");

    listaUl.innerHTML = ""; // Limpa a tela antes de exibir

    if (listasSalvas.length === 0) {
        mensagemNenhumaLista.style.display = "block"; // Exibe a mensagem se não houver listas
        return;
    } else {
        mensagemNenhumaLista.style.display = "none"; // Esconde a mensagem caso existam listas
    }

    listasSalvas.forEach((lista, index) => {
        // Se a lista não tiver data, adicionamos a data atual
        if (!lista.data) {
            lista.data = new Date().toLocaleDateString("pt-BR");
        }

        let li = document.createElement("li");
        li.classList.add("lista-item");
        li.innerHTML = `
            <span class="nome-lista">${lista.nome}</span>
            <span class="data-lista">${lista.data}</span>
        `;
        li.onclick = () => abrirDetalhesLista(index); // Abre os detalhes ao clicar
        listaUl.appendChild(li);
    });

    // Atualiza o localStorage com as datas corrigidas
    localStorage.setItem("historicoListas", JSON.stringify(listasSalvas));
}

function abrirDetalhesLista(index) {
    localStorage.setItem("listaSelecionada", index);
    window.location.href = "detalhes-lista.html";
}

function duplicarLista(index) {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let novaLista = { ...listasSalvas[index], nome: listasSalvas[index].nome + " (Cópia)", data: new Date().toLocaleDateString("pt-BR") };


    listasSalvas.push(novaLista);
    localStorage.setItem("historicoListas", JSON.stringify(listasSalvas));

    carregarListas();
    alert("Lista duplicada com sucesso!");
}

function excluirLista(index) {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    listasSalvas.splice(index, 1);

    localStorage.setItem("historicoListas", JSON.stringify(listasSalvas));
    carregarListas(); // Atualiza a exibição após a exclusão
}
