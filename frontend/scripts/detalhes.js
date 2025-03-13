document.addEventListener("DOMContentLoaded", carregarDetalhes);

function carregarDetalhes() {
    let listaId = localStorage.getItem("listaSelecionada");

    if (!listaId) {
        alert("Lista não encontrada.");
        window.location.href = "historico-listas.html";
        return;
    }

    // Fazendo a requisição para buscar a lista específica
    fetch(`http://localhost:3000/listas`)
        .then(response => response.json())
        .then(listas => {
            let lista = listas.find(l => l.id == listaId); // Busca a lista pelo ID
            if (!lista) {
                alert("Lista não encontrada.");
                window.location.href = "historico-listas.html";
                return;
            }

            // Atualiza o título da lista
            document.getElementById("tituloLista").innerText = lista.nome;

            // Atualiza a exibição dos itens
            let listaUl = document.getElementById("itensLista");
            listaUl.innerHTML = "";

            if (lista.itens.length === 0) {
                listaUl.innerHTML = "<p>Nenhum item nesta lista.</p>";
            } else {
                lista.itens.forEach(item => {
                    let li = document.createElement("li");
                    li.innerHTML = `${item.quantidade}x ${item.nome} - R$${item.preco}`;
                    listaUl.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao carregar detalhes da lista:", error);
            alert("Erro ao carregar os detalhes da lista.");
        });
}

function duplicarLista() {
    let listaId = localStorage.getItem("listaSelecionada");

    if (!listaId) return;

    fetch(`http://localhost:3000/listas`)
        .then(response => response.json())
        .then(listas => {
            let lista = listas.find(l => l.id == listaId);
            if (!lista) return;

            let novaLista = {
                nome: lista.nome + " (Cópia)",
                itens: lista.itens
            };

            // Enviar a nova lista para a API
            fetch("http://localhost:3000/listas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaLista)
            })
            .then(() => {
                alert("Lista duplicada com sucesso!");
                window.location.href = "historico-listas.html";
            })
            .catch(error => {
                console.error("Erro ao duplicar lista:", error);
                alert("Erro ao duplicar a lista.");
            });
        });
}

function excluirLista() {
    let listaId = localStorage.getItem("listaSelecionada");

    if (!listaId) return;

    // Confirmar antes de excluir
    if (!confirm("Tem certeza que deseja excluir esta lista?")) return;

    fetch(`http://localhost:3000/listas/${listaId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Lista excluída com sucesso!");
        window.location.href = "historico-listas.html";
    })
    .catch(error => {
        console.error("Erro ao excluir lista:", error);
        alert("Erro ao excluir a lista.");
    });
}

function editarLista() {
    alert("Função de edição ainda não implementada!");
}
