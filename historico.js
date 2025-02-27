document.addEventListener("DOMContentLoaded", carregarListas);

function carregarListas() {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let listaUl = document.getElementById("listasSalvas");

    listaUl.innerHTML = ""; // Limpa a tela antes de exibir

    if (listasSalvas.length === 0) {
        listaUl.innerHTML = "<p>Nenhuma lista salva ainda.</p>";
        return;
    }

    listasSalvas.forEach((lista, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="nome-lista">${lista.nome}</span>
            <span class="data-lista">${lista.data || "Sem data"}</span>
        `;
        li.onclick = () => abrirDetalhesLista(index); // Abre os detalhes ao clicar
        listaUl.appendChild(li);
    });
}

function abrirDetalhesLista(index) {
    localStorage.setItem("listaSelecionada", index);
    window.location.href = "detalhes-lista.html";
}

function duplicarLista(index) {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    let novaLista = { ...listasSalvas[index], nome: listasSalvas[index].nome + " (Cópia)" };

    listasSalvas.push(novaLista);
    localStorage.setItem("historicoListas", JSON.stringify(listasSalvas));

    carregarListas();
    alert("Lista duplicada com sucesso!");
}

function enviarParaCarrinho(index) {
    let listasSalvas = JSON.parse(localStorage.getItem("historicoListas")) || [];
    localStorage.setItem("carrinhoAtual", JSON.stringify(listasSalvas[index]));

    alert("Lista enviada para o carrinho!");
    window.location.href = "carrinho.html";
}
