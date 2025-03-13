// Array para armazenar os produtos da lista
let listaDeCompras = [];

// Tratamento do nome da lista

// // Tratamento do nome da lista
// document.getElementById("nomeLista").addEventListener("click", editarNomeLista);

document.addEventListener("DOMContentLoaded", function () {
    let nomeLista = document.getElementById("nomeLista");
    if (nomeLista) {  // Só adiciona o event listener se o elemento existir
        nomeLista.addEventListener("click", editarNomeLista);
    }
});

function fixarNomeLista() {
    let nomeListaInput = document.getElementById("nomeLista");

    // Se o campo estiver preenchido, torna ele "fixo"
    if (nomeListaInput.value.trim() !== "") {
        nomeListaInput.setAttribute("readonly", true);
        nomeListaInput.style.color = "#2E1A47"; // Destaca o texto
    }
}

function editarNomeLista() {
    let nomeListaInput = document.getElementById("nomeLista");
    nomeListaInput.removeAttribute("readonly");
    nomeListaInput.focus();
}

// Função para adicionar produto à lista
function adicionarProduto() {
    let nomeProduto = document.getElementById("nomeProduto").value.trim();
    let quantidade = document.getElementById("quantidade").value || "1"; // Se estiver vazio, assume 1
    let preco = document.getElementById("preco").value || "0"; // Se não tiver preço, assume R$ 0,00
    
    // Validação básica
    // if (nomeProduto === "" || isNaN(quantidade) || isNaN(preco)) {     QDO EU IMPEDIA DE TUDO ESTAR VAZIO
    if (nomeProduto === "") {
        alert("Por favor, informe o nome do produto.");
        return;
    }

    // Impedir valores negativos
    if (quantidade < 1) quantidade = 1;
    if (preco < 0) preco = 0;

    // Criando objeto do produto
    let produto = {
        nome: nomeProduto,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco).toFixed(2), // Deixa o preço com duas casas decimais
        total: (parseInt(quantidade) * parseFloat(preco)).toFixed(2) // Calcula o total do item
    };

    // Adiciona à lista
    listaDeCompras.push(produto);

    // Atualiza a exibição da lista
    atualizarLista();

    // Limpa os campos
    document.getElementById("nomeProduto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
}

// Função para atualizar a lista na tela
function atualizarLista() {
    let listaUl = document.getElementById("listaProdutos");
    listaUl.innerHTML = ""; // Limpa a lista antes de atualizar

    listaDeCompras.forEach((produto, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${produto.quantidade}x ${produto.nome} - R$${produto.preco} 
            <strong>Total: R$${produto.total}</strong>
            <button onclick="removerProduto(${index})">❌</button>
        `;

        listaUl.appendChild(li);
    });
}

// Função para remover um produto da lista
function removerProduto(index) {
    let confirmacao = confirm("Tem certeza que deseja remover este item?");
    if (confirmacao) {
        listaDeCompras.splice(index, 1); // Remove o item pelo índice
        atualizarLista(); // Atualiza a exibição
    }
}

// Função para salvar a lista
function salvarLista() {
    let nomeLista = document.getElementById("nomeLista").value.trim();

    if (nomeLista === "") {
        alert("Dê um nome para sua lista antes de salvar.");
        return;
    }

    if (listaDeCompras.length === 0) {
        alert("Adicione pelo menos um item à lista.");
        return;
    }
    
    let novaLista = {
        nome: nomeLista,
        itens: listaDeCompras,
        data: new Date().toLocaleDateString("pt-BR")
    };

    fetch("http://localhost:3000/listas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaLista)
    })
    .then(response => response.json())
    .then(data => {
        alert("Lista salva com sucesso!");
        window.location.href = "../pages/historico-listas.html";
    })
    .catch(error => {
        console.error("Erro ao salvar lista:", error);
        alert("Erro ao salvar a lista. Tente novamente.");
    });
}

